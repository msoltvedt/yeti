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
        this.isDisabled = false;
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
        let clearButtonClass = (this.value != "" && !this.isDisabled) ? 'yeti-input-clear' : 'yeti-input-clear yeti-input-clear__inert';
        if (this.inputClass != '') {
            cssClasses += ' ' + this.inputClass;
        }
        if (this.wrapperClass != '') {
            wrapperClasses += ' ' + this.wrapperClass;
        }
        if (this.isValid == false) {
            cssClasses += ' yeti-input__error';
        }
        return (h("div", { key: 'f6481d89c00284ea2076c2c974721512fdf3815d', class: wrapperClasses }, h("input", Object.assign({ key: '857ee3a8fdacafc61576887267461d43768ed5d6', type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.isDisabled) ? { "disabled": this.isDisabled } : {}), ((this.autocomplete != "") ? { "autocomplete": this.autocomplete } : {}), ((this.inputTabindex != "") ? { "tabindex": this.inputTabindex } : {}), ((this.labeledBy != "") ? { "aria-labelledby": this.labeledBy } : {}), ((this.controls != "") ? { "aria-controls": this.controls } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}), ((this.maxlength != 0) ? { "maxlength": this.maxlength } : {}))), h("button", { key: '7f481b9eed647f0390a00aed859d8ce64b22d483', class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { key: '681063c473715db85542028416a3ed27e674203d', class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { key: '2de04b30df1a63e4e4211de0dd44159843a6d8fe', class: "yeti-a11y-hidden" }, "Clear search input"))));
    }
    get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map