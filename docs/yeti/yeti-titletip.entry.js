import { r as registerInstance, h, g as getElement } from './index-93794b9c.js';
import { u as utils } from './utils-800d05b7.js';

const YetiTitleTip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.justClickedClosed = false;
    this.wrapperClass = '';
    this.titletipClass = '';
    this.text = "I'm a helpful titletip.";
    this.position = "above";
    this.clickToOpen = false;
    this.slotId = "";
    this.tipId = "";
    this.blockAnchor = false;
    this.forceOpen = false;
    this.iLoveJSX = false;
    this.isClickedOpen = false;
  }
  handleSlotHover() {
    if (!this.clickToOpen) {
      this.scrollTitletipIntoView();
    }
  }
  handleSlotFocus() {
    if (!this.clickToOpen) {
      this.scrollTitletipIntoView();
    }
  }
  scrollTitletipIntoView() {
    let actual = this.el.querySelector(".yeti-titletip");
    actual.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
  componentWillLoad() {
    // Set up ids
    let componentId = this.el.getAttribute("id");
    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }
    this.tipId = (this.tipId != "") ? this.tipId : `${componentId}_tip`;
    this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
  }
  render() {
    let wrapperClass = 'yeti-titletip-wrapper';
    let tipClass = 'yeti-titletip';
    wrapperClass += (this.wrapperClass != '') ? ` ${this.wrapperClass}` : '';
    tipClass += (this.titletipClass != '') ? ` ${this.titletipClass}` : '';
    switch (this.position) {
      case "right":
        tipClass += " yeti-titletip-right";
        break;
      case "below":
        tipClass += " yeti-titletip-below";
        break;
      case "left":
        tipClass += " yeti-titletip-left";
        break;
      case "below-left":
        tipClass += " yeti-titletip-below-left";
        break;
      case "below-right":
        tipClass += " yeti-titletip-below-right";
        break;
      case "above-left":
        tipClass += " yeti-titletip-above-left";
        break;
      case "above-right":
        tipClass += " yeti-titletip-above-right";
        break;
    }
    return ([
      h("div", { class: wrapperClass }, h("div", null, h("slot", null)), h("div", { class: tipClass }, h("div", { class: "yeti-titletip-content", id: this.tipId }, this.text)))
    ]);
  }
  componentDidRender() {
    let slot = this.el.querySelector(".yeti-titletip-trigger").firstElementChild;
    let trigger = this.el.querySelector(".yeti-titletip-trigger");
    //slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-describedby", this.tipId);
    if (this.justClickedClosed && trigger) {
      // The user just clicked the tooltip closed. Restore focus to the trigger.
      this.justClickedClosed = false;
      trigger.focus();
    }
  }
  get el() { return getElement(this); }
};

export { YetiTitleTip as yeti_titletip };

//# sourceMappingURL=yeti-titletip.entry.js.map