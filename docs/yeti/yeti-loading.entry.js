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
        let baseLoading = h("div", { key: '1e07487bb74484c3e7f3e614bcbae0ee65c59cf5', class: "yeti-loading", tabindex: "-1" }, h("div", { key: '4293b5079ff23db0bdad1b8b6cd33fbb7bc827b0', class: "yeti-loading-icon" }, h("svg", { key: '75cdd6fd51ac535466396e63468965425469aa70', class: "yeti-loading-icon-svg", viewBox: "0 0 100 100", "aria-hidden": "true" }, h("circle", { key: '99faa157f1e9849a2e0c2504a1595989c4380a51', class: "yeti-loading-icon-svg-circle", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: 'a2d4cbcd99ed9f57d42e925f0799c0a1bef2681f', class: "yeti-loading-label" }, "Loading..."), (this.slottedContent == null && this.slottedContent != "<!---->") ?
            ""
            :
                h("div", { class: "yeti-loading-content" }, h("slot", null)));
        let inlineLoading = h("div", { key: '19506db1200b74663e237748a917e42956625ae9', class: "yeti-loading_inline" }, h("div", { key: '96117e0f60f24118e7c7cbb0c8f3075b55751e04', class: "yeti-loading_inline-icon" }, h("svg", { key: '27dbb35e33059ca54e110aea0bbca0956b15e34f', class: "yeti-loading_inline-icon-svg", viewBox: "0 0 100 100" }, h("circle", { key: 'fbc1c4ed5846f937b2a654ca1f75552283433e18', class: "yeti-loading_inline-icon-svg-background", cx: "50%", cy: "50%", r: "44" }), h("circle", { key: '8ff43b9ff601275c7e71c0f2f5f32ce84ce6eaae', class: "yeti-loading_inline-icon-svg-stroke", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: '76f264f94bad55b52bf6390cd46fedd07708a989', class: "yeti-loading_inline-label" }, "Loading..."));
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