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
        this.isValid = true;
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
        this.readyToVerifyFast.emit({
            "originalEvent": ev,
            "yetiInput": this.el,
            "value": ev.target.value
        });
    }
    handleClearClick(ev) {
        this.value = "";
        this.el.querySelector(".yeti-input").focus();
        ev.preventDefault();
        this.searchFieldClear.emit({
            "originalEvent": ev,
            "yetiInput": this.el,
            "value": ev.target.value
        });
        return false;
    }
    handleFieldBlur(ev) {
        ev.stopImmediatePropagation();
        this.isTouched = true;
        this.value = ev.target.value;
        this.readyToVerifySlow.emit({
            "originalEvent": ev,
            "yetiInput": this.el,
            "value": ev.target.value
        });
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
        return (h("div", { key: 'a53c299518b77ad07616b46648df9d3ecf6d40ad', class: wrapperClasses }, h("input", Object.assign({ key: 'abf134205afe6a339ab9fd6e3901b5210999c349', type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.autocomplete != "") ? { "autocomplete": this.autocomplete } : {}), ((this.inputTabindex != "") ? { "tabindex": this.inputTabindex } : {}), ((this.labeledBy != "") ? { "aria-labelledby": this.labeledBy } : {}), ((this.controls != "") ? { "aria-controls": this.controls } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}), ((this.maxlength != 0) ? { "maxlength": this.maxlength } : {}))), h("button", { key: '2ab74313effe7f5b288e8696bbd5897e573d123e', class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { key: 'fbc5aa8cd42ac57a1bf14923b6c2fdcd00fa5c86', class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { key: 'af873ef55180dbcf8eb7d747d12927257ff2c385', class: "yeti-a11y-hidden" }, "Clear search input"))));
    }
    get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map