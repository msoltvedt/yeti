import { r as registerInstance, h, g as getElement } from './index-9ea89afc.js';
import { u as utils } from './utils-ed9b126a.js';

const YetiTableActions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.cssClass = '';
    this.htmlId = utils.generateUniqueId();
  }
  render() {
    let cssClasses = 'yeti-table-actions';
    if (this.cssClass != '') {
      cssClasses += ' ' + this.cssClass;
    }
    return (h("div", { class: cssClasses, id: this.htmlId }, h("slot", null)));
  }
  get el() { return getElement(this); }
};

export { YetiTableActions as yeti_table_actions };
