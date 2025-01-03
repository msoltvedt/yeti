import { r as registerInstance, a as createEvent, h, g as getElement } from './index-81029423.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.toastActionClick = createEvent(this, "toastActionClick", 7);
        this.wrapperClass = '';
        this.toastType = "";
        this.isLowContrast = false;
        this.showCloseButton = true;
        this.iconCode = "";
        this.iconAltText = "";
        this.textTitle = "Mmmm Toast!";
        this.size = "";
        this.actionLabel = "";
        this.slotId = "";
        this.toastId = "";
        this.closesSelfAfter = 0;
        this.iLoveJSX = false;
        this.isVisible = true;
    }
    handleCloseClick(e) {
        this.isVisible = false;
        e.stopImmediatePropagation();
        e.preventDefault();
    }
    handleActionClick(e) {
        this.toastActionClick.emit();
        e.stopImmediatePropagation();
        e.preventDefault();
    }
    componentWillLoad() {
        // Set up ids
        let componentId = this.el.getAttribute("id");
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        this.toastId = (this.toastId != "") ? this.toastId : `${componentId}_tip`;
        this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
        if (this.closesSelfAfter > 0) {
            setTimeout(() => {
                this.isVisible = false;
            }, this.closesSelfAfter);
        }
    }
    render() {
        let altText = this.iconAltText;
        let iconCode = this.iconCode;
        let wrapperClass = 'yeti-toast';
        wrapperClass += (this.size == 'full') ? ' yeti-toast_full' : '';
        wrapperClass += (this.wrapperClass !== '') ? ` ${this.wrapperClass}` : ``;
        // Set type-based CSS class
        switch (this.toastType) {
            case "error":
                wrapperClass += ' yeti-toast-error';
                altText = (altText != '') ? altText : 'Error';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
            case "info":
                wrapperClass += ' yeti-toast-info';
                altText = (altText != '') ? altText : 'Information';
                iconCode = (iconCode != '') ? iconCode : 'info';
                break;
            case "success":
                wrapperClass += ' yeti-toast-success';
                altText = (altText != '') ? altText : 'Success';
                iconCode = (iconCode != '') ? iconCode : 'check_circle';
                break;
            case "warning":
                wrapperClass += ' yeti-toast-warning';
                altText = (altText != '') ? altText : 'Warning';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
            case "warningAlt":
                wrapperClass += ' yeti-toast-warning_alt';
                altText = (altText != '') ? altText : 'Warning';
                iconCode = (iconCode != '') ? iconCode : 'warning';
                break;
            case "":
            default:
                altText = (altText != '') ? altText : 'Error';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
        }
        // Set low-contrast mode
        wrapperClass += (this.isLowContrast) ? ' yeti-toast-low_contrast' : '';
        // Set visibility
        wrapperClass += (this.isVisible) ? '' : ' yeti-toast__hidden';
        return (h("div", { key: 'a61c2b460e9932145116547aec9a47b0d913974e', class: wrapperClass, id: this.toastId, role: "status" }, h("div", { key: '5125fcdbf434e9912bfe6c5d7ae467a0b98d82ef', class: "yeti-toast-icon" }, h("span", { key: '3812cbe74dbb03e03ffac371d754cf052951c1fd', class: "material-icons", "aria-hidden": "true" }, iconCode), h("span", { key: '8797218066c6e9a2b6df225685b62661a785e56b', class: "yeti-a11y-hidden" }, altText)), h("div", { key: '819c58f6caa7bb43c5b2b2a3eae80bacd4634782', class: "yeti-toast-content" }, (this.textTitle != "") ?
            h("div", { class: "yeti-toast-content-title" }, this.textTitle)
            :
                '', h("div", { key: '124e522b5dbe90bf6c1751cb71941a617ee977fc', class: "yeti-toast-content-subtitle" }, h("slot", { key: '4a76f55ce6a8acb27b02c0f1bb57e537f8d4addc' }))), (this.actionLabel != "") ?
            h("button", { class: "yeti-toast-action", onClick: (e) => this.handleActionClick(e) }, this.actionLabel)
            :
                "", (this.showCloseButton) ?
            h("button", { class: "yeti-toast-close", onClick: (e) => this.handleCloseClick(e) }, h("span", { class: "material-icons" }, "close"))
            :
                ""));
    }
    get el() { return getElement(this); }
};

export { YetiToast as yeti_toast };

//# sourceMappingURL=yeti-toast.entry.js.map