import { r as registerInstance, a as createEvent, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.notificationActionClick = createEvent(this, "notificationActionClick", 7);
        this.wrapperClass = '';
        this.notificationType = "";
        this.isLowContrast = false;
        this.showCloseButton = true;
        this.iconCode = "";
        this.iconAltText = "";
        this.textTitle = "Mmmm Toast!";
        this.size = "";
        this.actionLabel = "";
        this.slotId = "";
        this.notificationId = "";
        this.iLoveJSX = false;
        this.isVisible = true;
    }
    handleCloseClick(e) {
        this.isVisible = false;
        e.stopImmediatePropagation();
        e.preventDefault();
    }
    handleActionClick(e) {
        this.notificationActionClick.emit();
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
        this.notificationId = (this.notificationId != "") ? this.notificationId : `${componentId}_tip`;
        this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
    }
    render() {
        let altText = this.iconAltText;
        let iconCode = this.iconCode;
        let wrapperClass = 'yeti-notification';
        wrapperClass += (this.size == 'full') ? ' yeti-notification_full' : '';
        wrapperClass += (this.wrapperClass !== '') ? ` ${this.wrapperClass}` : ``;
        // Set type-based CSS class
        switch (this.notificationType) {
            case "error":
                wrapperClass += ' yeti-notification-error';
                altText = (altText != '') ? altText : 'Error';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
            case "info":
                wrapperClass += ' yeti-notification-info';
                altText = (altText != '') ? altText : 'Information';
                iconCode = (iconCode != '') ? iconCode : 'info';
                break;
            case "success":
                wrapperClass += ' yeti-notification-success';
                altText = (altText != '') ? altText : 'Success';
                iconCode = (iconCode != '') ? iconCode : 'check_circle';
                break;
            case "warning":
                wrapperClass += ' yeti-notification-warning';
                altText = (altText != '') ? altText : 'Warning';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
            case "warningAlt":
                wrapperClass += ' yeti-notification-warning_alt';
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
        wrapperClass += (this.isLowContrast) ? ' yeti-notification-low_contrast' : '';
        // Set visibility
        wrapperClass += (this.isVisible) ? '' : ' yeti-notification__hidden';
        return (h("div", { key: '719da8c0a2b5684aef5700ce60e3d95654cb0723', class: wrapperClass, id: this.notificationId, role: "status" }, h("div", { key: '190a6bf38fd3bd6695803847b44b661bdfe800ee', class: "yeti-notification-icon" }, h("span", { key: '52c4f11ec07070db6be17c0d7ab072f0b5c6dec1', class: "material-icons", "aria-hidden": "true" }, iconCode), h("span", { key: 'a0f163cfd1cb5e97044ffe0c96192aaf3094170f', class: "yeti-a11y-hidden" }, altText)), h("div", { key: '13cc7add73646f1edb2a4c47f405b0b593cb3ff0', class: "yeti-notification-content" }, (this.textTitle != "") ?
            h("div", { class: "yeti-notification-content-title" }, this.textTitle)
            :
                '', h("div", { key: '08e1a9495fe6056bc87ccf131f741133b09b1448', class: "yeti-notification-content-subtitle" }, h("slot", { key: '17bbe99a255f666d6b9b6c15b3961b7872975c11' }))), (this.actionLabel != "") ?
            h("button", { class: "yeti-notification-action", onClick: (e) => this.handleActionClick(e) }, this.actionLabel)
            :
                "", (this.showCloseButton) ?
            h("button", { class: "yeti-notification-close", onClick: (e) => this.handleCloseClick(e) }, h("span", { class: "material-icons" }, "close"))
            :
                ""));
    }
    get el() { return getElement(this); }
};

export { YetiTooltip as yeti_notification };

//# sourceMappingURL=yeti-notification.entry.js.map