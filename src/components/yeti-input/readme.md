# yeti-input



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default                    |
| ------------ | ------------- | ----------- | --------- | -------------------------- |
| `inputClass` | `input-class` |             | `string`  | `''`                       |
| `inputId`    | `input-id`    |             | `string`  | `utils.generateUniqueId()` |
| `inputValue` | `input-value` |             | `string`  | `''`                       |
| `isValid`    | `is-valid`    |             | `boolean` | `true`                     |


## Events

| Event               | Description | Type                            |
| ------------------- | ----------- | ------------------------------- |
| `inputValueChanged` |             | `CustomEvent<CustomEvent<any>>` |
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
