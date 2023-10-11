import { r as registerInstance, a as createEvent, h, g as getElement } from './index-d74f5b26.js';
import { u as utils } from './utils-b92a1748.js';

const YetiInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
    this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
    this.searchFieldClear = createEvent(this, "searchFieldClear", 7);
    this.inputClass = '';
    this.inputId = utils.generateUniqueId();
    this.inputName = this.inputId;
    this.required = false;
    this.type = "text";
    this.isValid = undefined;
    this.value = '';
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
    return (h("div", { class: "yeti-input-wrapper" }, h("input", Object.assign({ type: this.type, class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onKeyUp: (ev) => this.handleKeyUp(ev), onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), ((this.description != "") ? { "aria-description": this.description } : {}), ((this.placeholder != "") ? { "placeholder": this.placeholder } : {}))), h("button", { class: clearButtonClass, onClick: (ev) => this.handleClearClick(ev) }, h("span", { class: "material-icons yeti-size-4 yeti-typo-size-4", "aria-hidden": "true" }, "close"), h("span", { class: "yeti-a11y-hidden" }, "clear"))));
  }
  get el() { return getElement(this); }
};

export { YetiInput as yeti_input };

//# sourceMappingURL=yeti-input.entry.js.map