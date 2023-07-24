import { r as registerInstance, h, g as getElement } from './index-757389e7.js';
import { u as utils } from './utils-9a04204c.js';

const YetiDemo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconCode = 'check_circle';
    this.iconCSS = '';
    this.iconId = utils.generateUniqueId();
    this.alt = "";
    this.focusable = false;
    this.iLoveJSX = false;
  }
  render() {
    return (h("div", { class: "yeti-demo" }, h("div", { class: "yeti-demo-actual" }, h("slot", null)), h("div", { class: "yeti-demo-code" }, h("div", { class: "yeti-demo-code-title_bar" }, h("div", { class: "yeti-demo-code-title_bar-title" }, "HTML"), h("ul", { class: "yeti-demo-code-title_bar-actions" }, h("li", null, "Hi"), h("li", null, "Hello"))), h("div", { class: "yeti-demo-code-actual" }))));
  }
  componentDidRender() {
    console.log("Yup.");
  }
  get el() { return getElement(this); }
};

export { YetiDemo as yeti_demo };

//# sourceMappingURL=yeti-demo.entry.js.map