import { r as registerInstance, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiField = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tipId = utils.generateUniqueId();
        this.errorId = utils.generateUniqueId();
        this.hasSlottedField = false;
        this.hasSlottedRequired = false;
        this.inputId = utils.generateUniqueId();
        this.inputName = this.inputId;
        this.type = "text";
        this.fieldClass = "";
        this.inputMaxlength = 0;
        this.label = undefined;
        this.tip = "";
        this.tipPosition = "below";
        this.required = false;
        this.errorMessage = 'Error: please correct this field.';
        this.isValid = true;
        this.defaultValue = '';
        this.autovalidate = true;
        this.isInline = false;
        this.isDirty = false;
    }
    validateLabel(newValue) {
        // Label must have a non-empty value.
        const isInvalid = typeof newValue !== 'string' || newValue === '';
        if (isInvalid) {
            throw new Error('yeti-field must have a non-empty label attribute');
        }
    }
    updateSlottedContentForErrorState(newValue) {
        if (!this.hasSlottedField) {
            return; // We don't need to do anything here unless the form element comes via slotted content.
        }
        let element = this.el.querySelector(`#${this.inputId}`);
        if (element) {
            if (newValue) {
                element.classList.add("yeti-input__error");
            }
            else {
                element.classList.remove("yeti-input__error");
            }
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
                this.errorMessage = (this.errorMessage != "") ? this.errorMessage : `${this.label} field is required.`;
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
    componentWillLoad() {
        let potentiallySlottedElement = this.el.querySelector('[slot="element"]');
        let potentiallySlottedRequired = this.el.querySelector('[slot="required"]');
        let describedBy = (this.tip != "") ? `${this.tipId} ` : ``;
        describedBy += (this.errorMessage != "" && !this.isValid) ? `${this.errorId}` : ``;
        // Handle Required
        if (potentiallySlottedRequired) {
            this.hasSlottedRequired = true;
        }
        // Handle Element
        if (potentiallySlottedElement) {
            this.hasSlottedField = true;
            this.autovalidate = false; // We can't autovalidate a slotted element provided by the user
            // See if the slotted element has an id
            if (potentiallySlottedElement.id) {
                this.inputId = potentiallySlottedElement.id; // It does, so replace the auto-generated default with the user-provided one.
            }
            else {
                potentiallySlottedElement.id = this.inputId; // It doesn't, so assign the auto-generated default one.
            }
            // See if the slotted element has a name
            if (potentiallySlottedElement.hasAttribute("name")) {
                this.inputName = potentiallySlottedElement.getAttribute("name"); // It does, so replace the auto-generated default with the user-provided one.
            }
            else {
                potentiallySlottedElement.setAttribute("name", this.inputName); // It doesn't, so assign the auto-generated default one.
            }
            // Connect the slotted element to the tip and/or error message
            if (describedBy != "") {
                potentiallySlottedElement.setAttribute("aria-describedby", describedBy);
            }
            // Add the error class if necessary
            if (!this.isValid) {
                potentiallySlottedElement.classList.add("yeti-input__error");
            }
        }
    }
    render() {
        let cssClass = "yeti-form-field";
        let tipClass = `yeti-form-tip`;
        tipClass += (this.tipPosition == "above") ? ` yeti-form-tip-above` : ``;
        let describedBy = (this.tip != "") ? `${this.tipId} ` : ``;
        describedBy += (this.errorMessage != "" && !this.isValid) ? `${this.errorId}` : ``;
        console.log(`IsValid is ${this.isValid}`);
        if (this.isInline) {
            cssClass += " yeti-form-field-inline";
        }
        this.validateLabel(this.label);
        if (this.fieldClass != "") {
            cssClass = "yeti-form-field " + this.fieldClass;
        }
        return (h("div", { key: '3b757de5ce187070f22fecf996e189078348c85b', class: cssClass }, h("label", { key: '776e0e81ee5322bd1013ed2788806810d2fbf37b', htmlFor: this.inputId, class: "yeti-form-label" }, `${this.label} `, (this.required && this.hasSlottedRequired) ? h("slot", { name: "required" }) : null), (!this.hasSlottedField) ?
            (this.type == "date") ?
                h("yeti-date-picker", { "input-id": this.inputId, "input-name": this.inputName, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": describedBy })
                :
                    h("yeti-input", Object.assign({ "input-id": this.inputId, "input-class": !this.isValid ? 'yeti-input__error' : null, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": describedBy }, ((this.inputMaxlength != 0) ? { "input-maxlength": this.inputMaxlength } : {})))
            :
                h("slot", { name: "element" }), (this.tip != "") ?
            h("span", { class: tipClass, "aria-live": "polite", id: this.tipId }, this.tip)
            :
                "", (this.errorMessage != "" && !this.isValid) ?
            h("span", { class: "yeti-form-field-error", "aria-live": "polite", id: this.errorId }, this.errorMessage)
            :
                ""));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "label": ["validateLabel"],
        "isValid": ["updateSlottedContentForErrorState"]
    }; }
};

export { YetiField as yeti_field };

//# sourceMappingURL=yeti-field.entry.js.map