import { r as registerInstance, h, g as getElement } from './index-a229effc.js';
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
                this.openIndex = index;
                setTimeout(() => {
                    sectionHeader === null || sectionHeader === void 0 ? void 0 : sectionHeader.focus();
                }, 100);
            }
            else {
                section.setAttribute("is-open", "false");
            }
            // Set the Openable state
            section.setAttribute("is-openable", `${(index <= suppliedIndex) || !this.isWizard}`);
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
            section.setAttribute("is-openable", `${(index == 0)}`);
            section.setAttribute("is-in-wizard", `${this.isWizard}`);
        });
    }
    render() {
        return (h("div", { key: '2c6d46f8d34b043252d055c887f19236a2ef92e4', class: "yeti-accordion" }, h("slot", { key: '3a875a5c8b82c16a8a860776ee85a4fc1f530258' })));
    }
    get el() { return getElement(this); }
};

export { YetiAccordion as yeti_accordion };

//# sourceMappingURL=yeti-accordion.entry.js.map