import { r as registerInstance, h, g as getElement } from './index-81029423.js';
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
        this.modalClass = "";
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
        modalCSS += (this.modalClass != "") ? ` ${this.modalClass}` : "";
        modalCSS += (this.isScrollable) ? "" : " yeti-modal__unscrollable";
        return (h("div", { key: '07b49dc24aaecccd38c86838f622a5452e3ed3c8', class: modalOverlayCSS }, h("div", { key: '0a6830a6c4247d6ba2afa4d41efc9afe1dab3770', class: "yeti-modal-bumper-front", tabIndex: 0 }), h("div", Object.assign({ key: '256ca6dc4d55f108427fb2798ddc3a8ffbf7a9c5', class: modalCSS }, modalProperties), h("div", { key: '6063c61917c2cfe9811d5216297eac8945cbaf74', class: "yeti-modal-header" }, h("h1", { key: '362f34fb03ad921cdc68fdacff78ebc20ab3d40d', class: "yeti-modal-header-heading", id: this.headingId }, this.heading), h("div", { key: '1fa743c9acc30fc5550d52fd1560275b4d8f368e', class: "yeti-modal-header-action" }, h("slot", { key: '991de71b4509d6f29580e970ba4f85b53eed8eda', name: "header_action" })), (this.showClose) ?
            h("button", { class: "yeti-modal-header-close yeti-button-ghost", onClick: () => { this.isActive = false; } }, h("span", { class: "material-icons" }, "close"))
            :
                null), h("div", { key: '77202a41bac73c5d5953d6cfbe9e8e7633f5434e', class: "yeti-modal-content" }, h("div", { key: '0be2c093552970e44ee16da45f8226dd62e27a2c', class: "yeti-modal-content-actual" }, h("slot", { key: '96bfda18d68206605966efafce3087d57ba49f5a', name: "content" })), h("div", { key: 'bec2fe8828f25b0668cd79eff45d13cc6fe4b0a7', class: "yeti-modal-content-fade" })), h("div", { key: '14a719f2edbd5b4e57f9a5d5883c00f91b58aef4', class: "yeti-modal-actions" }, h("div", { key: '2015d599516d37813d00c9089801557ff6a0bc8c', class: "yeti-modal-actions-buttons" }, h("slot", { key: '4a6953c799eb335b8d19f807e8a0fb219255c45c', name: "buttons" })))), h("div", { key: '011096209da679dd90c42a048b232175ab4f91dd', class: "yeti-modal-bumper-back", tabIndex: 0 })));
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