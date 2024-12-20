import { r as registerInstance, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiLoading = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.previouslyFocusedElement = null; // So we can return focus to wherever the user was when the Loading component appeared.
        this.shouldStealFocus = false;
        this.shouldReturnFocus = false;
        this.slottedContent = null;
        this.isInline = false;
        this.isModal = false;
        this.isActive = false;
    }
    handleFocus(newValue) {
        // When the Loading becomes active it should take focus away from whatever had it before, but
        // we want to keep track of what that was so we can return focus if Loading becomes inactive.
        // Becoming active, take focus
        if (newValue) {
            this.shouldStealFocus = true;
            this.setBackgroundElementStyles(true);
        }
        // Becoming inactive, return focus
        else {
            this.shouldReturnFocus = true;
            this.setBackgroundElementStyles(false);
        }
    }
    setBackgroundElementStyles(modalIsActivating) {
        if (modalIsActivating) {
            document.body.classList.add("yeti-modal-has_active_modal");
        }
        else {
            document.body.classList.remove("yeti-modal-has_active_modal");
        }
    }
    focusTrap(e) {
        if (this.isActive) {
            e.preventDefault();
        }
    }
    componentWillLoad() {
        // Set up ids
        let componentId = this.el.getAttribute("id");
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        // Check to see if there's slotted content
        let innerHTML = this.el.innerHTML.trim();
        if (innerHTML != "" && innerHTML != "<!---->") {
            this.slottedContent = innerHTML;
        }
        else {
            this.slottedContent = null;
        }
    }
    render() {
        let modalOverlayCSS = "yeti-modal-overlay yeti-modal-overlay-light";
        let baseLoading = h("div", { key: 'efa404af8784bded57bd78c047cfae6e7dcdea30', class: "yeti-loading", tabindex: "-1" }, h("div", { key: '66ddbe9d754254d3b3ae271924cb944ffadcfe7a', class: "yeti-loading-icon" }, h("svg", { key: 'f05205b4254aa6404aab40c6d173904055e43f71', class: "yeti-loading-icon-svg", viewBox: "0 0 100 100", "aria-hidden": "true" }, h("circle", { key: 'a4ddb96c47320fcd88fa20c67bcfceb1e04b264d', class: "yeti-loading-icon-svg-circle", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: 'd9628da3a95d4e40efb5e395d1c7e3302e58276c', class: "yeti-loading-label" }, "Loading..."), (this.slottedContent == null && this.slottedContent != "<!---->") ?
            ""
            :
                h("div", { class: "yeti-loading-content" }, h("slot", null)));
        let inlineLoading = h("div", { key: '7c06c947346b1d7d7eb6f5cae103d47c1c8c2e4b', class: "yeti-loading_inline" }, h("div", { key: '6aa13f75c279636ffba96d7a20af945730be9a4c', class: "yeti-loading_inline-icon" }, h("svg", { key: '28d1a716f2ec6b2933c0f5a696b9811ba035173f', class: "yeti-loading_inline-icon-svg", viewBox: "0 0 100 100" }, h("circle", { key: '334fd3a9e06b96f547490ff745c92b24ee58e42a', class: "yeti-loading_inline-icon-svg-background", cx: "50%", cy: "50%", r: "44" }), h("circle", { key: 'd52a63ea291681bb3786b786d50e4be56d9d953b', class: "yeti-loading_inline-icon-svg-stroke", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: 'b0ed8856978a2bd7533a721b528f3b333adbd7f4', class: "yeti-loading_inline-label" }, "Loading..."));
        modalOverlayCSS += (this.isActive) ? "" : " yeti-modal-overlay__inert";
        return ((this.isModal) ?
            h("div", { class: modalOverlayCSS }, h("div", { class: "yeti-modal yeti-modal-size-xs" }, baseLoading))
            :
                (this.isInline) ? inlineLoading : baseLoading);
    }
    componentDidRender() {
        // Handle focus management. We can't do this when the property changes because the inactive state uses display: none,
        // which interferes with the ability to accept focus depending on some race conditions.
        if (this.shouldStealFocus) {
            // Becoming active, take focus
            let loadingDiv = this.el.getElementsByClassName("yeti-loading")[0];
            this.previouslyFocusedElement = document.activeElement;
            loadingDiv.focus();
        }
        if (this.shouldReturnFocus) {
            // Becoming inactive, return focus
            if (this.previouslyFocusedElement) {
                this.previouslyFocusedElement.focus();
            }
        }
        this.shouldStealFocus = false;
        this.shouldReturnFocus = false;
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "isActive": ["handleFocus"]
    }; }
};

export { YetiLoading as yeti_loading };

//# sourceMappingURL=yeti-loading.entry.js.map