import { r as registerInstance, h } from './index-0a9ffd8f.js';
import { u as utils } from './utils-ab4e8d6b.js';

const YetiField = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tipId = utils.generateUniqueId();
    this.inputId = utils.generateUniqueId();
    this.inputName = this.inputId;
    this.type = "text";
    this.fieldClass = "";
    this.label = undefined;
    this.tip = undefined;
    this.required = false;
    this.errorMessage = 'Error: please correct this field.';
    this.isValid = true;
    this.defaultValue = '';
    this.autovalidate = true;
    this.isDirty = false;
  }
  validateLabel(newValue) {
    // Label must have a non-empty value.
    const isInvalid = typeof newValue !== 'string' || newValue === '';
    if (isInvalid) {
      throw new Error('yeti-field must have a non-empty label attribute');
    }
  }
  handleReadyToVerifySlow(ev) {
    let childControl = ev.target;
    if (this.autovalidate == false) {
      return;
    }
    if (this.required) {
      // Autoverification is on, this field is required, and the child component just notified us that it's ready for verification.
      // First, regardless of whether it's an input or date-picker, it can't be empty.
      if (childControl.value == "") {
        this.errorMessage = `${this.label} field is required.`;
        this.isValid = false;
        return;
      }
    }
    else if (childControl.nodeName.toLowerCase() == "yeti-date-picker") {
      // Second, if it's a non-empty date-picker, see if it's a valid date.
      if (!childControl.isValid) {
        // The date-picker already validates itself. We just need to check its status.
        this.errorMessage = 'Enter the date in mm/dd/yyyy format.';
        this.isValid = false;
        return;
      }
    }
    this.isValid = true;
  }
  render() {
    let cssClass = "yeti-form-field";
    this.validateLabel(this.label);
    if (this.fieldClass != "") {
      cssClass = "yeti-form-field " + this.fieldClass;
    }
    return (h("div", { class: cssClass }, h("label", { htmlFor: this.inputId, class: "yeti-form-label" }, this.label, this.required ? ' (required)' : null), (this.type == "date") ?
      h("yeti-date-picker", { "input-id": this.inputId, "input-name": this.inputName, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": this.tipId })
      :
        h("yeti-input", { "input-id": this.inputId, "input-class": !this.isValid ? 'yeti-input__error' : null, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": this.tipId }), h("span", { class: "yeti-form-tip", "aria-live": "polite", id: this.tipId }, !this.isValid
      ? this.errorMessage
      :
        this.tip
          ? this.tip
          : null)));
  }
  static get watchers() { return {
    "label": ["validateLabel"]
  }; }
};

export { YetiField as yeti_field };
