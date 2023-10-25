import { r as registerInstance, h, g as getElement } from './index-ef4fdfe2.js';
import { u as utils } from './utils-b92a1748.js';

const YetiModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.previouslyFocusedElement = null; // So we can return focus to wherever the user was when the Loading component appeared.
    this.bodyInnerWrapper = null; // A div wrapped around everything in the body except the modal. Used to prevent background scrolling.
    this.shouldStealFocus = false;
    this.shouldReturnFocus = false;
    this.headingId = utils.generateUniqueId();
    this.heading = "Modal Heading";
    this.describedBy = "";
    this.size = "";
    this.modalCSS = "";
    this.isScrollable = true;
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
    if (this.isActive && e.keyCode == 27) { // Escape button
      this.isActive = false;
    }
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
    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }
  }
  render() {
    let modalOverlayCSS = "yeti-modal-overlay";
    let modalCSS = "yeti-modal";
    let modalProperties = {
      "role": "dialog",
      "aria-modal": "true",
      "aria-labelledby": this.headingId
    };
    if (this.describedBy != "") {
      modalProperties["aria-describedby"] = this.describedBy;
    }
    modalOverlayCSS += (this.isActive) ? "" : " yeti-modal-overlay__inert";
    modalCSS += (this.size == "") ? "" : ` yeti-modal-size-${this.size}`;
    modalCSS += (this.modalCSS != "") ? ` ${this.modalCSS}` : "";
    modalCSS += (this.isScrollable) ? "" : " yeti-modal__unscrollable";
    return (h("div", { class: modalOverlayCSS }, h("div", { class: "yeti-modal-bumper-front", tabIndex: 0 }), h("div", Object.assign({ class: modalCSS }, modalProperties), h("div", { class: "yeti-modal-header" }, h("h1", { class: "yeti-modal-header-heading", id: this.headingId }, this.heading), h("button", { class: "yeti-modal-header-close yeti-button-ghost", onClick: () => { this.isActive = false; } }, h("span", { class: "material-icons" }, "close"))), h("div", { class: "yeti-modal-content" }, h("slot", { name: "content" }), h("div", { class: "yeti-modal-content-fade" })), h("div", { class: "yeti-modal-actions" }, h("div", { class: "yeti-modal-actions-buttons" }, h("slot", { name: "buttons" })))), h("div", { class: "yeti-modal-bumper-back", tabIndex: 0 })));
  }
  componentDidRender() {
    // Handle focus management. We can't do this when the property changes because the inactive state uses display: none,
    // which interferes with the ability to accept focus depending on some race conditions.
    if (this.shouldStealFocus) {
      // Becoming active, take focus
      this.previouslyFocusedElement = document.activeElement;
      //utils.aria.focusFirstDescendant(this.el);
      this.handleInitialFocus();
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