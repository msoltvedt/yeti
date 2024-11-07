import { r as registerInstance, a as createEvent, h, g as getElement } from './index-93794b9c.js';
import { u as utils } from './utils-800d05b7.js';

const YetiPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.panelExpansionChanged = createEvent(this, "panelExpansionChanged", 7);
    this.hasSubheader = false;
    this.heading = 'Heading';
    this.isExpandable = false;
    this.isExpanded = true;
    this.headerId = utils.generateUniqueId();
    this.contentId = utils.generateUniqueId();
    this.wrapperClass = '';
    this.iLoveJSX = false;
  }
  watchIsExpandedHandler(newValue) {
    this.panelExpansionChanged.emit({
      "yetiPanel": this.el,
      "isExpanded": newValue
    });
  }
  handleHeaderClick() {
    if (this.isExpandable) {
      this.isExpanded = !this.isExpanded;
    }
  }
  componentWillLoad() {
    let potentialSubheader = this.el.querySelector('[slot="subheader"]');
    if (potentialSubheader) {
      this.hasSubheader = true;
    }
  }
  render() {
    let wrapperCSS = 'yeti-panel';
    wrapperCSS += (this.wrapperClass) ? ` ${this.wrapperClass}` : '';
    wrapperCSS += (this.isExpandable) ? ' yeti-panel-expandable' : '';
    wrapperCSS += (this.isExpandable && this.isExpanded) ? ' yeti-panel__expanded' : '';
    return (h("div", { class: wrapperCSS }, (this.isExpandable) ?
      // It's expandable, use a button for the header.
      h("button", { id: this.headerId, class: "yeti-panel-header", onClick: () => { this.handleHeaderClick(); }, "aria-expanded": this.isExpanded, "aria-controls": this.contentId }, h("div", { class: 'yeti-panel-header-contents' }, (this.isExpanded) ?
        h("yeti-icon", { iconCode: 'expand_less', alt: '', iconClass: 'yeti-panel-header-caret' })
        :
          h("yeti-icon", { iconCode: 'expand_more', alt: '', iconClass: 'yeti-panel-header-caret' }), h("div", { class: "yeti-panel-header-actual" }, this.heading), h("slot", { name: "subheader" })))
      :
        // It's not expandable, just use a div for the header.
        h("div", { id: this.headerId, class: "yeti-panel-header" }, h("div", { class: 'yeti-panel-header-contents' }, h("div", { class: "yeti-panel-header-actual" }, this.heading), h("slot", { name: "subheader" }))), h("div", { id: this.contentId, class: "yeti-panel-content", role: "region", "aria-labelledby": this.headerId }, h("slot", null))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "isExpanded": ["watchIsExpandedHandler"]
  }; }
};

export { YetiPanel as yeti_panel };

//# sourceMappingURL=yeti-panel.entry.js.map