import { r as registerInstance, a as createEvent, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
        this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
        this.searchFieldClear = createEvent(this, "searchFieldClear", 7);
        this.inputClass = '';
        this.wrapperClass = '';
        this.autocomplete = '';
        this.inputId = utils.generateUniqueId();
        this.inputName = this.inputId;
        this.maxlength = 0;
        this.required = false;
        this.type = "text";
        this.isValid = undefined;
        this.value = '';
        this.inputTabindex = '';
        this.labeledBy = "";
        this.describedBy = "";
        this.description = "";
        this.placeholder = "";
        this.controls = "";
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
        let wrapperClasses = 'yeti-input-wrapper';
        let clearButtonClass = (this.value != "") ? 'yeti-input-clear' : 'yeti-input-clear yeti-input-clear__inert';
        if (this.inputClass != '') {
            cssClasses += ' ' + this.inputClass;
        }
        if (this.wrapperClass != '') {
            wrapperClasses += ' ' + this.wrapperClass;
        }
        if (this.isValid == false) {
            cssClasses += ' yeti-input__error';
        }
        return (h("div", { key: '5246f7804105e3bdeb2ec73ff974103b9f2025cc', class: wrapperClasses }, h("input", Object.assign({ key: 'b73207ba8a491bb03db60364707844e756362897', type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.autocomplete != "") ? { "autocomplete": this.autocomplete } : {}), ((this.inputTabindex != "") ? { "tabindex": this.inputTabindex } : {}), ((this.labeledBy != "") ? { "aria-labelledby": this.labeledBy } : {}), ((this.controls != "") ? { "aria-controls": this.controls } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}), ((this.maxlength != 0) ? { "maxlength": this.maxlength } : {}))), h("button", { key: '9ca46dc379aa8d0d135b09af82a315831fddeeb4', class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { key: '6f835ae6327197efd634e93ae4202c8c2afd093b', class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { key: 'efd78357009119e03791851503984909208c4ac9', class: "yeti-a11y-hidden" }, "Clear search input"))));
    }
    get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map