import { r as registerInstance, h } from './index-258cb736.js';

const YetiInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.htmlId = 'id1';
    this.label = undefined;
    this.inputTip = undefined;
    this.required = false;
    this.value = '';
    this.isDirty = false;
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
  render() {
    return (h("div", { class: "wrapper" }, h("label", { htmlFor: this.htmlId, class: "label" }, this.label, this.required ? ' (required)' : null), h("input", { type: "text", class: "field", id: this.htmlId, value: this.value, onFocus: (e) => this.handleFieldFocus(e), onBlur: (e) => this.handleFieldBlur(e) }), (this.isDirty && this.required && !this.value)
      ? h("span", { class: "error" }, "Please enter a value.")
      : null, this.inputTip
      ? h("span", { class: "input_tip" }, this.inputTip)
      : null));
  }
};

export { YetiInput as yeti_input };
