import { r as registerInstance, a as createEvent, h, g as getElement } from './index-a229effc.js';
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
        return (h("div", { key: '6a26618beea024c60173fd9e08f0ec65b563c800', class: wrapperCSS }, (this.hasHeader) ?
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
                '', h("div", { key: '849e30aaf2dfc7e3c5b60da1641c4e1f80463114', id: this.contentId, class: "yeti-panel-content", role: "region", "aria-labelledby": this.headerId }, h("slot", { key: '2a2d7da3937993b06da131d2295bca04c75c4c07' }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "isExpanded": ["watchIsExpandedHandler"]
    }; }
};

export { YetiPanel as yeti_panel };

//# sourceMappingURL=yeti-panel.entry.js.map