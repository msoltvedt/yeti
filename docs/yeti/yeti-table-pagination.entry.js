import { r as registerInstance, a as createEvent, h, g as getElement } from './index-2baeb834.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTablePagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.paginationUpdated = createEvent(this, "paginationUpdated", 7);
        this.cssClass = '';
        this.htmlId = utils.generateUniqueId();
        this.records = 0;
        this.showOptions = true;
        this.recordAliasSingular = "item";
        this.recordAliasPlural = "items";
        this.startIndex = 0;
        this.recordsDisplayed = 0;
        this.itemsPerPageOptions = [10, 25, 50, 100, "All"];
        this.selectedItemsPerPageOptionIndex = 0;
        this.selectedPage = 1;
        this.pages = 1;
    }
    watchRecordsHandler() {
        this.updatePages();
        this.updateIndices();
    }
    watchRecordsDisplayed() {
        this.paginationUpdated.emit({
            "currentPage": this.selectedPage - 1,
            "recordsDisplayed": this.recordsDisplayed
        });
    }
    parseOptionElements(options) {
        let newItemsPerPageOptions = [];
        for (let i = 0; i < options.length; i++) {
            let option = options.item(i);
            // First, confirm this element is indeed a yeti-table-pagination-option element.
            if (option.tagName.toLowerCase() == 'yeti-table-pagination-option') {
                // Check to see if it has an all attribute, and push the string "All" if it does.
                if (option.attributes && option.attributes['all']) {
                    newItemsPerPageOptions.push("All");
                }
                else {
                    // Check to see if it has a valid number for its contents, and warn if it doesn't.
                    let contents = parseInt(option.innerHTML);
                    if (!Number.isNaN(contents)) {
                        newItemsPerPageOptions.push(contents);
                    }
                    else {
                        console.warn(`Ignoring \<yeti-table-pagination-option\> with invalid value \"${option.innerHTML}\". Numbers only please.`);
                    }
                }
            }
        } // End for
        // Update itemsPerPageOptions if necessary.
        if (newItemsPerPageOptions.length > 0) {
            this.itemsPerPageOptions = newItemsPerPageOptions;
        }
        // Finally, we need to remove the option elements.
        for (let j = options.length - 1; j >= 0; --j) {
            options.item(j).remove();
        }
    }
    getItemsPerPageOption() {
        return this.itemsPerPageOptions[this.selectedItemsPerPageOptionIndex];
    }
    updateIndices() {
        let itemsPerPage = this.getItemsPerPageOption();
        // First set start index
        if (itemsPerPage == "All" || itemsPerPage > this.records) {
            this.startIndex = 0;
        }
        else {
            this.startIndex = ((this.selectedPage - 1) * itemsPerPage);
        }
        // Second set end index
        if (itemsPerPage == "All" || itemsPerPage > this.records) {
            this.recordsDisplayed = this.records;
        }
        else {
            this.recordsDisplayed = Math.min((this.records - this.startIndex), itemsPerPage);
        }
    }
    updatePages() {
        let p = this.getItemsPerPageOption();
        p = (p == "All") ? 1 : Math.ceil(this.records / p);
        this.pages = p;
    }
    handleItemsPerPageChange(e) {
        let select = e.target;
        this.selectedItemsPerPageOptionIndex = select.selectedIndex;
        this.selectedPage = 1;
        this.updatePages();
        this.updateIndices();
        e.preventDefault();
        this.paginationUpdated.emit({
            "currentPage": this.selectedPage - 1,
            "recordsDisplayed": this.recordsDisplayed
        });
    }
    handlePageSelectChange(e) {
        let select = e.target;
        this.selectedPage = parseInt(select.value);
        this.updateIndices();
        e.preventDefault();
        this.paginationUpdated.emit({
            "currentPage": this.selectedPage - 1,
            "recordsDisplayed": this.recordsDisplayed
        });
    }
    handlePreviousPageButtonClick(ev) {
        this.selectedPage = Math.max(1, this.selectedPage - 1);
        this.updateIndices();
        ev.preventDefault();
        this.paginationUpdated.emit({
            "currentPage": this.selectedPage - 1,
            "recordsDisplayed": this.recordsDisplayed
        });
    }
    handleNextPageButtonClick(ev) {
        this.selectedPage = Math.min(this.pages, this.selectedPage + 1);
        this.updateIndices();
        ev.preventDefault();
        this.paginationUpdated.emit({
            "currentPage": this.selectedPage - 1,
            "recordsDisplayed": this.recordsDisplayed
        });
    }
    componentWillLoad() {
        let optionElements = this.el.children;
        // Look for and handle any <yeti-table-pagnation-option> elements.
        if (optionElements.length > 0) {
            this.parseOptionElements(optionElements);
        }
    }
    render() {
        let cssClasses = 'yeti-table-pagination';
        //console.warn('Pagination render()', this.el);
        if (this.cssClass != '') {
            cssClasses += ' ' + this.cssClass;
        }
        return (h("nav", { key: '1f01193c779cdea2f81671fb9abb67e3afce5dd8', class: cssClasses, "aria-label": "Table Pagination" }, h("div", { key: 'f251b7b4e53a54cf1bcdeb4ba7fe8a0743e7a0b8', class: "yeti-table-pagination-items_per_page" }, (this.showOptions) ?
            [h("label", { htmlFor: "demo-items_per_page", class: "yeti-table-pagination-items_per_page-label" }, this.recordAliasPlural, " per page:"), h("select", { id: "demo-items_per_page", class: "yeti-select yeti-table-pagination-items_per_page-select", onChange: (e) => {
                        this.handleItemsPerPageChange(e);
                    } }, this.itemsPerPageOptions.map((option) => {
                    return h("option", { value: option, class: "yeti-table-pagination-items_per_page-select-option" }, option);
                }))]
            :
                "", h("span", { key: '5147d819380990604bf9296fd81c53614a11845b', class: "yeti-table-pagination-items_per_page-count" }, this.getItemsPerPageOption() == "All" || this.records == 0 ?
            ""
            : (this.startIndex + 1) + ' to ' + (this.startIndex + this.recordsDisplayed) /*(this.endIndex + 1)*/ + ' of ', this.records, " ", this.records == 1 ? this.recordAliasSingular : this.recordAliasPlural)), (this.records > 0) ?
            h("div", { class: "yeti-table-pagination-pages" }, h("label", { htmlFor: "demo-pages", class: "yeti-a11y-hidden" }, "Page number, of ", this.pages, " page", this.pages == 1 ? '' : 's'), h("select", { id: "demo-pages", class: "yeti-select yeti-table-pagination-pages-select", onChange: (e) => {
                    this.handlePageSelectChange(e);
                } }, (() => {
                let options = [];
                for (let i = 1; i <= this.pages; i++) {
                    options.push(h("option", Object.assign({ value: i, class: "yeti-table-pagination-pages-select-page" }, ((i == this.selectedPage) && { selected: true })), i));
                }
                return options;
            })()), h("span", { class: "yeti-table-pagination-pages-of_pages", "aria-hidden": "true" }, "of ", this.pages, " page", this.pages == 1 ? '' : 's'), h("ul", { class: "yeti-table-pagination-pages-buttons" }, h("li", { class: "yeti-table-pagination-pages-buttons-action" }, h("button", Object.assign({ class: "yeti-table-pagination-pages-buttons-button", onClick: (ev) => { this.handlePreviousPageButtonClick(ev); } }, ((this.selectedPage == 1) && { disabled: true })), h("span", { class: "material-icons", "aria-hidden": "true" }, "arrow_left"), h("span", { class: "yeti-a11y-hidden" }, "Previous page"))), h("li", { class: "yeti-table-pagination-pages-buttons-action" }, h("button", Object.assign({ class: "yeti-table-pagination-pages-buttons-button", onClick: (ev) => { this.handleNextPageButtonClick(ev); } }, ((this.selectedPage == this.pages) && { disabled: true })), h("span", { class: "material-icons", "aria-hidden": "true" }, "arrow_right"), h("span", { class: "yeti-a11y-hidden" }, "Next page")))))
            :
                ""));
    }
    componentDidRender() {
        //console.warn("Pagination did render.", this.el)
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "records": ["watchRecordsHandler"],
        "recordsDisplayed": ["watchRecordsDisplayed"]
    }; }
};

export { YetiTablePagination as yeti_table_pagination };

//# sourceMappingURL=yeti-table-pagination.entry.js.map