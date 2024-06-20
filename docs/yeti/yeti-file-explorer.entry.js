import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiFileExplorer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fileExplorerChange = createEvent(this, "fileExplorerChange", 7);
        this.wrapperClass = '';
        this.showFiles = true;
        this.minimumDisplayDepth = 3;
        this.path = [
            {
                name: "root",
                content: [],
                path: "",
                displayPath: "",
                isFolder: true,
                isRoot: true,
                isSelected: true,
                isLoading: false,
                selectedIndex: -1,
                offset: 0,
                pageSize: 1000,
                totalElements: 0,
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
        let displayPathStringToClickedFolder = ""; // This will be the user-readable version of the path
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
        // Derive the server and display paths to this folder
        serverPathStringToClickedFolder += this.path[depth].content[index].path;
        displayPathStringToClickedFolder += this.path[depth].content[index].displayPath;
        // Fire the change event so the component consumer can provide new data
        this.fileExplorerChange.emit({
            "path": serverPathStringToClickedFolder,
            "displayPath": displayPathStringToClickedFolder,
            "depth": depth,
            "index": index
        });
    }
    handleItemKeyDown(event, depth = 0, index = 0) {
        // A folder or file was just clicked. Handle it.
        let htmlElement = event.target;
        let grandParentULElement = htmlElement.closest(".yeti-file_explorer-folder-items");
        let siblingElements = grandParentULElement.querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper");
        let indexOfSiblingToFocus;
        let siblingToFocus;
        let key = event.key.toLowerCase();
        switch (key) {
            case "arrowdown": {
                event.preventDefault();
                indexOfSiblingToFocus = (index + 1 >= this.path[depth].content.length) ? 0 : index + 1;
                siblingToFocus = siblingElements[indexOfSiblingToFocus];
                siblingToFocus.focus();
                break;
            }
            case "arrowup": {
                event.preventDefault();
                indexOfSiblingToFocus = (index - 1 < 0) ? this.path[depth].content.length - 1 : index - 1;
                siblingToFocus = siblingElements[indexOfSiblingToFocus];
                siblingToFocus.focus();
                break;
            }
            case "arrowright": {
                if (this.path[depth + 1] && this.path[depth + 1].content && this.path[depth + 1].content.length > 0) {
                    let indexOfAncestor = (this.path[depth + 1].selectedIndex > 0) ? this.path[depth + 1].selectedIndex : 0;
                    event.preventDefault();
                    // Find the first button in the next column over and focus on it
                    siblingToFocus = this.el.querySelectorAll(".yeti-file_explorer-folder-items")[depth + 1].querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper")[indexOfAncestor];
                    siblingToFocus.focus();
                    siblingToFocus.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "nearest"
                    });
                }
                break;
            }
            case "arrowleft": {
                if (depth > 0) {
                    let indexOfAncestor = this.path[depth - 1].selectedIndex;
                    event.preventDefault();
                    // Focus on the item in the previous column that's in the path
                    siblingToFocus = this.el.querySelectorAll(".yeti-file_explorer-folder-items")[depth - 1].querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper")[indexOfAncestor];
                    siblingToFocus.focus();
                    siblingToFocus.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "nearest"
                    });
                }
                break;
            }
        }
    }
    async newFolderObject() {
        let folder = {
            content: [],
            name: undefined,
            path: undefined,
            displayPath: undefined,
            isFolder: true,
            isRoot: false,
            isLoading: false,
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
            displayPath: "",
            content: [],
            selectedIndex: -1,
            isRoot: false,
            isSelected: false,
            isLoading: false
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
        // We have two possibilities here. Either the item is in a normal or loading state. We want to return the applicable JSX based on that state.
        // Loading state
        let loadingJsx = h("div", { class: "yeti-file_explorer-folder" }, h("ul", { class: "yeti-file_explorer-folder-items" }, h("li", { class: "yeti-file_explorer-folder-item" }, h("yeti-loading", { isInline: true, isActive: true }))));
        // Normal (not Loading) state
        let jsx = h("div", { class: "yeti-file_explorer-folder" }, h("ul", { class: "yeti-file_explorer-folder-items" }, this.renderFolderContents(folder, depth)));
        return (folder.isLoading) ? loadingJsx : jsx;
    }
    renderFolderContents(folder, depth = -1) {
        return folder.content.map((item, index) => {
            return this.renderItem(item, depth, index);
        });
    }
    renderItem(item, depth = -1, index = -1) {
        let buttonCSS = "yeti-file_explorer-folder-item-wrapper" + ((item.isSelected) ? " yeti-file_explorer-folder-item-wrapper__selected" : "");
        let jsx = h("li", { class: "yeti-file_explorer-folder-item" }, h("button", { class: buttonCSS, onClick: () => { this.handleItemClick(depth, index); }, "data-path": item.path, onKeyDown: (e) => { this.handleItemKeyDown(e, depth, index); } }, h("yeti-icon", { iconCode: "folder", alt: "subfolder", "icon-style": "outlined", class: "yeti-file_explorer-folder-item-icon" }), h("span", { class: "yeti-file_explorer-folder-item-name" }, item.name), h("yeti-icon", { iconCode: "chevron_right", alt: "open subfolder", class: "yeti-file_explorer-folder-more" })));
        return jsx;
    }
    render() {
        let wrapperClass = 'yeti-file_explorer-wrapper';
        wrapperClass += (this.wrapperClass != '') ? ` ${this.wrapperClass}` : '';
        return (h("div", { key: 'a4ab2d4daacc3defb86942fd35fa938c89e8ea7b', class: wrapperClass }, h("div", { key: 'ecb1425a0d97881873bf50c62d1db6c691b3e643', class: "yeti-file_explorer" }, h("div", { key: '425b10322b1da201eba36c30cacde02c2bb3b7ae', class: "yeti-file_explorer-folders" }, this.renderFolders())), h("div", { key: '422660c9e5788cc31d6a4d23c39a6e60d4c7d1ff', class: "yeti-file_explorer-path" }, this.path[this.path.length - 1].displayPath)));
    }
    componentDidRender() {
        // Scroll the last folder into view
        let foldersElement = this.el.querySelector(".yeti-file_explorer-folders");
        if (foldersElement) {
            foldersElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "end"
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