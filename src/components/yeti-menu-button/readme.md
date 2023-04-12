# yeti-menu-button



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type      | Default     |
| --------------- | ---------------- | ----------- | --------- | ----------- |
| `buttonCSS`     | `button-class`   |             | `string`  | `''`        |
| `buttonId`      | `button-id`      |             | `string`  | `""`        |
| `buttonType`    | `button-type`    |             | `string`  | `""`        |
| `describedBy`   | `described-by`   |             | `string`  | `""`        |
| `hasTooltip`    | `has-tooltip`    |             | `boolean` | `true`      |
| `labelledBy`    | `labelled-by`    |             | `string`  | `""`        |
| `menuAlignment` | `menu-alignment` |             | `string`  | `""`        |
| `menuCSS`       | `menu-class`     |             | `string`  | `''`        |
| `menuId`        | `menu-id`        |             | `string`  | `""`        |
| `tooltipText`   | `tooltip-text`   |             | `string`  | `"Options"` |
| `value`         | `value`          |             | `string`  | `''`        |
| `wrapperCSS`    | `wrapper-class`  |             | `string`  | `''`        |


## Events

| Event              | Description | Type               |
| ------------------ | ----------- | ------------------ |
| `menuButtonChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [yeti-table](../yeti-table)

### Depends on

- [yeti-tooltip](../yeti-tooltip)

### Graph
```mermaid
graph TD;
  yeti-menu-button --> yeti-tooltip
  yeti-table --> yeti-menu-button
  style yeti-menu-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
