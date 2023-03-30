import { r as registerInstance, h, g as getElement } from './index-63c9e11c.js';
import { u as utils } from './utils-a407a515.js';

const YetiTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wrapperCSS = '';
    this.tooltipCSS = '';
    this.text = "I'm a helpful tooltip.";
    this.position = "above";
    this.slotId = utils.generateUniqueId();
    this.tipId = utils.generateUniqueId();
    this.blockAnchor = false;
    this.iLoveJSX = false;
  }
  handleSlotHover() {
    this.scrollTooltipIntoView();
  }
  handleSlotFocus() {
    this.scrollTooltipIntoView();
  }
  scrollTooltipIntoView() {
    let actual = this.el.querySelector(".yeti-tooltip");
    actual.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
  render() {
    let wrapperCSS = 'yeti-tooltip-wrapper';
    let tipClass = 'yeti-tooltip';
    wrapperCSS += (this.blockAnchor) ? ' yeti-tooltip-wrapper-has_block_anchor' : '';
    switch (this.position) {
      case "right":
        tipClass += " yeti-tooltip-right";
        break;
      case "below":
        tipClass += " yeti-tooltip-below";
        break;
      case "left":
        tipClass += " yeti-tooltip-left";
        break;
    }
    return ([
      h("div", { class: wrapperCSS }, h("div", { class: tipClass }, h("div", { class: "yeti-tooltip-content", id: this.tipId }, this.text)), h("div", { class: "yeti-tooltip-slot", id: this.slotId, "aria-describedby": this.tipId }, h("slot", null)))
    ]);
  }
  get el() { return getElement(this); }
};

export { YetiTooltip as yeti_tooltip };
