import { r as registerInstance, a as createEvent, h, g as getElement } from './index-81029423.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiAccordionSection = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.accordionActionClick = createEvent(this, "accordionActionClick", 7);
        this.accordionSectionHeaderClick = createEvent(this, "accordionSectionHeaderClick", 7);
        this.heading = 'Heading';
        this.isNumbered = true;
        this.index = 0;
        this.of = 1;
        this.isOpen = (this.index == 0);
        this.isOpenable = (this.index == 0);
        this.isInWizard = false;
        this.hasActions = false;
        this.status = "undefined";
        this.headingId = utils.generateUniqueId();
        this.sectionId = utils.generateUniqueId();
        this.iLoveJSX = false;
    }
    handleSectionClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.accordionSectionHeaderClick.emit({
            "originalEvent": e,
            "section": this.el,
            "sectionIndex": this.index,
            "sectionStatus": this.status,
            "isOpen": this.isOpen
        });
    }
    handleActionClick(e, actionType) {
        e.preventDefault();
        e.stopPropagation();
        this.accordionActionClick.emit({
            "originalEvent": e,
            "section": this.el,
            "sectionIndex": this.index,
            "sectionStatus": this.status,
            "actionType": actionType
        });
    }
    renderStatusIcon() {
        switch (this.status) {
            case "success": {
                return h("yeti-icon", { iconCode: 'check_circle', alt: 'complete', iconClass: 'yeti-accordion-section-status_icon yeti-accordion-section-status_icon-success' });
            }
            case "error": {
                return h("yeti-icon", { iconCode: 'error', alt: 'error', iconClass: 'yeti-accordion-section-status_icon yeti-accordion-section-status_icon-error' });
            }
            default: return "";
        }
    }
    renderActions() {
        // Render the action buttons for a section.
        // Use the user's content if provided...
        if (this.hasActions) {
            return h("slot", { name: "actions" });
            // ...otherwise automatically create our own.
        }
        else {
            let actions = [];
            // Previous
            if (this.index != 0) {
                actions.push(h("li", null, h("button", { class: "yeti-button yeti-button-secondary yeti-button-size-s", onClick: (e) => { this.handleActionClick(e, "previous"); } }, h("yeti-icon", { iconCode: 'navigate_before', alt: "", iconClass: 'yeti-accordion-action-button-icon' }), "Previous")));
            }
            // Next
            if (this.index < this.of - 1) {
                actions.push(h("li", null, h("button", Object.assign({ class: "yeti-button yeti-button-primary yeti-button-size-s", onClick: (e) => { this.handleActionClick(e, "next"); } }, ((this.isInWizard && this.status != "success") ? { "disabled": true, "tabIndex": -1 } : {})), "Next", h("yeti-icon", { iconCode: 'navigate_next', alt: "", iconClass: 'yeti-accordion-action-button-icon' }))));
            }
            // Cancel
            actions.push(h("li", null, h("button", { class: "yeti-button yeti-button-ghost yeti-button-size-s", onClick: (e) => { this.handleActionClick(e, "cancel"); } }, "Cancel")));
            return h("ul", { class: "yeti-button-group" }, actions);
        }
    }
    componentWillLoad() {
        let potentialActionsSlot = this.el.querySelector('[slot="actions"]');
        // User supplied actions, see if they marked them with an accordion-action attribute.
        if (potentialActionsSlot) {
            let elementsTaggedAsActions = potentialActionsSlot.querySelectorAll('[accordion-action]');
            this.hasActions = true;
            elementsTaggedAsActions.forEach((element) => {
                element.addEventListener("click", (e) => {
                    this.handleActionClick(e, element.getAttribute("accordion-action"));
                });
            });
        }
    }
    render() {
        let wrapperCSS = 'yeti-accordion-section';
        wrapperCSS += (this.isOpenable) ? ' yeti-accordion-section-openable' : '';
        wrapperCSS += (this.isOpen) ? ' yeti-accordion-section__open' : '';
        return (h("div", { key: 'c6d7864434945cf8d30922407ca0e332d829ec66', class: wrapperCSS }, h("button", Object.assign({ key: '51b9739cbe07ded09ca1533bff4106dd7e43b76b', id: this.headingId, class: "yeti-accordion-section-heading", onClick: (e) => { this.handleSectionClick(e); }, "aria-expanded": `${this.isOpen}`, "aria-controls": this.sectionId }, (!this.isOpenable ? { "disabled": true, "tabIndex": -1 } : {})), h("div", { key: '970f43d78b88fbd1534364899139b1c8d65f96bd', class: 'yeti-accordion-section-heading-contents' }, (this.isOpen) ?
            h("yeti-icon", { iconCode: 'expand_less', alt: '', iconClass: 'yeti-accordion-section-heading-caret' })
            :
                h("yeti-icon", { iconCode: 'expand_more', alt: '', iconClass: 'yeti-accordion-section-heading-caret' }), h("div", { key: '2d5a4b0748f9f0d1523731fa0ee67b51661f55ac', class: "yeti-accordion-section-heading-actual" }, (this.isNumbered) ? (this.index + 1) : "", " ", this.heading), this.renderStatusIcon())), h("div", { key: '55bfb944801a8573c5fa8b1fd197a40bc2ae071e', id: this.sectionId, class: "yeti-accordion-section-content", role: "region", "aria-labelledby": this.headingId }, h("slot", { key: '206b19268f6e9ba72d3a103b2cdb27dce3adbc1f', name: "content" })), h("div", { key: 'c695cd604e86f1d0a4ebe1dcc1b5b2f72501d3d5', class: "yeti-accordion-section-actions" }, this.renderActions())));
    }
    get el() { return getElement(this); }
};

export { YetiAccordionSection as yeti_accordion_section };

//# sourceMappingURL=yeti-accordion-section.entry.js.map