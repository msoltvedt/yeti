import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
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
        return (h("div", { key: 'c632575527e0d8e1ac2b1f822375d38eb8b36429', class: wrapperClass, id: this.notificationId, role: "status" }, h("div", { key: 'ea419916698b808c18d46f1b9c2b22845205378f', class: "yeti-notification-icon" }, h("span", { key: 'b580eff5c7f0df0a411eb1281db06a353ed9263d', class: "material-icons", "aria-hidden": "true" }, iconCode), h("span", { key: '2f602534fc7abcc216c30fe662c543d82e9ad766', class: "yeti-a11y-hidden" }, altText)), h("div", { key: 'f552f3754eaef86c97003a5c9c01ba19fe794fb3', class: "yeti-notification-content" }, (this.textTitle != "") ?
            h("div", { class: "yeti-notification-content-title" }, this.textTitle)
            :
                '', h("div", { key: 'fa795227c62fda13fc4887656ae9133e61b29fa0', class: "yeti-notification-content-subtitle" }, h("slot", { key: 'c56e9b28d063c1d77afd2d1cc0a104b4b36a247f' }))), (this.actionLabel != "") ?
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