import { Component, Prop, h, State, Element, Watch, Event, EventEmitter } from '@stencil/core';
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
  @Watch("model") handleModelUpdate(newValue, oldValue) {
    //console.log("Model changed.", oldValue, newValue);
  }

  /**
   * Path array that contains all the folders, in order, from root to terminus
   */
  // @State() path: YetiFileSystemItem[] = [];
  // @Watch("path") handlePathUpdate(newValue, oldValue) {
  //   console.log("Path changed.", oldValue, newValue);
  // }

  /**
   * The YetiFileFolderContent object that is the last selected item in the path
   */
  @Prop({ mutable: true }) terminus: YetiFileSystemItem;
  @Watch("terminus") handleTerminusUpdate(newValue, oldValue) {
    //console.log("Terminus changed.", oldValue, newValue);
  }

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


  
  updatePath(targetPath) {
    let folderNamesInPath = (targetPath.slice(1)).split('/'); // Array of folder names, e.g. /root/path/to/terminus is ["root", "path", "to", "terminus"]
    let currentTarget = this.model.root;

    for (let i=0; i<folderNamesInPath.length; i++) {
        
      let currentTargetFolderNames = currentTarget.contents.map( content => content.name );

      currentTarget.isSelected = true;
      currentTarget.selectedIndex = currentTargetFolderNames.indexOf( folderNamesInPath[i] );

      currentTarget = currentTarget.contents[
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
        
        let currentTargetFolderNames = currentTarget.contents.map( content => content.name );
        currentTarget = currentTarget.contents[
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
      let currentTargetFolderNames = currentTarget.contents.map( content => content.name );
      currentTarget = currentTarget.contents[
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
      contents: [],
      selectedIndex: -1,
      isRoot: false,
      isSelected: false,
      isTerminus: false
    }

    
    // First, handle the initial or reset state where the path is empty
    if (this.model.root.contents.length == 0) {

      for (let i=0; i<this.model.minDisplayDepth; i++) {
        folders.push(
          this.renderFolder(
            (i == 0) ? this.model.root : emptyFolder // Show the root folder and then empty ones to fill out the rest of the display depth
          )
        )
      }
      
    } else {

      // There's at least one folder in the path, so proceed normally
      // for (let j=0; j<this.path.length || j<this.model.minDisplayDepth; j++) {

      //   if (!this.path[j] || !this.path[j].contents) {
      //     folders.push(this.renderFolder(emptyFolder));
      //   } else {
      //     folders.push(this.renderFolder(this.path[j]));
      //   }
      // }

      let workingFolder = this.model.root;
      do {
        folders.push(this.renderFolder(workingFolder));
        workingFolder = workingFolder.contents[ workingFolder.selectedIndex ];
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

    return folder.contents.map((item, index) => {
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
          contents: [],
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
    // 1. The root is always in the path.
    //this.path.push(this.model.root);

    // 2. See if any of the root's contents are a selected folder. If so, add it, and repeat the process for that folder until done.
    workingFolderContents = this.model.root.contents;

    workingFolderContents.forEach((value, index) => {
      if (value.isSelected) {
        //this.path.push(value);
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

      
        <div class="yeti-file_explorer-path"></div>

      </div>

        // <div class={wrapperCSS}>

        //     <div class="yeti-file_explorer">

        //         <div class="yeti-file_explorer-folders">

        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}
                        
        //             </div>


        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">abc</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">def</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">ghi</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}

        //             </div>


        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}

        //             </div>


        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01hasanamethatisjustfarfartoolongandverboseandlongwinded</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}

        //             </div>


        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}

        //             </div>


        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}

        //             </div>


        //             <div class="yeti-file_explorer-folder">

        //                 <ul class="yeti-file_explorer-folder-items">

        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare01</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>


        //                     <li class="yeti-file_explorer-folder-item">

        //                         <button class="yeti-file_explorer-folder-item-wrapper">

        //                             <yeti-icon iconCode="folder" alt="subfolder" icon-style="outlined" class="yeti-file_explorer-folder-item-icon"></yeti-icon>
                                    
        //                             <span class="yeti-file_explorer-folder-item-name">fileshare02</span>
                                    
        //                             <yeti-icon iconCode="chevron_right" alt="open subfolder" class="yeti-file_explorer-folder-more"></yeti-icon>
                                
        //                         </button>

        //                     </li>

        //                 </ul>{/* /folder */}

        //             </div>

        //         </div>{/* /folders */}

        //     </div>

        //     <div class="yeti-file_explorer-path"></div>
    
        // </div>

    );
  }

}