# yeti-input



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                           | Type      | Default                    |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- | --------- | -------------------------- |
| `autocomplete`       | `autocomplete`         | Passthrough to the textarea's autocomplete attribute.                                                 | `string`  | `''`                       |
| `characterCounterId` | `character-counter-id` | Id of an HTML element that represents the character counter                                           | `string`  | `""`                       |
| `describedBy`        | `described-by`         | id of an outside HTML element pointed to by the actual textarea element's aria-describedby attribute. | `string`  | `""`                       |
| `description`        | `description`          | Text description of what the textarea is or does                                                      | `string`  | `""`                       |
| `isDisabled`         | `is-disabled`          | Whether or not the textarea is disabled.                                                              | `boolean` | `false`                    |
| `isValid`            | `is-valid`             | Tracks whether the textarea's current value is valid or not.                                          | `boolean` | `true`                     |
| `labeledBy`          | `labeled-by`           | id of an outside HTML element pointed to by the actual textarea element's aria-labeledby attribute.   | `string`  | `""`                       |
| `maxlength`          | `textarea-maxlength`   | Optional attribute to set the maxlength of the field                                                  | `number`  | `100000`                   |
| `required`           | `required`             | Whether the field is required to have a valid value or not.                                           | `boolean` | `false`                    |
| `textareaClass`      | `textarea-class`       | CSS classlist applied to the actual HTML textarea element.                                            | `string`  | `''`                       |
| `textareaId`         | `textarea-id`          | id applied to the actual HTML textarea element.                                                       | `string`  | `utils.generateUniqueId()` |
| `textareaName`       | `textarea-name`        | name applied to the actual HTML textarea element. Defaults to match id.                               | `string`  | `this.textareaId`          |
| `textareaTabindex`   | `textarea-tabindex`    | The tabindex of the textarea field.                                                                   | `string`  | `''`                       |
| `value`              | `value`                | The actual value of the textarea field.                                                               | `string`  | `''`                       |
| `wrapperClass`       | `wrapper-class`        | CSS classlist applied to the HTML wrapper around the element and associated elements.                 | `string`  | `''`                       |


## Events

| Event               | Description                                                                       | Type               |
| ------------------- | --------------------------------------------------------------------------------- | ------------------ |
| `readyToVerifyFast` | Event that fires when the user enters or changes the contents of the input field. | `CustomEvent<any>` |
| `readyToVerifySlow` | Event that fires when the user leaves (blurs) the input field.                    | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
