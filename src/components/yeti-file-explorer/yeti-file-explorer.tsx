import { Component, Prop, h, State, Element, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { YetiFileSystemItem, utils } from '../../utils/utils';

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
   * minimum number of folder layers to show
   */
  @Prop() minimumDisplayDepth: number = 3;

  /**
   * All the displayed folders in order from root to terminus
   */
  @Prop({ mutable: true }) path: YetiFileSystemItem[] = /*[
    {
      name: "root",
      content: [],
      path: "//",
      isFolder: true,
      isRoot: true,
      isSelected: true,
      isTerminus: false,
      selectedIndex: -1,
      offset: 0,
      pageSize: 1000,
      totalElements: 0,
      id: utils.generateUniqueId(),
      type: "folder"
    }
  ];*/
  [
    {
      name: "root",
      content: [
        {
          name: "subfolder1",
          content: [],
          path: "//subfolder1",
          isFolder: true,
          isRoot: false,
          isSelected: false,
          selectedIndex: -1,
          offset: 0,
          pageSize: 1000,
          totalElements: 0,
          id: utils.generateUniqueId(),
          type: "folder"
        },
        {
          name: "subfolder2",
          content: [],
          path: "//subfolder2",
          isFolder: true,
          isRoot: false,
          isSelected: false,
          selectedIndex: -1,
          offset: 0,
          pageSize: 1000,
          totalElements: 0,
          id: utils.generateUniqueId(),
          type: "folder"
        },
        {
          name: "subfolder3",
          content: [],
          path: "//subfolder3",
          isFolder: true,
          isRoot: false,
          isSelected: false,
          selectedIndex: -1,
          offset: 0,
          pageSize: 1000,
          totalElements: 0,
          id: utils.generateUniqueId(),
          type: "folder"
        },
      ],
      path: "",
      isFolder: true,
      isRoot: true,
      isSelected: true,
      selectedIndex: -1,
      offset: 0,
      pageSize: 1000,
      totalElements: 3,
      id: utils.generateUniqueId(),
      type: "folder"
    }
  ];
  @Watch("path")
  handlePathChange() {
    // TODO: validate the incoming path variable
  }

  /**
   * Toggle to trigger a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = false;



  handleItemClick(depth: number = 0, index: number = 0) {
    // A folder or file was just clicked. Handle it.
    let serverPathStringToClickedFolder = ""; // This will be the term by which the server identifies this folder
    
    // If necessary, prune any folders that would be to the right of this.
    while (this.path.length > depth + 1) {
      this.path.pop();
    }

    // (Re)set the isSelected state for this folder and its sibling
    this.path[depth].content.forEach((val) => {
      val.isSelected = false;
    })

    // Update the path at this depth
    this.path[depth].isSelected = true;
    this.path[depth].selectedIndex = index;

    // Derive the server path to this folder
    serverPathStringToClickedFolder += this.path[depth].content[index].path;

    // Fire the change event so the component consumer can provide new data
    this.fileExplorerChange.emit({
      "path": serverPathStringToClickedFolder,
      "depth": depth,
      "index": index
    });
    
  }



  @Method()
  async newFolderObject() {
    let folder: YetiFileSystemItem = {
      content: [],
      name: undefined,
      path: undefined,
      isFolder: true,
      isRoot: false,
      isSelected: false,
      selectedIndex: -1,
      id: utils.generateUniqueId()
    };
    return folder;
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
      isSelected: false
    }

    // Loop through the path and render each folder in it
    this.path.forEach((folder, index) => {
      folders.push(this.renderFolder(folder, index));
    });

    while (folders.length < this.minimumDisplayDepth) {
      folders.push(this.renderFolder(emptyFolder, -1));
    }

    return folders;
  }



  renderFolder(folder: YetiFileSystemItem, depth) {

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

          <button class={buttonCSS} onClick={() => { this.handleItemClick(depth, index); }} data-path={item.path}>

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

      
        <div class="yeti-file_explorer-path">{this.path[ this.path.length - 1 ].path}</div>

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