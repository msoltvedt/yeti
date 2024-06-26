import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
        this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
        this.searchFieldClear = createEvent(this, "searchFieldClear", 7);
        this.inputClass = '';
        this.inputId = utils.generateUniqueId();
        this.inputName = this.inputId;
        this.maxlength = 0;
        this.required = false;
        this.type = "text";
        this.isValid = undefined;
        this.value = '';
        this.labeledBy = "";
        this.describedBy = "";
        this.description = "";
        this.placeholder = "";
        this.isTouched = false;
    }
    handleKeyUp(ev) {
        this.isTouched = true;
        this.value = ev.target.value;
        this.readyToVerifyFast.emit(ev);
    }
    handleClearClick(ev) {
        this.value = "";
        this.el.querySelector(".yeti-input").focus();
        ev.preventDefault();
        this.searchFieldClear.emit(ev);
        return false;
    }
    handleFieldBlur(ev) {
        ev.stopImmediatePropagation();
        this.isTouched = true;
        this.value = ev.target.value;
        this.readyToVerifySlow.emit(ev);
    }
    render() {
        let cssClasses = 'yeti-input';
        let clearButtonClass = (this.value != "") ? 'yeti-input-clear' : 'yeti-input-clear yeti-input-clear__inert';
        if (this.inputClass != '') {
            cssClasses += ' ' + this.inputClass;
        }
        if (this.isValid == false) {
            cssClasses += ' yeti-input__error';
        }
        return (h("div", { key: '467e97b31b138520d12db0149abf1e0dfaaa1d29', class: "yeti-input-wrapper" }, h("input", Object.assign({ key: 'c6242842e472054ac1407ea8a7c0c3de9332f67e', type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.labeledBy != "") ? { "aria-labelledby": this.labeledBy } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}), ((this.maxlength != 0) ? { "maxlength": this.maxlength } : {}))), h("button", { key: 'cb2b62d0e5b0a943597a6a4651e6e07ef27675a5', class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { key: '8af062ff6efda0e12d8f857427a107e89c8c75ea', class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { key: '51a196f254207d8392f92743f1390526bf8ef323', class: "yeti-a11y-hidden" }, "Clear search input"))));
    }
    get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map