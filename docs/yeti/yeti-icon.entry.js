import { r as registerInstance, h, g as getElement } from './index-757389e7.js';
import { u as utils } from './utils-9a04204c.js';

const YetiIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconCode = 'check_circle';
    this.iconCSS = '';
    this.iconId = utils.generateUniqueId();
    this.alt = "";
    this.focusable = false;
    this.iLoveJSX = false;
  }
  componentDidRender() {
    if (this.focusable) {
      this.el.setAttribute("tabindex", "0");
    }
  }
  render() {
    let iconCSS = 'material-icons';
    iconCSS += (this.iconCSS != '') ? ` ${this.iconCSS}` : '';
    return (
    // <span class="yeti-icon-wrapper" {...((this.focusable) ? {"tabindex": 0} : {})}>
    [
      h("span", Object.assign({ class: iconCSS }, ((this.alt != "") ? { "aria-hidden": true } : {})), this.iconCode),
      (this.alt != "") ? h("span", { class: "yeti-a11y-hidden" }, this.alt) : ""
    ]
    //</span>
    );
  }
  get el() { return getElement(this); }
};

export { YetiIcon as yeti_icon };

//# sourceMappingURL=yeti-icon.entry.js.map