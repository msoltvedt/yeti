import { r as registerInstance, h, g as getElement } from './index-e3c92518.js';
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
        let baseLoading = h("div", { key: '6257af25ecc0d6b94aee73d70cdbba8163293b5a', class: "yeti-loading", tabindex: "-1" }, h("div", { key: 'f569d3e3a425bba6a6af1a1fed44085fbf8f2e52', class: "yeti-loading-icon" }, h("svg", { key: '4299930e7697a570356883bbc5bd6e1a8dc06f13', class: "yeti-loading-icon-svg", viewBox: "0 0 100 100", "aria-hidden": "true" }, h("circle", { key: '7e535c10cdcfffe19d6bec92d9feadbdf830de5d', class: "yeti-loading-icon-svg-circle", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: '996f957d00e95830b56eacc8c43e6a6184c7fe8c', class: "yeti-loading-label" }, "Loading..."), (this.slottedContent == null && this.slottedContent != "<!---->") ?
            ""
            :
                h("div", { class: "yeti-loading-content" }, h("slot", null)));
        let inlineLoading = h("div", { key: 'b23aaad44ec9a4e32d3c111ba3eb062c8fe28595', class: "yeti-loading_inline" }, h("div", { key: '7ebf18120a90d686b703b9e9a7598c5e23d4709d', class: "yeti-loading_inline-icon" }, h("svg", { key: 'c029ab42b23e696e9ae9ba2cb02c4ba08b283ecc', class: "yeti-loading_inline-icon-svg", viewBox: "0 0 100 100" }, h("circle", { key: 'a8515e4cdabe40ea3da8d2c4c55081cd99c2479b', class: "yeti-loading_inline-icon-svg-background", cx: "50%", cy: "50%", r: "44" }), h("circle", { key: 'c6f4256aeeea148e71d1f3ae1762cf42a5917ac0', class: "yeti-loading_inline-icon-svg-stroke", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: '2b26a7e1d90538201a3b433e330d27d6df95fbdf', class: "yeti-loading_inline-label" }, "Loading..."));
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