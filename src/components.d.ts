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
        "labelledBy": string;
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
    interface YetiIcon {
        "alt"?: string;
        "focusable"?: boolean;
        "iconCSS"?: string;
        "iconCode": string;
        "iconId"?: string;
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
    interface YetiMenuButton {
        "buttonCSS": string;
        "buttonId": string;
        "buttonType"?: string;
        "describedBy": string;
        "hasTooltip": boolean;
        "labelledBy": string;
        "menuAlignment": string;
        "menuCSS": string;
        "menuId": string;
        "tooltipText": string;
        "value": string;
        "wrapperCSS": string;
    }
    interface YetiMultiselect {
        "actualId": string;
        "cssClass": string;
        "describedBy": string;
        "htmlId": string;
        "htmlName": string;
        "isValid": boolean;
        "labelledBy": string;
        "menuAlignment": string;
        "placeholder": string;
        "required": boolean;
        "showClear": boolean;
        "value": string;
    }
    interface YetiProgressBar {
        "barCSS": string;
        "barId": string;
        "error": boolean;
        "helperText": string;
        "label": string;
        "labelCSS": string;
        "progress": number;
        "tooltipPosition": string;
        "tooltipText": string;
        "wrapperCSS": string;
    }
    interface YetiTable {
        "contents": YetiTableContents;
        /**
          * Determines whether to handle filtering (true) or just note the user requested it (false).
         */
        "filterSelf": boolean;
        /**
          * Determines whether to handle pagination (true) or just note the user requested it (false).
         */
        "paginateSelf": boolean;
        "records"?: number;
        /**
          * Determines whether to handle sorting (true) or just note the user requested it (false).
         */
        "sortSelf": boolean;
        "tableClass": string;
        "tableId": string;
    }
    interface YetiTableActions {
        "cssClass": string;
        "htmlId": string;
        "useGrid": boolean;
    }
    interface YetiTablePagination {
        "cssClass": string;
        "htmlId": string;
        "records": number;
        "recordsDisplayed": number;
        "selectedPage": number;
        "startIndex": number;
    }
    interface YetiTooltip {
        "blockAnchor": boolean;
        "position": string;
        "slotId": string;
        "text": string;
        "tipId": string;
        "tooltipCSS": string;
        "wrapperCSS": string;
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
export interface YetiMenuButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiMenuButtonElement;
}
export interface YetiMultiselectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiMultiselectElement;
}
export interface YetiTableCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYetiTableElement;
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
    interface HTMLYetiIconElement extends Components.YetiIcon, HTMLStencilElement {
    }
    var HTMLYetiIconElement: {
        prototype: HTMLYetiIconElement;
        new (): HTMLYetiIconElement;
    };
    interface HTMLYetiInputElement extends Components.YetiInput, HTMLStencilElement {
    }
    var HTMLYetiInputElement: {
        prototype: HTMLYetiInputElement;
        new (): HTMLYetiInputElement;
    };
    interface HTMLYetiMenuButtonElement extends Components.YetiMenuButton, HTMLStencilElement {
    }
    var HTMLYetiMenuButtonElement: {
        prototype: HTMLYetiMenuButtonElement;
        new (): HTMLYetiMenuButtonElement;
    };
    interface HTMLYetiMultiselectElement extends Components.YetiMultiselect, HTMLStencilElement {
    }
    var HTMLYetiMultiselectElement: {
        prototype: HTMLYetiMultiselectElement;
        new (): HTMLYetiMultiselectElement;
    };
    interface HTMLYetiProgressBarElement extends Components.YetiProgressBar, HTMLStencilElement {
    }
    var HTMLYetiProgressBarElement: {
        prototype: HTMLYetiProgressBarElement;
        new (): HTMLYetiProgressBarElement;
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
    interface HTMLYetiTooltipElement extends Components.YetiTooltip, HTMLStencilElement {
    }
    var HTMLYetiTooltipElement: {
        prototype: HTMLYetiTooltipElement;
        new (): HTMLYetiTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "yeti-date-picker": HTMLYetiDatePickerElement;
        "yeti-field": HTMLYetiFieldElement;
        "yeti-icon": HTMLYetiIconElement;
        "yeti-input": HTMLYetiInputElement;
        "yeti-menu-button": HTMLYetiMenuButtonElement;
        "yeti-multiselect": HTMLYetiMultiselectElement;
        "yeti-progress-bar": HTMLYetiProgressBarElement;
        "yeti-table": HTMLYetiTableElement;
        "yeti-table-actions": HTMLYetiTableActionsElement;
        "yeti-table-pagination": HTMLYetiTablePaginationElement;
        "yeti-tooltip": HTMLYetiTooltipElement;
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
        "labelledBy"?: string;
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
    interface YetiIcon {
        "alt"?: string;
        "focusable"?: boolean;
        "iconCSS"?: string;
        "iconCode"?: string;
        "iconId"?: string;
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
    interface YetiMenuButton {
        "buttonCSS"?: string;
        "buttonId"?: string;
        "buttonType"?: string;
        "describedBy"?: string;
        "hasTooltip"?: boolean;
        "labelledBy"?: string;
        "menuAlignment"?: string;
        "menuCSS"?: string;
        "menuId"?: string;
        "onMenuButtonChange"?: (event: YetiMenuButtonCustomEvent<any>) => void;
        "tooltipText"?: string;
        "value"?: string;
        "wrapperCSS"?: string;
    }
    interface YetiMultiselect {
        "actualId"?: string;
        "cssClass"?: string;
        "describedBy"?: string;
        "htmlId"?: string;
        "htmlName"?: string;
        "isValid"?: boolean;
        "labelledBy"?: string;
        "menuAlignment"?: string;
        "onReadyToVerifyFast"?: (event: YetiMultiselectCustomEvent<CustomEvent>) => void;
        "onReadyToVerifySlow"?: (event: YetiMultiselectCustomEvent<CustomEvent>) => void;
        "placeholder"?: string;
        "required"?: boolean;
        "showClear"?: boolean;
        "value"?: string;
    }
    interface YetiProgressBar {
        "barCSS"?: string;
        "barId"?: string;
        "error"?: boolean;
        "helperText"?: string;
        "label"?: string;
        "labelCSS"?: string;
        "progress"?: number;
        "tooltipPosition"?: string;
        "tooltipText"?: string;
        "wrapperCSS"?: string;
    }
    interface YetiTable {
        "contents"?: YetiTableContents;
        /**
          * Determines whether to handle filtering (true) or just note the user requested it (false).
         */
        "filterSelf"?: boolean;
        "onRowActionClick"?: (event: YetiTableCustomEvent<any>) => void;
        "onTableFilter"?: (event: YetiTableCustomEvent<any>) => void;
        "onTablePaginate"?: (event: YetiTableCustomEvent<any>) => void;
        "onTableSort"?: (event: YetiTableCustomEvent<any>) => void;
        /**
          * Determines whether to handle pagination (true) or just note the user requested it (false).
         */
        "paginateSelf"?: boolean;
        "records"?: number;
        /**
          * Determines whether to handle sorting (true) or just note the user requested it (false).
         */
        "sortSelf"?: boolean;
        "tableClass"?: string;
        "tableId"?: string;
    }
    interface YetiTableActions {
        "cssClass"?: string;
        "htmlId"?: string;
        "useGrid"?: boolean;
    }
    interface YetiTablePagination {
        "cssClass"?: string;
        "htmlId"?: string;
        "onPaginationUpdated"?: (event: YetiTablePaginationCustomEvent<any>) => void;
        "records"?: number;
        "recordsDisplayed"?: number;
        "selectedPage"?: number;
        "startIndex"?: number;
    }
    interface YetiTooltip {
        "blockAnchor"?: boolean;
        "position"?: string;
        "slotId"?: string;
        "text"?: string;
        "tipId"?: string;
        "tooltipCSS"?: string;
        "wrapperCSS"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "yeti-date-picker": YetiDatePicker;
        "yeti-field": YetiField;
        "yeti-icon": YetiIcon;
        "yeti-input": YetiInput;
        "yeti-menu-button": YetiMenuButton;
        "yeti-multiselect": YetiMultiselect;
        "yeti-progress-bar": YetiProgressBar;
        "yeti-table": YetiTable;
        "yeti-table-actions": YetiTableActions;
        "yeti-table-pagination": YetiTablePagination;
        "yeti-tooltip": YetiTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "yeti-date-picker": LocalJSX.YetiDatePicker & JSXBase.HTMLAttributes<HTMLYetiDatePickerElement>;
            "yeti-field": LocalJSX.YetiField & JSXBase.HTMLAttributes<HTMLYetiFieldElement>;
            "yeti-icon": LocalJSX.YetiIcon & JSXBase.HTMLAttributes<HTMLYetiIconElement>;
            "yeti-input": LocalJSX.YetiInput & JSXBase.HTMLAttributes<HTMLYetiInputElement>;
            "yeti-menu-button": LocalJSX.YetiMenuButton & JSXBase.HTMLAttributes<HTMLYetiMenuButtonElement>;
            "yeti-multiselect": LocalJSX.YetiMultiselect & JSXBase.HTMLAttributes<HTMLYetiMultiselectElement>;
            "yeti-progress-bar": LocalJSX.YetiProgressBar & JSXBase.HTMLAttributes<HTMLYetiProgressBarElement>;
            "yeti-table": LocalJSX.YetiTable & JSXBase.HTMLAttributes<HTMLYetiTableElement>;
            "yeti-table-actions": LocalJSX.YetiTableActions & JSXBase.HTMLAttributes<HTMLYetiTableActionsElement>;
            "yeti-table-pagination": LocalJSX.YetiTablePagination & JSXBase.HTMLAttributes<HTMLYetiTablePaginationElement>;
            "yeti-tooltip": LocalJSX.YetiTooltip & JSXBase.HTMLAttributes<HTMLYetiTooltipElement>;
        }
    }
}
