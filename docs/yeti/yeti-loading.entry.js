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
        let baseLoading = h("div", { key: '0a0f66bc16a69da76617d6200bbb4b22b3e5356c', class: "yeti-loading", tabindex: "-1" }, h("div", { key: '2740a87e184e859d3fdac34387e6bcfd44cff5e6', class: "yeti-loading-icon" }, h("svg", { key: '1c86557785e10598e5f4302f4919e65a26595856', class: "yeti-loading-icon-svg", viewBox: "0 0 100 100", "aria-hidden": "true" }, h("circle", { key: 'ec36565c5dafe7eb84b5e183c063122a8098698c', class: "yeti-loading-icon-svg-circle", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: '373de8e71a45aa1edccc711df14f96f375526455', class: "yeti-loading-label" }, "Loading..."), (this.slottedContent == null && this.slottedContent != "<!---->") ?
            ""
            :
                h("div", { class: "yeti-loading-content" }, h("slot", null)));
        let inlineLoading = h("div", { key: '4747195e789a6a4b5204991fc71aab342e2f7e82', class: "yeti-loading_inline" }, h("div", { key: 'bddd49f55db259cf0f82d55068e08e0fd5e1f3db', class: "yeti-loading_inline-icon" }, h("svg", { key: '99cb19ea40b3adc4c76d084f2903e05b5aced96b', class: "yeti-loading_inline-icon-svg", viewBox: "0 0 100 100" }, h("circle", { key: '74b941046b29016847ad3acd4c6996981dad8781', class: "yeti-loading_inline-icon-svg-background", cx: "50%", cy: "50%", r: "44" }), h("circle", { key: '927da2ab6f51e239fc8fcf51aa5db5e61f9592bd', class: "yeti-loading_inline-icon-svg-stroke", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: 'd93867bf412b3dd052da7280020c3d4735c2c7ff', class: "yeti-loading_inline-label" }, "Loading..."));
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