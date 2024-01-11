import { r as registerInstance, h, g as getElement } from './index-aa7ae84e.js';
import { u as utils } from './utils-4523b86b.js';

const YetiTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wrapperCSS = '';
        this.textTitle = "Mmmm Toast!";
        this.slotId = "";
        this.notificationId = "";
        this.iLoveJSX = false;
        this.isClickedOpen = false;
    }
    handleDeFocusingClick() {
        this.isClickedOpen = false;
    }
    handleCloseClick(e) {
        this.isClickedOpen = false;
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
        let wrapperCSS = 'yeti-notification-wrapper-error';
        return ([
            h("div", { class: wrapperCSS }, h("div", { class: "yeti-notification-container" }, h("div", { class: "yeti-flex" }, h("yeti-icon", { iconCode: "error", iconCSS: 'yeti-color-red yeti-typo-size-5 yeti-margin-right-2' })), h("div", { class: "yeti-notification-content-wrapper" }, h("div", { class: "yeti-notification-content-title", id: this.notificationId }, this.textTitle), h("div", { class: "yeti-notification-content", id: this.notificationId }, h("slot", null))), h("button", { class: "yeti-notification-close", onClick: (e) => { this.handleCloseClick(e); } }, h("yeti-icon", { iconCode: "close", iconCSS: 'yeti-color-white yeti-typo-size-4' }))))
        ]);
    }
    componentDidRender() {
        let slot = this.el.querySelector(".yeti-notification-trigger").firstElementChild;
        slot.setAttribute("tabindex", "0");
        slot.setAttribute("aria-describedby", this.notificationId);
    }
    get el() { return getElement(this); }
};

export { YetiTooltip as yeti_notification };

//# sourceMappingURL=yeti-notification.entry.js.map