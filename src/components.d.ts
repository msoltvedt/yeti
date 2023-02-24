/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { YetiTableContents } from "./utils/utils";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface YetiDatePicker {
        "describedBy": string;
        "inputClass": string;
        "inputId": string;
        "inputName": string;
        "isValid": boolean;
        "required": boolean;
        "value": string;
    }
    interface YetiField {
        "autovalidate": boolean;
        "defaultValue": string;
        "errorMessage": string;
        "fieldClass": string;
        "inputId": string;
        "inputName": string;
        "isValid": boolean;
        "label": string;
        "required": boolean;
        "tip": string;
        "type": string;
    }
    interface YetiInput {
        "describedBy": string;
        "inputClass": string;
        "inputId": string;
        "inputName": string;
        "isValid": boolean;
        "required": boolean;
        "value": string;
    }
    interface YetiMultiselect {
        "actualId": string;
        "cssClass": string;
        "describedBy": string;
        "htmlId": string;
        "htmlName": string;
        "isValid": boolean;
        "placeholder": string;
        "required": boolean;
        "showClear": boolean;
        "value": string;
    }
    interface YetiTable {
        "contents": YetiTableContents;
        "isValid": boolean;
        "tableClass": string;
        "tableId": string;
    }
    interface YetiTableActions {
        "cssClass": string;
        "htmlId": string;
    }
    interface YetiTablePagination {
        "cssClass": string;
        "endIndex": number;
        "htmlId": string;
        "records": number;
        "startIndex": number;
    }
}
export interface YetiDatePickerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiDatePickerElement;
}
export interface YetiInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiInputElement;
}
export interface YetiMultiselectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiMultiselectElement;
}
export interface YetiTablePaginationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiTablePaginationElement;
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLYetiDatePickerElement extends Components.YetiDatePicker, HTMLStencilElement {
    }
    var HTMLYetiDatePickerElement: {
        prototype: HTMLYetiDatePickerElement;
        new (): HTMLYetiDatePickerElement;
    };
    interface HTMLYetiFieldElement extends Components.YetiField, HTMLStencilElement {
    }
    var HTMLYetiFieldElement: {
        prototype: HTMLYetiFieldElement;
        new (): HTMLYetiFieldElement;
    };
    interface HTMLYetiInputElement extends Components.YetiInput, HTMLStencilElement {
    }
    var HTMLYetiInputElement: {
        prototype: HTMLYetiInputElement;
        new (): HTMLYetiInputElement;
    };
    interface HTMLYetiMultiselectElement extends Components.YetiMultiselect, HTMLStencilElement {
    }
    var HTMLYetiMultiselectElement: {
        prototype: HTMLYetiMultiselectElement;
        new (): HTMLYetiMultiselectElement;
    };
    interface HTMLYetiTableElement extends Components.YetiTable, HTMLStencilElement {
    }
    var HTMLYetiTableElement: {
        prototype: HTMLYetiTableElement;
        new (): HTMLYetiTableElement;
    };
    interface HTMLYetiTableActionsElement extends Components.YetiTableActions, HTMLStencilElement {
    }
    var HTMLYetiTableActionsElement: {
        prototype: HTMLYetiTableActionsElement;
        new (): HTMLYetiTableActionsElement;
    };
    interface HTMLYetiTablePaginationElement extends Components.YetiTablePagination, HTMLStencilElement {
    }
    var HTMLYetiTablePaginationElement: {
        prototype: HTMLYetiTablePaginationElement;
        new (): HTMLYetiTablePaginationElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "yeti-date-picker": HTMLYetiDatePickerElement;
        "yeti-field": HTMLYetiFieldElement;
        "yeti-input": HTMLYetiInputElement;
        "yeti-multiselect": HTMLYetiMultiselectElement;
        "yeti-table": HTMLYetiTableElement;
        "yeti-table-actions": HTMLYetiTableActionsElement;
        "yeti-table-pagination": HTMLYetiTablePaginationElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface YetiDatePicker {
        "describedBy"?: string;
        "inputClass"?: string;
        "inputId"?: string;
        "inputName"?: string;
        "isValid"?: boolean;
        "onReadyToVerifySlow"?: (event: YetiDatePickerCustomEvent<CustomEvent>) => void;
        "required"?: boolean;
        "value"?: string;
    }
    interface YetiField {
        "autovalidate"?: boolean;
        "defaultValue"?: string;
        "errorMessage"?: string;
        "fieldClass"?: string;
        "inputId"?: string;
        "inputName"?: string;
        "isValid"?: boolean;
        "label": string;
        "required"?: boolean;
        "tip"?: string;
        "type"?: string;
    }
    interface YetiInput {
        "describedBy"?: string;
        "inputClass"?: string;
        "inputId"?: string;
        "inputName"?: string;
        "isValid"?: boolean;
        "onReadyToVerifyFast"?: (event: YetiInputCustomEvent<CustomEvent>) => void;
        "onReadyToVerifySlow"?: (event: YetiInputCustomEvent<CustomEvent>) => void;
        "required"?: boolean;
        "value"?: string;
    }
    interface YetiMultiselect {
        "actualId"?: string;
        "cssClass"?: string;
        "describedBy"?: string;
        "htmlId"?: string;
        "htmlName"?: string;
        "isValid"?: boolean;
        "onReadyToVerifySlow"?: (event: YetiMultiselectCustomEvent<CustomEvent>) => void;
        "placeholder"?: string;
        "required"?: boolean;
        "showClear"?: boolean;
        "value"?: string;
    }
    interface YetiTable {
        "contents"?: YetiTableContents;
        "isValid"?: boolean;
        "tableClass"?: string;
        "tableId"?: string;
    }
    interface YetiTableActions {
        "cssClass"?: string;
        "htmlId"?: string;
    }
    interface YetiTablePagination {
        "cssClass"?: string;
        "endIndex"?: number;
        "htmlId"?: string;
        "onPaginationUpdated"?: (event: YetiTablePaginationCustomEvent<CustomEvent>) => void;
        "records"?: number;
        "startIndex"?: number;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "yeti-date-picker": YetiDatePicker;
        "yeti-field": YetiField;
        "yeti-input": YetiInput;
        "yeti-multiselect": YetiMultiselect;
        "yeti-table": YetiTable;
        "yeti-table-actions": YetiTableActions;
        "yeti-table-pagination": YetiTablePagination;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "yeti-date-picker": LocalJSX.YetiDatePicker & JSXBase.HTMLAttributes<HTMLYetiDatePickerElement>;
            "yeti-field": LocalJSX.YetiField & JSXBase.HTMLAttributes<HTMLYetiFieldElement>;
            "yeti-input": LocalJSX.YetiInput & JSXBase.HTMLAttributes<HTMLYetiInputElement>;
            "yeti-multiselect": LocalJSX.YetiMultiselect & JSXBase.HTMLAttributes<HTMLYetiMultiselectElement>;
            "yeti-table": LocalJSX.YetiTable & JSXBase.HTMLAttributes<HTMLYetiTableElement>;
            "yeti-table-actions": LocalJSX.YetiTableActions & JSXBase.HTMLAttributes<HTMLYetiTableActionsElement>;
            "yeti-table-pagination": LocalJSX.YetiTablePagination & JSXBase.HTMLAttributes<HTMLYetiTablePaginationElement>;
        }
    }
}
