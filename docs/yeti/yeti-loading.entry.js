import { r as registerInstance, h, g as getElement } from './index-0a9ffd8f.js';
import { u as utils } from './utils-ab4e8d6b.js';

const YetiLoading = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.previouslyFocusedElement = null;
    this.shouldStealFocus = false;
    this.shouldReturnFocus = false;
    this.isModal = false;
    this.isActive = false;
  }
  handleFocus(newValue) {
    // When the Loading becomes active it should take focus away from whatever had it before, but
    // we want to keep track of what that was so we can return focus if Loading becomes inactive.
    // Becoming active, take focus
    if (newValue) {
      this.shouldStealFocus = true;
    }
    // Becoming inactive, return focus
    else {
      this.shouldReturnFocus = true;
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
  }
  render() {
    let modalOverlayCSS = "yeti-modal-overlay yeti-modal-overlay-light";
    let baseLoading = h("div", { class: "yeti-loading", tabindex: "-1" }, h("div", { class: "yeti-loading-icon" }, h("svg", { class: "yeti-loading-icon-svg", viewBox: "0 0 100 100", "aria-hidden": "true" }, h("circle", { class: "yeti-loading-icon-svg-circle", cx: "50%", cy: "50%", r: "44" }))), h("div", { class: "yeti-loading-label" }, "Loading..."));
    modalOverlayCSS += (this.isActive) ? "" : " yeti-modal-overlay__inert";
    return ((this.isModal) ?
      h("div", { class: modalOverlayCSS }, h("div", { class: "yeti-modal" }, baseLoading))
      :
        baseLoading);
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