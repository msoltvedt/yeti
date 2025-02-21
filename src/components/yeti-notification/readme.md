# yeti-toast



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                    | Type      | Default         |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | --------------- |
| `actionLabel`      | `action-label`      | Text label for the action button.                                                                                              | `string`  | `""`            |
| `iconAltText`      | `icon-alt-text`     | The alt text for the icon.                                                                                                     | `string`  | `""`            |
| `iconCode`         | `icon-code`         | Which icon to use (see Google Material Icons).                                                                                 | `string`  | `""`            |
| `isHighContrast`   | `is-high-contrast`  | Whether to use the high-contrast variant or not.                                                                               | `boolean` | `false`         |
| `isVisible`        | `is-visible`        | Whether the notification is visible or not.                                                                                    | `boolean` | `true`          |
| `notificationId`   | `notification-id`   | id of the component's actual element corresponding to the tooltip. Will be auto-populated with a unique value if not provided. | `string`  | `""`            |
| `notificationType` | `notification-type` | The type of notification: error (default) \| info \| success \| warning \| warningAlt.                                         | `string`  | `""`            |
| `showCloseButton`  | `show-close-button` | Whether to show the close button or not.                                                                                       | `boolean` | `true`          |
| `size`             | `size`              | Optionally set a size (currently only supports default and "full")                                                             | `string`  | `""`            |
| `slotId`           | `slot-id`           | id of the component's slot element.                                                                                            | `string`  | `""`            |
| `textTitle`        | `text-title`        | Text value to display as the notification's title.                                                                             | `string`  | `"Mmmm Toast!"` |
| `wrapperClass`     | `wrapper-class`     | CSS classlist to add to the element serving as the component's wrapper.                                                        | `string`  | `''`            |


## Events

| Event                     | Description                                   | Type               |
| ------------------------- | --------------------------------------------- | ------------------ |
| `notificationActionClick` | Fires when the user clicks the action button. | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
