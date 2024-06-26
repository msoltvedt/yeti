import { r as registerInstance, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.openIndex = 0;
        this.sections = 0;
        this.sectionElements = null;
        this.isWizard = false;
        this.iLoveJSX = false;
    }
    handleAccordionActionClicked(e) {
        switch (e.detail.actionType) {
            case "previous": {
                if (e.detail.sectionIndex > 0) {
                    this.openSection(parseInt(e.detail.sectionIndex) - 1);
                }
                break;
            }
            case "next": {
                if (e.detail.sectionIndex < this.sections - 1 && e.detail.sectionStatus != "error") {
                    this.openSection(parseInt(e.detail.sectionIndex) + 1);
                }
                break;
            }
        }
    }
    handleAccordionSectionHeaderClick(e) {
        // User clicked on a section heading, toggle this pane's state and set the others accordingly.
        console.log(e.detail.sectionIndex);
        // First make sure it wasn't a section after this one while in wizard mode or the one that's already open
        if (e.detail.sectionIndex > this.openIndex && this.isWizard
            || e.detail.sectionIndex == this.openIndex) {
            this.openSection(this.openIndex);
            return;
        }
        else {
            this.openSection(e.detail.sectionIndex);
        }
    }
    openSection(suppliedIndex = 0) {
        this.sectionElements.forEach((sectionElements, index) => {
            let section = sectionElements;
            let sectionHeader = section.querySelector(".yeti-accordion-section-heading");
            if (index == suppliedIndex) {
                section.setAttribute("is-open", "true");
                sectionHeader === null || sectionHeader === void 0 ? void 0 : sectionHeader.focus();
                this.openIndex = index;
            }
            else {
                section.setAttribute("is-open", "false");
            }
        });
        this.openIndex = suppliedIndex;
    }
    componentWillLoad() {
        // Populate the sectionElements array and do some initial set-up.
        this.sectionElements = this.el.querySelectorAll('yeti-accordion-section');
        this.sections = this.sectionElements.length;
        if (!this.el.hasAttribute("id")) {
            this.el.setAttribute("id", utils.generateUniqueId());
        }
        if (!this.sectionElements || this.sectionElements.length < 2) {
            console.error("Yeti Accordion must have at least two yeti-accordion-section elements.");
            return;
        }
        this.sectionElements.forEach((sectionElement, index) => {
            let section = sectionElement;
            section.setAttribute("is-open", `${(index == 0)}`);
            section.setAttribute("index", `${index}`);
            section.setAttribute("of", `${this.sectionElements.length}`);
        });
    }
    render() {
        return (h("div", { key: 'f65be95803ee1b6f34afe8aa28be904cadbdd648', class: "yeti-accordion" }, h("slot", { key: 'f5f7d657e6d620986bcedb435895412a02265930' })));
    }
    get el() { return getElement(this); }
};

export { YetiAccordion as yeti_accordion };

//# sourceMappingURL=yeti-accordion.entry.js.map