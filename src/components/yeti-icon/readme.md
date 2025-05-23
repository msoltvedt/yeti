# yeti-icon



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                                                                         | Type      | Default                    |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------- |
| `alt`       | `alt`        | Optional replacement text to use as a more clear description of the icon for screen-reader users. Otherwise AT will announce the Google "code" (i.e. check_circle). | `string`  | `""`                       |
| `focusable` | `focusable`  | Whether the icon can gain focus (used primarily for tooltip anchors).                                                                                               | `boolean` | `false`                    |
| `iconClass` | `icon-class` | CSS classlist applied to the actual element producing the icon.                                                                                                     | `string`  | `''`                       |
| `iconCode`  | `type`       | The type of icon. Corresponds to the analogous "code" Google uses (i.e. check_circle).                                                                              | `string`  | `'check_circle'`           |
| `iconId`    | `icon-id`    | id of the actual element producing the icon. Set to a unique id if one is not provided.                                                                             | `string`  | `utils.generateUniqueId()` |
| `iconStyle` | `icon-style` | The style of icon. Defaults to solid, but can also be "outlined".                                                                                                   | `string`  | `''`                       |


## Dependencies

### Used by

 - [yeti-accordion-section](../yeti-accordion-section)
 - [yeti-combobox](../yeti-combobox)
 - [yeti-dropdown](../yeti-dropdown)
 - [yeti-file-explorer](../yeti-file-explorer)
 - [yeti-page-contents](../yeti-page-contents)
 - [yeti-panel](../yeti-panel)
 - [yeti-table](../yeti-table)
 - [yeti-tooltip](../yeti-tooltip)

### Graph
```mermaid
graph TD;
  yeti-accordion-section --> yeti-icon
  yeti-combobox --> yeti-icon
  yeti-dropdown --> yeti-icon
  yeti-file-explorer --> yeti-icon
  yeti-page-contents --> yeti-icon
  yeti-panel --> yeti-icon
  yeti-table --> yeti-icon
  yeti-tooltip --> yeti-icon
  style yeti-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
