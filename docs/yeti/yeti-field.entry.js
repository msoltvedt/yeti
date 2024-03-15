import { r as registerInstance, h } from './index-2baeb834.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiField = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tipId = utils.generateUniqueId();
        this.inputId = utils.generateUniqueId();
        this.inputName = this.inputId;
        this.type = "text";
        this.fieldClass = "";
        this.inputMaxlength = 0;
        this.label = undefined;
        this.tip = "";
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
        return (h("div", { key: '574cead684bf58d0fad0888d37582090a65a0cc2', class: cssClass }, h("label", { key: '46f30cb84f2bd64419aad4623cb4b5d28419af65', htmlFor: this.inputId, class: "yeti-form-label" }, this.label, this.required ? ' (required)' : null), (this.type == "date") ?
            h("yeti-date-picker", { "input-id": this.inputId, "input-name": this.inputName, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": this.tipId })
            :
                h("yeti-input", Object.assign({ "input-id": this.inputId, "input-class": !this.isValid ? 'yeti-input__error' : null, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": this.tipId }, ((this.inputMaxlength != 0) ? { "input-maxlength": this.inputMaxlength } : {}))), (this.tip != "") ?
            h("span", { class: "yeti-form-tip", "aria-live": "polite", id: this.tipId }, !this.isValid
                ? this.errorMessage
                :
                    this.tip
                        ? this.tip
                        : null)
            :
                ""));
    }
    static get watchers() { return {
        "label": ["validateLabel"]
    }; }
};

export { YetiField as yeti_field };

//# sourceMappingURL=yeti-field.entry.js.map