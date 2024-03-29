# yeti-modal



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                        | Type      | Default           |
| -------------- | --------------- | ---------------------------------------------------------------------------------- | --------- | ----------------- |
| `describedBy`  | `described-by`  | The optional id of an element that describes the modal's content.                  | `string`  | `""`              |
| `heading`      | `heading`       | The string that will display in the modal's heading and serve as its title.        | `string`  | `"Modal Heading"` |
| `isActive`     | `is-active`     | Tracks whether the Modal is displaying or not.                                     | `boolean` | `false`           |
| `isScrollable` | `is-scrollable` | Whether overflowing contents are shown via scrolling or clipped.                   | `boolean` | `true`            |
| `isSideSheet`  | `is-side-sheet` | Whether or not it's the special Side Sheet variant of Modal.                       | `boolean` | `false`           |
| `modalClass`   | `modal-class`   | Optional CSS classes to add to the modal element.                                  | `string`  | `""`              |
| `showClose`    | `show-close`    | Choose to show the close icon (currently an X) or not                              | `boolean` | `true`            |
| `size`         | `size`          | The optional size of the modal (other than the default). Options are xl, l, s, xs. | `string`  | `""`              |


## Dependencies

### Used by

 - [yeti-unsaved-changes](../yeti-unsaved-changes)

### Graph
```mermaid
graph TD;
  yeti-unsaved-changes --> yeti-modal
  style yeti-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
