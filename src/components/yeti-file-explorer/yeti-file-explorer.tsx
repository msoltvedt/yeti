import { Component, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import { YetiFileSystem, YetiFileSystemItem } from '../../utils/utils';

@Component({
  tag: 'yeti-file-explorer',
  shadow: false,
})
export class YetiFileExplorer {

  /**
   * Fires when the user clicks a folder
   */
  @Event() fileExplorerChange: EventEmitter;

  @Element() el: HTMLElement;

  /**
   * CSS classlist applied to the explorer wrapper element.
   */
  @Prop({ attribute: 'wrapper-css'}) wrapperCSS?: string = '';

  /**
   * Whether or not to show files (folders are always shown).
   */
  @Prop() showFiles: boolean = true;

  /**
   * Data model object that describes the state and contents of the explorable file system. See utils.js for details.
   */
  @Prop({ mutable: true }) model: YetiFileSystem;

  /**
   * The YetiFileFolderContent object that is the last selected item in the path
   */
  @Prop({ mutable: true }) terminus: YetiFileSystemItem;

  /**
   * Toggle to trigger a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = false;



  handleItemClick(e: Event, depth: number = 0, index: number = 0) {
    // A folder or file was just clicked. Handle it.
    let path = (e.currentTarget as HTMLElement).getAttribute("data-path");
    let parentPath = path.substring( 0, path.lastIndexOf("/") );
    let parentFolder = this.getFolderFromPath(parentPath);

    // 1. Update terminus and path
    this.setNewSelectedTerminus(path); // Update the isSelected state of everything in the file system to point to the thing that was just clicked.
    this.updatePath(path);

    // 2. Update parent folder
    parentFolder.isSelected = true;
    parentFolder.selectedIndex = index;
    
    // 3. Fire item selected event. Include isFolder and path.
    this.fileExplorerChange.emit({
      "path": path,
      "depth": depth,
      "index": index
    });

    // 4. Rerender
    this.iLoveJSX = !this.iLoveJSX;
  }



  newFolderObject() {
    let folder: YetiFileSystemItem;
    return folder;
  }


  
  updatePath(targetPath) {
    let folderNamesInPath = (targetPath.slice(1)).split('/'); // Array of folder names, e.g. /root/path/to/terminus is ["root", "path", "to", "terminus"]
    let currentTarget = this.model.root;

    for (let i=0; i<folderNamesInPath.length; i++) {
        
      let currentTargetFolderNames = currentTarget.content.map( content => content.name );

      currentTarget.isSelected = true;
      currentTarget.selectedIndex = currentTargetFolderNames.indexOf( folderNamesInPath[i] );

      currentTarget = currentTarget.content[
        currentTargetFolderNames.indexOf( folderNamesInPath[i] )
      ]; // Move to the next step down the path

    }

  }



  setNewSelectedTerminus(targetPath) {
    // Set the isSelected state of everything in the file system to reflect that the new terminus is at depth targetDepth and index targetIndex.

    let targetFolder: YetiFileSystemItem; // The folder we're updating in this function

    // 1. Navigate to the correct depth
    targetFolder = this.getFolderFromPath( targetPath );

    // 2. Reset the previous terminus to the unselected state
    this.clearTerminusPath();

    // 3. Update to the new terminus
    this.model.root.isSelected = true;
    targetFolder.isSelected = true;
    targetFolder.isTerminus = true;
    this.terminus = targetFolder;
  }



  clearTerminusPath() {
    // Deselects all folders along the path to terminus and sets the terminus internal variable to null
    if (!this.terminus) {
      return;
    } else {

      // Terminus was set. Unset it and unselect every folder in its path.

      let folderNamesInPath = (this.terminus.path.slice(1)).split('/'); // Array of folder names, e.g. /root/path/to/terminus is ["root", "path", "to", "terminus"]
      let currentTarget = this.model.root;

      for (let i=0; i<folderNamesInPath.length; i++) {
        
        let currentTargetFolderNames = currentTarget.content.map( content => content.name );
        currentTarget = currentTarget.content[
          currentTargetFolderNames.indexOf( folderNamesInPath[i] )
        ]; // Move to the next step down the path
        currentTarget.isSelected = false;
        currentTarget.isTerminus = false;
      }

      this.terminus = null;

    }
  }



  getFolderFromPath(path: string) {
    // path will be of format /folder/subfolder/subsubfolder/fileorfoldername
    let folderNamesInPath;
    let currentTarget = this.model.root;

    if (path == "") {
      return this.model.root;
    }

    path = path.slice(1); // Remove the leading slash
    folderNamesInPath = path.split('/');

    for (let i=0; i<folderNamesInPath.length; i++) {
      // Work through the whole path until currentTarget points at the last one.
      let currentStepNameInPath = folderNamesInPath[i];
      let currentTargetFolderNames = currentTarget.content.map( content => content.name );
      currentTarget = currentTarget.content[
        currentTargetFolderNames.indexOf(currentStepNameInPath)
      ]
    }

    return currentTarget;
  }



  renderFolders() {
    // Render all the displayed folders for the currently selected path.
    let folders = [];
    let emptyFolder: YetiFileSystemItem = {
      name: "",
      path: "/",
      content: [],
      selectedIndex: -1,
      isRoot: false,
      isSelected: false,
      isTerminus: false
    }

    
    // First, handle the initial or reset state where the path is empty
    if (this.model.root.content.length == 0) {

      for (let i=0; i<this.model.minDisplayDepth; i++) {
        folders.push(
          this.renderFolder(
            (i == 0) ? this.model.root : emptyFolder // Show the root folder and then empty ones to fill out the rest of the display depth
          )
        )
      }
      
    } else {

      let workingFolder = this.model.root;
      do {
        folders.push(this.renderFolder(workingFolder));
        workingFolder = workingFolder.content[ workingFolder.selectedIndex ];
      } while (workingFolder && workingFolder.isSelected);

    }

    return folders;

  }



  renderFolder(folder: YetiFileSystemItem) {

    let depth = folder.path.split("/").length-1;

    let jsx =

      <div class="yeti-file_explorer-folder">

        <ul class="yeti-file_explorer-folder-items">

          {this.renderFolderContents(folder, depth)}

        </ul>

      </div>

    return jsx;
      
  }



  renderFolderContents(folder: YetiFileSystemItem, depth: number = -1) {

    return folder.content.map((item, index) => {
      return this.renderItem(item, depth, index);
    });

  }



  renderItem(item: YetiFileSystemItem, depth: number = -1, index: number = -1) {

    let buttonCSS = "yeti-file_explorer-folder-item-wrapper" + ((item.isSelected) ? " yeti-file_explorer-folder-item-wrapper__selected" : "");
    let jsx = 

      <li class="yeti-file_explorer-folder-item">

          <button class={buttonCSS} onClick={(e) => { this.handleItemClick(e, depth, index); }} data-path={item.path}>

              <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
            
              <span class="yeti-file_explorer-folder-item-name">{item.name}</span>
            
              {/* {
                (item.content.length) ? 
                  <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                : 
                  ""
              } */}

              <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
        
          </button>

      </li>

    return jsx;
  }



  componentWillLoad() {

    let workingFolderContents: YetiFileSystemItem[];
    
    if (!this.model) {
      // The model doesn't exist yet, so we have to create a dummy one.
      let placeholderModel: YetiFileSystem = {
        root: {
          name: "",
          path: "/",
          content: [],
          selectedIndex: -1,
          offset: 0,
          pageSize: 0,
          totalElements: 0,
          isRoot: true,
          isSelected: false,
          isTerminus: false
        },
        minDisplayDepth: 3
      }

      this.model = placeholderModel;
    }

    // Initialize path
    workingFolderContents = this.model.root.content;

    workingFolderContents.forEach((value, index) => {
      if (value.isSelected) {
        value.selectedIndex = index;
      }
    });

  }



  render() {

    let wrapperCSS = 'yeti-file_explorer-wrapper';

    wrapperCSS += (this.wrapperCSS != '') ? ` ${this.wrapperCSS}` : '';

    return (

      <div class={wrapperCSS}>

        <div class="yeti-file_explorer">

          <div class="yeti-file_explorer-folders">

            {this.renderFolders()}

          </div>{/* /folders */}

        </div>{/* /file_explorer */}

      
        <div class="yeti-file_explorer-path">{(this.terminus) ? this.terminus.path : ''}</div>

      </div>

    );
  }



  componentDidRender() {
    // Scroll the last folder into view
    let folderElements = this.el.querySelectorAll(".yeti-file_explorer-folder");

    if (folderElements && folderElements.length) {
      folderElements[ folderElements.length-1 ].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

}