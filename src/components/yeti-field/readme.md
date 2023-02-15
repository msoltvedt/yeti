# yeti-form-field



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute       | Description | Type      | Default                               |
| -------------------- | --------------- | ----------- | --------- | ------------------------------------- |
| `autovalidate`       | `autovalidate`  |             | `boolean` | `true`                                |
| `defaultValue`       | `default-value` |             | `string`  | `''`                                  |
| `errorMessage`       | `error-message` |             | `string`  | `'Error: please correct this field.'` |
| `inputId`            | `input-id`      |             | `string`  | `utils.generateUniqueId()`            |
| `inputName`          | `input-name`    |             | `string`  | `this.inputId`                        |
| `isValid`            | `is-valid`      |             | `boolean` | `true`                                |
| `label` _(required)_ | `label`         |             | `string`  | `undefined`                           |
| `required`           | `required`      |             | `boolean` | `false`                               |
| `tip`                | `tip`           |             | `string`  | `undefined`                           |
| `type`               | `type`          |             | `string`  | `"text"`                              |


## Dependencies

### Depends on

- [yeti-date-picker](../yeti-date-picker)
- [yeti-input](../yeti-input)

### Graph
```mermaid
graph TD;
  yeti-field --> yeti-date-picker
  yeti-field --> yeti-input
  style yeti-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
