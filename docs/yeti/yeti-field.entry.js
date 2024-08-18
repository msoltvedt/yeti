import { r as registerInstance, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiField = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tipId = utils.generateUniqueId();
        this.errorId = utils.generateUniqueId();
        this.hasSlottedField = false;
        this.hasSlottedRequired = false;
        this.hasSlottedLabel = false;
        this.inputId = utils.generateUniqueId();
        this.inputName = this.inputId;
        this.type = "text";
        this.inputMaxlength = 0;
        this.label = "";
        this.tip = "";
        this.tipPosition = "below";
        this.required = false;
        this.indicateRequired = false;
        this.errorMessage = 'Error: please correct this field.';
        this.isValid = true;
        this.defaultValue = '';
        this.autovalidate = true;
        this.isInline = false;
        this.wrapperClass = "";
        this.inputClass = "";
        this.inputWrapperClass = "";
        this.isDirty = false;
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
        let potentiallySlottedLabel = this.el.querySelector('[slot="label"]');
        let describedBy = (this.tip != "") ? `${this.tipId} ` : ``;
        describedBy += (this.errorMessage != "" && !this.isValid) ? `${this.errorId}` : ``;
        // Handle Required
        if (potentiallySlottedRequired) {
            this.hasSlottedRequired = true;
        }
        // Handle label
        if (potentiallySlottedLabel) {
            this.hasSlottedLabel = true;
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
    renderRequiredIndicator() {
        if (!this.required) {
            return null;
        }
        if (this.required && this.indicateRequired) {
            // Use the slotted required content if it exists
            if (this.hasSlottedRequired) {
                return h("slot", { name: "required" });
            }
            // Otherwise use the Yeti Required Symbol
            else {
                return h("span", { class: "yeti-form-label-required-wrapper" }, h("yeti-required-symbol", null));
            }
        }
    }
    render() {
        let cssClass = "yeti-form-field";
        cssClass += (this.wrapperClass != "") ? ` ${this.wrapperClass}` : '';
        let tipClass = `yeti-form-tip`;
        tipClass += (this.tipPosition == "above") ? ` yeti-form-tip-above` : ``;
        let describedBy = (this.tip != "") ? `${this.tipId} ` : ``;
        describedBy += (this.errorMessage != "" && !this.isValid) ? `${this.errorId}` : ``;
        if (this.isInline) {
            cssClass += " yeti-form-field-inline";
        }
        return (h("div", { key: '8037954addce9453d0f16039d562d176f5ca7338', class: cssClass }, h("label", { key: 'cc33a6c55243ae85dee2a41f5a52a91b155866b6', htmlFor: this.inputId, class: "yeti-form-label" }, (this.hasSlottedLabel) ? h("slot", { name: "label" }) : `${this.label}`, (this.required && this.hasSlottedRequired) ? h("slot", { name: "required" }) : null), (!this.hasSlottedField) ?
            (this.type == "date") ?
                h("yeti-date-picker", { "input-id": this.inputId, "input-name": this.inputName, value: this.defaultValue, required: this.required, "is-valid": this.isValid, "described-by": describedBy })
                :
                    h("yeti-input", Object.assign({ inputId: this.inputId,
                        // input-class={!this.isValid ? 'yeti-input__error' : null}
                        value: this.defaultValue, required: this.required, isValid: this.isValid, describedBy: describedBy }, ((this.inputClass != "") ? { "input-class": this.inputClass } : {}), ((this.inputWrapperClass != "") ? { "wrapper-class": this.inputWrapperClass } : {}), ((this.inputMaxlength != 0) ? { "input-maxlength": this.inputMaxlength } : {})))
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
        "isValid": ["updateSlottedContentForErrorState"]
    }; }
};

export { YetiField as yeti_field };

//# sourceMappingURL=yeti-field.entry.js.map