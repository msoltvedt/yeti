import { r as registerInstance, h, g as getElement } from './index-81029423.js';
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
    handleOpenIndexChange(newSectionIndex) {
        this.openSection(newSectionIndex);
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
        let clickedSection = e.detail.section;
        // First make sure it's openable
        if (!clickedSection.isOpenable) {
            this.openSection(this.openIndex); // It wasn't, so just open whatever we previously had as the open section.
            return;
        }
        else {
            if (clickedSection.isOpen) {
                clickedSection.isOpen = false;
            }
            else {
                this.openSection(e.detail.sectionIndex);
            }
        }
    }
    openSection(suppliedIndex = 0) {
        // Opens the section at suppliedIndex while closing the other sections.
        this.sectionElements.forEach((sectionElements, index) => {
            let section = sectionElements;
            let sectionHeader = section.querySelector(".yeti-accordion-section-heading");
            let sectionStatus = section.getAttribute("status");
            if (index == suppliedIndex) {
                section.setAttribute("is-openable", "true");
                section.setAttribute("status", (sectionStatus == "undefined" ? "reachable" : sectionStatus));
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
            //section.setAttribute("is-openable", `${ (index <= suppliedIndex)  ||  !this.isWizard }`);
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
            section.setAttribute("is-open", `${(index == this.openIndex)}`);
            section.setAttribute("index", `${index}`);
            section.setAttribute("of", `${this.sectionElements.length}`);
            section.setAttribute("is-openable", `${section.hasAttribute("is-openable") ? section.getAttribute("is-openable") : (index <= this.openIndex)}`);
            section.setAttribute("status", `${section.hasAttribute("status") ? section.getAttribute("status") : (index == this.openIndex) ? "reachable" : "undefined"}`);
            section.setAttribute("is-in-wizard", `${this.isWizard}`);
        });
    }
    render() {
        return (h("div", { key: 'af5f98036950bdf24a9908c4f1df49e56fabc7ee', class: "yeti-accordion" }, h("slot", { key: '1e383eee2cd929a019dd53cb6b2b0c62861df1f0' })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "openIndex": ["handleOpenIndexChange"]
    }; }
};

export { YetiAccordion as yeti_accordion };

//# sourceMappingURL=yeti-accordion.entry.js.map