# yeti-accordion-section



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                             | Type      | Default                    |
| -------------- | --------------- | ----------------------------------------------------------------------- | --------- | -------------------------- |
| `contentId`    | `content-id`    | The id of the HTML element representing the panel's content container   | `string`  | `utils.generateUniqueId()` |
| `headerId`     | `header-id`     | The id of the HTML element representing the panel header                | `string`  | `utils.generateUniqueId()` |
| `heading`      | `heading`       | The descriptive text that appears in the heading bar above the content. | `string`  | `'Heading'`                |
| `isExpandable` | `is-expandable` | Whether or not this panel can expand or collapse                        | `boolean` | `false`                    |
| `isExpanded`   | `is-expanded`   | Whether or not this panel is currently expanded.                        | `boolean` | `true`                     |


## Dependencies

### Depends on

- [yeti-icon](../yeti-icon)

### Graph
```mermaid
graph TD;
  yeti-panel --> yeti-icon
  style yeti-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
