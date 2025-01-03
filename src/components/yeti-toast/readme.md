# yeti-toast



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                                    | Type      | Default         |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | --------------- |
| `actionLabel`     | `action-label`      | Text label for the action button.                                                                                              | `string`  | `""`            |
| `closesSelfAfter` | `closes-self-after` | Time in ms before the Toast closes itself. Values of less than 1 will be ignored.                                              | `number`  | `0`             |
| `iconAltText`     | `icon-alt-text`     | The alt text for the icon.                                                                                                     | `string`  | `""`            |
| `iconCode`        | `icon-code`         | Which icon to use (see Google Material Icons).                                                                                 | `string`  | `""`            |
| `isLowContrast`   | `is-low-contrast`   | Whether to use the low-contrast variant or not.                                                                                | `boolean` | `false`         |
| `isVisible`       | `is-visible`        | Whether the toast is visible or not.                                                                                           | `boolean` | `true`          |
| `showCloseButton` | `show-close-button` | Whether to show the close button or not.                                                                                       | `boolean` | `true`          |
| `size`            | `size`              | Optionally set a size (currently only supports default and "full")                                                             | `string`  | `""`            |
| `slotId`          | `slot-id`           | id of the component's slot element.                                                                                            | `string`  | `""`            |
| `textTitle`       | `text-title`        | Text value to display as the toast's title.                                                                                    | `string`  | `"Mmmm Toast!"` |
| `toastId`         | `toast-id`          | id of the component's actual element corresponding to the tooltip. Will be auto-populated with a unique value if not provided. | `string`  | `""`            |
| `toastType`       | `toast-type`        | The type of toast: error (default) \| info \| success \| warning \| warningAlt.                                                | `string`  | `""`            |
| `wrapperClass`    | `wrapper-class`     | CSS classlist to add to the element serving as the component's wrapper.                                                        | `string`  | `''`            |


## Events

| Event              | Description                                   | Type               |
| ------------------ | --------------------------------------------- | ------------------ |
| `toastActionClick` | Fires when the user clicks the action button. | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
