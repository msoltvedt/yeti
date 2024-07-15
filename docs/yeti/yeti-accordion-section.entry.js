import { r as registerInstance, a as createEvent, h, g as getElement } from './index-a229effc.js';
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
        wrapperCSS += (this.isOpen) ? ' yeti-accordion-section__open' : '';
        return (h("div", { key: '313bfbcab936c6c0246ca71345b059b512e6e818', class: wrapperCSS }, h("button", Object.assign({ key: 'e2949093fedee1a5d9854ada4d98c9512b083aff', id: this.headingId, class: "yeti-accordion-section-heading", onClick: (e) => { this.handleSectionClick(e); }, "aria-expanded": `${this.isOpen}`, "aria-controls": this.sectionId }, (!this.isOpenable ? { "disabled": true, "tabIndex": -1 } : {})), h("div", { key: '423a83c3b429a0526732513918b29c04a156aa22', class: 'yeti-accordion-section-heading-contents' }, (this.isOpen) ?
            h("yeti-icon", { iconCode: 'expand_less', alt: '', iconClass: 'yeti-accordion-section-heading-caret' })
            :
                h("yeti-icon", { iconCode: 'expand_more', alt: '', iconClass: 'yeti-accordion-section-heading-caret' }), h("div", { key: '1c597e67838749b8f3af8b8fb6aeb09b56524bf5', class: "yeti-accordion-section-heading-actual" }, (this.isNumbered) ? (this.index + 1) : "", " ", this.heading), this.renderStatusIcon())), h("div", { key: 'a5c20f276e35fe88ee40af70cb7653eab7de1da1', id: this.sectionId, class: "yeti-accordion-section-content", role: "region", "aria-labelledby": this.headingId }, h("slot", { key: '46d5f084fca1c9ea8da5e7529fe9ff1f9d411c09', name: "content" })), h("div", { key: 'f32babec4453e26b51a18fafe7cc5dc762fa32b7', class: "yeti-accordion-section-actions" }, this.renderActions())));
    }
    get el() { return getElement(this); }
};

export { YetiAccordionSection as yeti_accordion_section };

//# sourceMappingURL=yeti-accordion-section.entry.js.map