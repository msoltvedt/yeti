import { r as registerInstance, h, g as getElement } from './index-93794b9c.js';
import { u as utils } from './utils-800d05b7.js';

const YetiIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconCode = 'check_circle';
    this.iconStyle = '';
    this.iconClass = '';
    this.iconId = utils.generateUniqueId();
    this.alt = "";
    this.focusable = false;
    this.iLoveJSX = false;
  }
  render() {
    let iconClass = 'material-icons';
    let styleModifier = '';
    switch (this.iconStyle) {
      case 'outlined':
        styleModifier = '-outlined';
      case '':
      default: {
        break;
      }
    }
    iconClass += styleModifier;
    iconClass += (this.iconClass != '') ? ` ${this.iconClass}` : '';
    return ([
      h("span", Object.assign({ class: iconClass }, ((this.focusable) ? { "tabindex": "0" } : {}), ((this.alt != "") ? { "aria-hidden": 'true' } : {})), this.iconCode),
      (this.alt != "") ? h("span", { class: "yeti-a11y-hidden" }, this.alt) : ""
    ]);
  }
  get el() { return getElement(this); }
};

export { YetiIcon as yeti_icon };

//# sourceMappingURL=yeti-icon.entry.js.map