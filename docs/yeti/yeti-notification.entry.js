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
        return (h("div", { key: '8cc741019792617d3d7abd0d348874fa35c18774', class: wrapperClass, id: this.notificationId, role: "status" }, h("div", { key: 'd05059c6457ca1324b3e2aacfdcbbea493ce5c02', class: "yeti-notification-icon" }, h("span", { key: 'f5a886f09ad150978fc9ccec4f58975619a1b048', class: "material-icons", "aria-hidden": "true" }, iconCode), h("span", { key: 'a9c9e65db0a28e9f20844cff92285eb9f74c4d24', class: "yeti-a11y-hidden" }, altText)), h("div", { key: 'deb524d38bcc2dc65705777fd00509c0c1a11010', class: "yeti-notification-content" }, (this.textTitle != "") ?
            h("div", { class: "yeti-notification-content-title" }, this.textTitle)
            :
                '', h("div", { key: 'af63c428b3779257525e92274b8db8b544ed2248', class: "yeti-notification-content-subtitle" }, h("slot", { key: '049fe497dfa35c22b109d752b9ff65861160ee0b' }))), (this.actionLabel != "") ?
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