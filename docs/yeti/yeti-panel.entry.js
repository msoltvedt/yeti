import { r as registerInstance, a as createEvent, h, g as getElement } from './index-81029423.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.panelExpansionChanged = createEvent(this, "panelExpansionChanged", 7);
        this.hasSubheader = false;
        this.heading = 'Heading';
        this.isExpandable = false;
        this.hasHeader = true;
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
        return (h("div", { key: '7545b5f77381195ec9a65ddfb444aa066917f315', class: wrapperCSS }, (this.hasHeader) ?
            (this.isExpandable) ?
                // It's expandable, use a button for the header.
                h("button", { id: this.headerId, class: "yeti-panel-header", onClick: () => { this.handleHeaderClick(); }, "aria-expanded": this.isExpanded, "aria-controls": this.contentId, type: "button" }, h("div", { class: 'yeti-panel-header-contents' }, (this.isExpanded) ?
                    h("yeti-icon", { iconCode: 'expand_less', alt: '', iconClass: 'yeti-panel-header-caret' })
                    :
                        h("yeti-icon", { iconCode: 'expand_more', alt: '', iconClass: 'yeti-panel-header-caret' }), h("div", { class: "yeti-panel-header-actual" }, this.heading), h("slot", { name: "subheader" })))
                :
                    // It's not expandable, just use a div for the header.
                    h("div", { id: this.headerId, class: "yeti-panel-header" }, h("div", { class: 'yeti-panel-header-contents' }, h("div", { class: "yeti-panel-header-actual" }, this.heading), h("slot", { name: "subheader" })))
            :
                '', h("div", { key: '4a757e2f900a02e1fb58c3347823ef3819e3d719', id: this.contentId, class: "yeti-panel-content", role: "region", "aria-labelledby": this.headerId }, h("slot", { key: '75fd36c90728b35ee226b17250cb6ab397a4a91e' }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "isExpanded": ["watchIsExpandedHandler"]
    }; }
};

export { YetiPanel as yeti_panel };

//# sourceMappingURL=yeti-panel.entry.js.map