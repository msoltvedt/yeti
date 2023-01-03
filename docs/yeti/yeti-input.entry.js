import { r as registerInstance, e as createEvent, h, g as getElement } from './index-81980a1b.js';
import { u as utils } from './utils-59fc38b7.js';

const YetiInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
    this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
    this.inputValueChanged = createEvent(this, "inputValueChanged", 7);
    this.inputClass = '';
    this.inputId = utils.generateUniqueId();
    this.isValid = true;
    this.inputValue = '';
    this.isTouched = false;
  }
  handleKeyUp(ev) {
    this.isTouched = true;
    this.inputValue = ev.target.value;
    this.readyToVerifyFast.emit(ev);
  }
  handleValueChange(ev) {
    this.inputValueChanged.emit(ev);
  }
  handleFieldBlur(ev) {
    this.isTouched = true;
    this.inputValue = ev.target.value;
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
    return (h("input", { type: "text", class: cssClasses, id: this.inputId, value: this.inputValue, onBlur: (ev) => this.handleFieldBlur(ev) }));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "inputValue": ["handleValueChange"]
  }; }
};

export { YetiInput as yeti_input };
