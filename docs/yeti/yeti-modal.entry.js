import { r as registerInstance, h, g as getElement } from './index-2baeb834.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.previouslyFocusedElement = null; // So we can return focus to wherever the user was when the Loading component appeared.
        this.bodyInnerWrapper = null; // A div wrapped around everything in the body except the modal. Used to prevent background scrolling.
        this.shouldStealFocus = false;
        this.shouldReturnFocus = false;
        this.hasOpened = false;
        this.headingId = utils.generateUniqueId();
        this.isSideSheet = false;
        this.heading = "Modal Heading";
        this.describedBy = "";
        this.size = "";
        this.modalCSS = "";
        this.isScrollable = true;
        this.isActive = false;
        this.showClose = true;
        this.isAnimating = false;
        this.isOpening = false;
        this.isClosing = false;
    }
    handleFocus(newValue) {
        // When the Modal becomes active it should take focus away from whatever had it before, but
        // we want to keep track of what that was so we can return focus if Modal becomes inactive.
        // First, normal Modals have only two states: active and inactive (i.e. they don't use the isOpening and isClosing states)
        if (!this.isSideSheet) {
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
            // Side Sheet modals have four states: inactive, opening, active, and closing.
        }
        else {
            // It's a side sheet modal
            if (newValue) {
                // Side sheet modal becoming active
                this.setBackgroundElementStyles(true);
                this.isAnimating = true;
            }
            else {
                this.isAnimating = true;
            }
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
        if (this.isActive && e.keyCode == 27 && this.showClose) { // Escape button
            this.isActive = false;
        }
    }
    handleTransitionEnd(e) {
        if (!e.propertyName || e.propertyName != "transform") {
            return;
        }
        if (this.isOpening) {
            // Becoming active, take focus
            this.previouslyFocusedElement = document.activeElement;
            this.handleInitialFocus();
            this.isOpening = false;
            this.hasOpened = true;
        }
        else if (this.isClosing) {
            this.setBackgroundElementStyles(false);
            if (this.previouslyFocusedElement) {
                this.previouslyFocusedElement.focus();
            }
            this.isClosing = false;
        }
        this.isAnimating = false;
    }
    handleInitialFocus() {
        // Sets focus on the correct thing within the modal's content when it first opens. If nothing is focusable, uses the content area itself.
        let contentArea = this.el.querySelector('.yeti-modal-content');
        let firstFocusableContentItem = utils.aria.focusFirstDescendant(contentArea); // either false or an HTMLElement
        if (!firstFocusableContentItem) {
            // There is nothing focusable within the content of the modal, so make the content area itself focusable.
            contentArea.setAttribute("tabIndex", "-1");
            contentArea.focus();
        }
    }
    componentWillLoad() {
        // Set up ids and handle slotted content
        let componentId = this.el.getAttribute("id");
        let content = this.el.querySelector("yeti-modal-content");
        let buttons = this.el.querySelector("yeti-modal-buttons");
        let headerAction = this.el.querySelector("yeti-modal-header-action");
        if (!content) {
            console.error("Yeti Modal components must have a yeti-modal-content element.");
        }
        else {
            content.setAttribute("slot", "content");
        }
        if (!buttons) {
            console.error("Yeti Modal components must have a yeti-modal-buttons element.");
        }
        else {
            buttons.setAttribute("slot", "buttons");
        }
        if (headerAction) {
            headerAction.setAttribute("slot", "header_action");
        }
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        if (this.isActive) {
            this.setBackgroundElementStyles(true);
        }
    }
    render() {
        let modalOverlayCSS = (this.isSideSheet) ? "yeti-modal_ss-overlay" : "yeti-modal-overlay";
        let modalCSS = `yeti-modal${(this.isSideSheet) ? " yeti-modal_ss" : ""}`;
        let modalProperties = {
            "role": "dialog",
            "aria-modal": "true",
            "aria-labelledby": this.headingId
        };
        if (this.describedBy != "") {
            modalProperties["aria-describedby"] = this.describedBy;
        }
        modalOverlayCSS += (this.isActive || this.isAnimating) ? "" : " yeti-modal-overlay__inert";
        modalOverlayCSS += (this.isOpening) ? " yeti-modal__opening" : "";
        modalOverlayCSS += (this.hasOpened) ? " yeti-modal__open" : "";
        modalOverlayCSS += (this.isClosing) ? " yeti-modal__closing" : "";
        modalCSS += (this.size == "") ? "" : ` yeti-modal-size-${this.size}`;
        modalCSS += (this.modalCSS != "") ? ` ${this.modalCSS}` : "";
        modalCSS += (this.isScrollable) ? "" : " yeti-modal__unscrollable";
        return (h("div", { key: '28ae0d4aed768d4bd600df7b04ac5ed97e4c13e5', class: modalOverlayCSS }, h("div", { key: 'cc36adfd27ec9110ee249ce23c8068ea6abece36', class: "yeti-modal-bumper-front", tabIndex: 0 }), h("div", Object.assign({ key: 'dde07ce78e99201dfbe744b595372793885d14fc', class: modalCSS }, modalProperties), h("div", { key: '6ca9b02924af5dfe954c8f902ec51052be6774a4', class: "yeti-modal-header" }, h("h1", { key: '4870c42b577d9dff66bff1d3f8254a82a487df8c', class: "yeti-modal-header-heading", id: this.headingId }, this.heading), h("div", { key: '83b22dca6e95a4d2d4ba77ba8b3f595e15158c41', class: "yeti-modal-header-action" }, h("slot", { key: 'c553bc96312081fbeb405a794c5ebcbec200f52a', name: "header_action" })), (this.showClose) ?
            h("button", { class: "yeti-modal-header-close yeti-button-ghost", onClick: () => { this.isActive = false; } }, h("span", { class: "material-icons" }, "close"))
            :
                null), h("div", { key: '1b455aa5498c8144b3605b9bcc7de0f8e21a1c2d', class: "yeti-modal-content" }, h("slot", { key: 'c9543a264a1d95843238ec4840e40babbe7e2cf7', name: "content" }), h("div", { key: '72f125c4658dfde62fbd7f7d05de12f74fc80acd', class: "yeti-modal-content-fade" })), h("div", { key: '5d46bd1604199c28908e1b804e5e1e161371bf38', class: "yeti-modal-actions" }, h("div", { key: '2fa5712188e7fd4cd3948062dac720ed0b9f34e4', class: "yeti-modal-actions-buttons" }, h("slot", { key: '4293cf75acf18b74c4ccfb0a585e8c97c8d35ee6', name: "buttons" })))), h("div", { key: 'aa66a959ab8b3c3e87a5d66b7d2af53064788727', class: "yeti-modal-bumper-back", tabIndex: 0 })));
    }
    componentDidRender() {
        // Handle focus management. We can't do this when the property changes because the inactive state uses display: none,
        // which interferes with the ability to accept focus depending on some race conditions.
        // For regular modals...
        if (this.shouldStealFocus) {
            // Becoming active, take focus
            this.previouslyFocusedElement = document.activeElement;
            this.handleInitialFocus();
        }
        if (this.shouldReturnFocus) {
            // Becoming inactive, return focus
            if (this.previouslyFocusedElement) {
                this.previouslyFocusedElement.focus();
            }
        }
        // For side sheet modals
        if (this.isAnimating) {
            // It's a side sheet modal, and it's opening. Add the opening class to the overlay to initiate the CSS transition.
            if (this.isActive) {
                setTimeout(() => {
                    this.isOpening = true;
                    this.isClosing = false;
                }, 1);
            }
            else {
                setTimeout(() => {
                    this.isOpening = false;
                    this.hasOpened = false;
                    this.isClosing = true;
                }, 1);
            }
        }
        this.shouldStealFocus = false;
        this.shouldReturnFocus = false;
    }
    componentDidLoad() {
        let frontBumper = this.el.querySelector(".yeti-modal-bumper-front");
        let backBumper = this.el.querySelector(".yeti-modal-bumper-back");
        frontBumper.addEventListener("focus", () => {
            utils.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"));
        });
        backBumper.addEventListener("focus", () => {
            utils.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"));
        });
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "isActive": ["handleFocus"]
    }; }
};

export { YetiModal as yeti_modal };

//# sourceMappingURL=yeti-modal.entry.js.map