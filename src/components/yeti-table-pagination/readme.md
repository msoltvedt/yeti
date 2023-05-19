# yeti-table-pagination



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                      | Type      | Default                    |
| --------------------- | ----------------------- | ------------------------------------------------ | --------- | -------------------------- |
| `cssClass`            | `css-class`             |                                                  | `string`  | `''`                       |
| `htmlId`              | `html-id`               |                                                  | `string`  | `utils.generateUniqueId()` |
| `recordAliasPlural`   | `record-alias-plural`   | Descriptor of multiple records (e.g. "22 items") | `string`  | `"items"`                  |
| `recordAliasSingular` | `record-alias-singular` | Descriptor of one record (e.g. "1 item")         | `string`  | `"item"`                   |
| `records`             | `records`               |                                                  | `number`  | `0`                        |
| `recordsDisplayed`    | `records-displayed`     |                                                  | `number`  | `0`                        |
| `selectedPage`        | `selected-page`         |                                                  | `number`  | `1`                        |
| `showOptions`         | `show-options`          |                                                  | `boolean` | `true`                     |
| `startIndex`          | `start-index`           |                                                  | `number`  | `0`                        |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `paginationUpdated` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
