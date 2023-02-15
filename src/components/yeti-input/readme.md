# yeti-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default                    |
| ------------- | -------------- | ----------- | --------- | -------------------------- |
| `describedBy` | `described-by` |             | `string`  | `""`                       |
| `inputClass`  | `input-class`  |             | `string`  | `''`                       |
| `inputId`     | `input-id`     |             | `string`  | `utils.generateUniqueId()` |
| `inputName`   | `input-name`   |             | `string`  | `this.inputId`             |
| `isValid`     | `is-valid`     |             | `boolean` | `undefined`                |
| `required`    | `required`     |             | `boolean` | `false`                    |
| `value`       | `value`        |             | `string`  | `''`                       |


## Events

| Event               | Description | Type                            |
| ------------------- | ----------- | ------------------------------- |
| `readyToVerifyFast` |             | `CustomEvent<CustomEvent<any>>` |
| `readyToVerifySlow` |             | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Used by

 - [yeti-field](../yeti-field)

### Graph
```mermaid
graph TD;
  yeti-field --> yeti-input
  style yeti-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
