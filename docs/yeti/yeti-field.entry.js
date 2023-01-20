import { r as registerInstance, h } from './index-4c7d3552.js';
import { u as utils } from './utils-d2005b2d.js';

const YetiField = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputId = utils.generateUniqueId();
    this.label = undefined;
    this.tip = undefined;
    this.required = false;
    this.errorMessage = 'Error: please correct this field.';
    this.value = '';
    this.isValid = true;
    this.inputValue = '';
    this.isDirty = false;
  }
  validateLabel(newValue) {
    // Label must have a non-empty value.
    const isInvalid = typeof newValue !== 'string' || newValue === '';
    if (isInvalid) {
      throw new Error('yeti-field must have a non-empty label attribute');
    }
  }
  handleInputValueChanged(ev) {
    let yetiInput = ev.target;
    let actualInput = yetiInput.querySelector('input');
    this.inputValue = actualInput.value;
  }
  handleFieldFocus(e) {
    e.target.classList.add('focused');
  }
  ;
  handleFieldBlur(e) {
    this.isDirty = true;
    e.target.classList.remove('focused');
    this.value = e.target.value;
  }
  handleInputChange(e) {
    alert('Input changed!');
    this.inputValue = e.target.value;
  }
  render() {
    this.validateLabel(this.label);
    return (h("div", { class: "yeti-form-field" }, h("label", { htmlFor: this.inputId, class: "yeti-form-label" }, this.label, this.required ? ' (required)' : null), h("yeti-input", { "input-id": this.inputId, "input-class": !this.isValid ? 'yeti-input__error' : null, "input-value": this.inputValue }), this.tip || !this.isValid
      ? h("span", { class: "yeti-form-tip" }, !this.isValid
        ? this.errorMessage
        :
          this.tip
            ? this.tip
            : null)
      : null));
  }
  static get watchers() { return {
    "label": ["validateLabel"]
  }; }
};

export { YetiField as yeti_field };
