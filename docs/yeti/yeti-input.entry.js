import { r as registerInstance, e as createEvent, h, g as getElement } from './index-63c9e11c.js';
import { u as utils } from './utils-a407a515.js';

const YetiInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
    this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
    this.inputClass = '';
    this.inputId = utils.generateUniqueId();
    this.inputName = this.inputId;
    this.required = false;
    this.isValid = undefined;
    this.value = '';
    this.describedBy = "";
    this.isTouched = false;
  }
  handleKeyUp(ev) {
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifyFast.emit(ev);
  }
  handleFieldBlur(ev) {
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifySlow.emit(ev);
  }
  render() {
    let cssClasses = 'yeti-input';
    if (this.inputClass != '') {
      cssClasses += ' ' + this.inputClass;
    }
    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }
    return (h("input", Object.assign({ type: "text", class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid }, ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}))));
  }
  get el() { return getElement(this); }
};

export { YetiInput as yeti_input };
