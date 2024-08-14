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
        let baseLoading = h("div", { key: '651eae6133d41af8b689e673742b59913e6c75d5', class: "yeti-loading", tabindex: "-1" }, h("div", { key: 'd4c79dd446626532d67cafefa24a6abcd0d826ef', class: "yeti-loading-icon" }, h("svg", { key: '12954037dd9b39623018320b1298700201634f51', class: "yeti-loading-icon-svg", viewBox: "0 0 100 100", "aria-hidden": "true" }, h("circle", { key: 'f0c326749129949db1ac68a08272d62a0a65cb34', class: "yeti-loading-icon-svg-circle", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: '818059691d389b9daa64cd1e0fdaf3268822cfef', class: "yeti-loading-label" }, "Loading..."), (this.slottedContent == null && this.slottedContent != "<!---->") ?
            ""
            :
                h("div", { class: "yeti-loading-content" }, h("slot", null)));
        let inlineLoading = h("div", { key: 'db43f994e2663dd86f37a13bf11eaa1f57c56ec4', class: "yeti-loading_inline" }, h("div", { key: '619256b1d440267b53504a20c2ffc34028df8b48', class: "yeti-loading_inline-icon" }, h("svg", { key: '9cd64958fae2bca4b7a1a5a8afe6f29b22e1459a', class: "yeti-loading_inline-icon-svg", viewBox: "0 0 100 100" }, h("circle", { key: '9307ec07877b48c24cc35c10a3abc3ee17c9f4bd', class: "yeti-loading_inline-icon-svg-background", cx: "50%", cy: "50%", r: "44" }), h("circle", { key: '3eb0ef3d98890b0498057742b86c3b5cf18441ab', class: "yeti-loading_inline-icon-svg-stroke", cx: "50%", cy: "50%", r: "44" }))), h("div", { key: 'b2b6b4b2b7aa0af1fff55a9e3e1a9616bfbc7549', class: "yeti-loading_inline-label" }, "Loading..."));
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