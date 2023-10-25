# yeti-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute         | Description                                                                                        | Type      | Default                    |
| ------------- | ----------------- | -------------------------------------------------------------------------------------------------- | --------- | -------------------------- |
| `describedBy` | `described-by`    | id of an outside HTML element pointed to by the actual input element's aria-describedby attribute. | `string`  | `""`                       |
| `description` | `description`     | Text description of what the input is or does                                                      | `string`  | `""`                       |
| `inputClass`  | `input-class`     | CSS classlist applied to the actual HTML input element.                                            | `string`  | `''`                       |
| `inputId`     | `input-id`        | id applied to the actual HTML input element.                                                       | `string`  | `utils.generateUniqueId()` |
| `inputName`   | `input-name`      | name applied to the actual HTML input element. Defaults to match id.                               | `string`  | `this.inputId`             |
| `isValid`     | `is-valid`        | Tracks whether the input's current value is valid or not.                                          | `boolean` | `undefined`                |
| `labeledBy`   | `labeled-by`      | id of an outside HTML element pointed to by the actual input element's aria-labeledby attribute.   | `string`  | `""`                       |
| `maxlength`   | `input-maxlength` | Optional attribute to set the maxlength of the field                                               | `number`  | `0`                        |
| `placeholder` | `placeholder`     | Standard old-school input placeholder                                                              | `string`  | `""`                       |
| `required`    | `required`        | Whether the field is required to have a valid value or not.                                        | `boolean` | `false`                    |
| `type`        | `type`            | What type of input element this is; defaults to "text".                                            | `string`  | `"text"`                   |
| `value`       | `value`           | The actual value of the input field.                                                               | `string`  | `''`                       |


## Events

| Event               | Description                                                                                     | Type                            |
| ------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------- |
| `readyToVerifyFast` | Event that fires when the user enters or changes the contents of the input field.               | `CustomEvent<CustomEvent<any>>` |
| `readyToVerifySlow` | Event that fires when the user leaves (blurs) the input field.                                  | `CustomEvent<CustomEvent<any>>` |
| `searchFieldClear`  | Event that fires when the field is a search field and the user hits the clear button within it. | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Used by

 - [yeti-field](../yeti-field)
 - [yeti-table](../yeti-table)

### Graph
```mermaid
graph TD;
  yeti-field --> yeti-input
  yeti-table --> yeti-input
  style yeti-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
