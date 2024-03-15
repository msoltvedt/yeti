import { r as registerInstance, a as createEvent, h, g as getElement } from './index-2baeb834.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.notificationActionClick = createEvent(this, "notificationActionClick", 7);
        this.wrapperCSS = '';
        this.notificationType = "";
        this.isLowContrast = false;
        this.showCloseButton = true;
        this.iconCode = "";
        this.iconAltText = "";
        this.textTitle = "Mmmm Toast!";
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
        let wrapperCSS = 'yeti-notification';
        wrapperCSS += (this.wrapperCSS !== '') ? ` ${this.wrapperCSS}` : ``;
        // Set type-based CSS class
        switch (this.notificationType) {
            case "error":
                wrapperCSS += ' yeti-notification-error';
                altText = (altText != '') ? altText : 'Error';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
            case "info":
                wrapperCSS += ' yeti-notification-info';
                altText = (altText != '') ? altText : 'Information';
                iconCode = (iconCode != '') ? iconCode : 'info';
                break;
            case "success":
                wrapperCSS += ' yeti-notification-success';
                altText = (altText != '') ? altText : 'Success';
                iconCode = (iconCode != '') ? iconCode : 'check_circle';
                break;
            case "warning":
                wrapperCSS += ' yeti-notification-warning';
                altText = (altText != '') ? altText : 'Warning';
                iconCode = (iconCode != '') ? iconCode : 'error';
                break;
            case "warningAlt":
                wrapperCSS += ' yeti-notification-warning_alt';
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
        wrapperCSS += (this.isLowContrast) ? ' yeti-notification-low_contrast' : '';
        // Set visibility
        wrapperCSS += (this.isVisible) ? '' : ' yeti-notification__hidden';
        return (h("div", { key: 'd2f679bcd6cf56d30c4d8e1a9ba6c75d2a77ff76', class: wrapperCSS, id: this.notificationId, role: "status" }, h("div", { key: '0ea7d46eb182d595599140ff7833e37d210e6ccd', class: "yeti-notification-icon" }, h("span", { key: '282154c835180c350fe5aec54246643ace434d11', class: "material-icons", "aria-hidden": "true" }, iconCode), h("span", { key: '266d13834ef6b8efb83300e637b400d200778ab4', class: "yeti-a11y-hidden" }, altText)), h("div", { key: 'c594cc95a7ec79e9ecb7fe4aa8ef1a1ad6118c07', class: "yeti-notification-content" }, (this.textTitle != "") ?
            h("div", { class: "yeti-notification-content-title" }, this.textTitle)
            :
                '', h("div", { key: '0dd03e06439d175b14c59f7cc053080eeeaab051', class: "yeti-notification-content-subtitle" }, h("slot", { key: '1ee84ce9bcdfbbeec71848fc40632402c1e92be2' }))), (this.actionLabel != "") ?
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