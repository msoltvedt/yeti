import { r as registerInstance, h, g as getElement } from './index-a229effc.js';
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
        return (h("div", { key: '2471506d5de145d1f9e486d159a8a7ed054dd003', class: modalOverlayCSS }, h("div", { key: '1c5ccebe29c0f6dea1fc9e54babc1049071e68d1', class: "yeti-modal-bumper-front", tabIndex: 0 }), h("div", Object.assign({ key: '9c6d50c7c235da731a3804026e04c8e7f3ed5827', class: modalCSS }, modalProperties), h("div", { key: 'a8581548d67ebbd7dbfe31c90bf1f0f647e0c39d', class: "yeti-modal-header" }, h("h1", { key: '7185de799149f3f02ade9d852ed5c1ba6b12bef4', class: "yeti-modal-header-heading", id: this.headingId }, this.heading), h("div", { key: '43fd87b3bb38288a60680b2fae8362fd6d3123f2', class: "yeti-modal-header-action" }, h("slot", { key: '5aa54daa845f4853192d50f57de2ab9e5a397f4a', name: "header_action" })), (this.showClose) ?
            h("button", { class: "yeti-modal-header-close yeti-button-ghost", onClick: () => { this.isActive = false; } }, h("span", { class: "material-icons" }, "close"))
            :
                null), h("div", { key: '01e86d01e65e266b98f9758d5ab209537677304c', class: "yeti-modal-content" }, h("div", { key: 'fbb848055fa91eba8ff39ebef1bca607d126b34a', class: "yeti-modal-content-actual" }, h("slot", { key: '7ae39831719a553513476405f3a3683462797024', name: "content" })), h("div", { key: '11d1e1c5f90d6fef4ea714dcdc5b764bbaaf7da0', class: "yeti-modal-content-fade" })), h("div", { key: 'b9ef1858682f461dae4d3971398c23fe1bcc3a35', class: "yeti-modal-actions" }, h("div", { key: 'dcce3814cea71972b1a9c6c49acfa3749d38a6d8', class: "yeti-modal-actions-buttons" }, h("slot", { key: 'ffe6db82b49b0f221700b374025b1eb521ca25bc', name: "buttons" })))), h("div", { key: '70e6270f16380c46f17e3922d854b3468c7a50b4', class: "yeti-modal-bumper-back", tabIndex: 0 })));
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