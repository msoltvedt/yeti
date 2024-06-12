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
        return (h("div", { key: '1eb8f98ab36817ffeae59914f68e70d70022d82a', class: wrapperClass, id: this.notificationId, role: "status" }, h("div", { key: '97afefcf00eb5e0f0ad9dee1b640125705f48642', class: "yeti-notification-icon" }, h("span", { key: '72cbcd3bdd2c949679ad82bb1ad706c2440c574e', class: "material-icons", "aria-hidden": "true" }, iconCode), h("span", { key: '9373161c4a9fbeb7bbc27c79ece455f0f8f456da', class: "yeti-a11y-hidden" }, altText)), h("div", { key: '97257fdbfdb9a084bda0bd2209c462b674154669', class: "yeti-notification-content" }, (this.textTitle != "") ?
            h("div", { class: "yeti-notification-content-title" }, this.textTitle)
            :
                '', h("div", { key: '1e0e3cf712f1bd5edaa4bd97a49efe67716b42fe', class: "yeti-notification-content-subtitle" }, h("slot", { key: '845b971550900aac10e4fa536c91ef63c2f6d1e8' }))), (this.actionLabel != "") ?
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