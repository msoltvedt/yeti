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
        return (h("div", { key: '4fc08a56e8872c3bea425bcfd38d20d3063a5170', class: wrapperClasses }, h("input", Object.assign({ key: '8499f7d0ffc9ef93cc365b58ad3a2be850762ec2', type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.autocomplete != "") ? { "autocomplete": this.autocomplete } : {}), ((this.inputTabindex != "") ? { "tabindex": this.inputTabindex } : {}), ((this.labeledBy != "") ? { "aria-labelledby": this.labeledBy } : {}), ((this.controls != "") ? { "aria-controls": this.controls } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}), ((this.maxlength != 0) ? { "maxlength": this.maxlength } : {}))), h("button", { key: 'a675f6a2bd89ddb2f94e20a01c769e1aa814fc80', class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { key: 'd0c7b9b292410c332de6fd018ed5f7eb5ce9e6b9', class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { key: 'bbfb31d4febe1e1fe912fa993867aee2af3a68e0', class: "yeti-a11y-hidden" }, "Clear search input"))));
    }
    get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map