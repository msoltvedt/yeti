import { r as registerInstance, a as createEvent, h, g as getElement } from './index-d74f5b26.js';
import { u as utils } from './utils-b92a1748.js';

const YetiFileExplorer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fileExplorerChange = createEvent(this, "fileExplorerChange", 7);
    this.wrapperCSS = '';
    this.showFiles = true;
    this.minimumDisplayDepth = 3;
    this.path = [
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
    this.iLoveJSX = false;
  }
  handlePathChange() {
    // TODO: validate the incoming path variable
  }
  handleItemClick(depth = 0, index = 0) {
    // A folder or file was just clicked. Handle it.
    let serverPathStringToClickedFolder = ""; // This will be the term by which the server identifies this folder
    // If necessary, prune any folders that would be to the right of this.
    while (this.path.length > depth + 1) {
      this.path.pop();
    }
    // (Re)set the isSelected state for this folder and its sibling
    this.path[depth].content.forEach((val) => {
      val.isSelected = false;
    });
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
  async newFolderObject() {
    let folder = {
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
    let emptyFolder = {
      name: "",
      path: "/",
      content: [],
      selectedIndex: -1,
      isRoot: false,
      isSelected: false
    };
    // Loop through the path and render each folder in it
    this.path.forEach((folder, index) => {
      folders.push(this.renderFolder(folder, index));
    });
    while (folders.length < this.minimumDisplayDepth) {
      folders.push(this.renderFolder(emptyFolder, -1));
    }
    return folders;
  }
  renderFolder(folder, depth) {
    let jsx = h("div", { class: "yeti-file_explorer-folder" }, h("ul", { class: "yeti-file_explorer-folder-items" }, this.renderFolderContents(folder, depth)));
    return jsx;
  }
  renderFolderContents(folder, depth = -1) {
    return folder.content.map((item, index) => {
      return this.renderItem(item, depth, index);
    });
  }
  renderItem(item, depth = -1, index = -1) {
    let buttonCSS = "yeti-file_explorer-folder-item-wrapper" + ((item.isSelected) ? " yeti-file_explorer-folder-item-wrapper__selected" : "");
    let jsx = h("li", { class: "yeti-file_explorer-folder-item" }, h("button", { class: buttonCSS, onClick: () => { this.handleItemClick(depth, index); }, "data-path": item.path }, h("yeti-icon", { iconCode: "folder", alt: "subfolder", "icon-style": "outlined", class: "yeti-file_explorer-folder-item-icon" }), h("span", { class: "yeti-file_explorer-folder-item-name" }, item.name), h("yeti-icon", { iconCode: "chevron_right", alt: "open subfolder", class: "yeti-file_explorer-folder-more" })));
    return jsx;
  }
  render() {
    let wrapperCSS = 'yeti-file_explorer-wrapper';
    wrapperCSS += (this.wrapperCSS != '') ? ` ${this.wrapperCSS}` : '';
    return (h("div", { class: wrapperCSS }, h("div", { class: "yeti-file_explorer" }, h("div", { class: "yeti-file_explorer-folders" }, this.renderFolders())), h("div", { class: "yeti-file_explorer-path" }, this.path[this.path.length - 1].path)));
  }
  componentDidRender() {
    // Scroll the last folder into view
    let folderElements = this.el.querySelectorAll(".yeti-file_explorer-folder");
    if (folderElements && folderElements.length) {
      folderElements[folderElements.length - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "path": ["handlePathChange"]
  }; }
};

export { YetiFileExplorer as yeti_file_explorer };

//# sourceMappingURL=yeti-file-explorer.entry.js.map