# yeti-file-explorer



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                              | Type                   | Default                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | ----------------------- | -------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minimumDisplayDepth` | `minimum-display-depth` | minimum number of folder layers to show                  | `number`               | `3`                                                                                                                                                                                                                                                                                                                                          |
| `path`                | `path`                  | All the displayed folders in order from root to terminus | `YetiFileSystemItem[]` | `[     {       name: "root",       content: [],       path: "",       displayPath: "",       isFolder: true,       isRoot: true,       isSelected: true,       isLoading: false,       selectedIndex: -1,       offset: 0,       pageSize: 1000,       totalElements: 0,       id: utils.generateUniqueId(),       type: "folder"     }   ]` |
| `showFiles`           | `show-files`            | Whether or not to show files (folders are always shown). | `boolean`              | `true`                                                                                                                                                                                                                                                                                                                                       |
| `wrapperClass`        | `wrapper-class`         | CSS classlist applied to the explorer wrapper element.   | `string`               | `''`                                                                                                                                                                                                                                                                                                                                         |


## Events

| Event                | Description                         | Type               |
| -------------------- | ----------------------------------- | ------------------ |
| `fileExplorerChange` | Fires when the user clicks a folder | `CustomEvent<any>` |


## Methods

### `newFolderObject() => Promise<YetiFileSystemItem>`



#### Returns

Type: `Promise<YetiFileSystemItem>`




## Dependencies

### Depends on

- [yeti-loading](../yeti-loading)
- [yeti-icon](../yeti-icon)

### Graph
```mermaid
graph TD;
  yeti-file-explorer --> yeti-loading
  yeti-file-explorer --> yeti-icon
  style yeti-file-explorer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
