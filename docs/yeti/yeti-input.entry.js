import { r as registerInstance, a as createEvent, h, g as getElement } from './index-2baeb834.js';
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
        return (h("div", { key: '3957a9151d7acfebf30886d040d72edac3742c6d', class: "yeti-input-wrapper" }, h("input", Object.assign({ key: '85df39fafdba6d57d7bbd62a31de913a00121dce', type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.labeledBy != "") ? { "aria-labelledby": this.labeledBy } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}), ((this.maxlength != 0) ? { "maxlength": this.maxlength } : {}))), h("button", { key: 'be60ac1b76dc666313addfe768a6b942179f491a', class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { key: 'bae38b4a1e1251bd7261ac5b4743775e94e1e79d', class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { key: 'fb212d42f118be85fe0ee160d4177a4dba835f42', class: "yeti-a11y-hidden" }, "Clear search input"))));
    }
    get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map