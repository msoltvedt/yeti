# yeti-icon



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                               | Type     | Default |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `assignedId`   | `assigned-id`   | Id assigned by parent Yeti Reorderer component.                                                           | `string` | `''`    |
| `downTrigger`  | `down-trigger`  | Id of the HTML element that should move this reorderee up the order when clicked.                         | `string` | `''`    |
| `position`     | `position`      | Position (of sibling yeti-reorderee elements) assigned by parent Yeti Reorderer component.                | `number` | `-1`    |
| `reorderees`   | `reorderees`    | Total number of yeti-reorderee siblings, including this one (assigned by parent Yeti Reorderer component) | `number` | `-1`    |
| `upTrigger`    | `up-trigger`    | Id of the HTML element that should move this reorderee up the order when clicked.                         | `string` | `''`    |
| `wrapperClass` | `wrapper-class` | CSS class list that should apply to the HTML element wrapping the slotted content.                        | `string` | `''`    |


## Events

| Event              | Description | Type               |
| ------------------ | ----------- | ------------------ |
| `reorderRequested` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
