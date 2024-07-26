import { r as registerInstance, a as createEvent, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiCombobox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
        this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
        this.wrapperCss = '';
        this.required = false;
        this.menuAlignment = "";
        this.isValid = undefined;
        this.value = '';
        this.placeholder = "- Select -";
        this.options = [];
        this.isTouched = false;
        this.iLoveJSX = false;
        this.isOpen = false;
        this.cursorPosition = -1;
        this.showClear = true;
        this.inputId = "";
        this.inputName = "";
        this.inputDescribedBy = "";
        this.isLookup = false;
        this.isFilterable = false;
        this.selectionType = "manual";
    }
    handleValueChange() {
        this.updateOptions();
    }
    handleSelectionTypeChange() {
        // Make sure selection type is a valid value.
        this.selectionType = (this.selectionType == "automatic") ? this.selectionType : "manual";
    }
    handleDefocusingClick() {
        if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
            this.closeFlyout();
        }
    }
    handleClick(ev) {
        this.isTouched = true;
        this.toggleFlyout();
        ev.preventDefault();
    }
    handleButtonClick(ev) {
        ev.preventDefault();
        // Otherwise just let the handleClick function do the rest.
    }
    handleKeydown(ev) {
        let key = ev.key.toString().toLowerCase();
        switch (key) {
            // Handle potential tabout
            case "tab": {
                // Normal tab direction
                if (!ev.shiftKey) {
                    if (this.el.querySelectorAll(".yeti-combobox-input:focus").length == 0 || this.value == "") {
                        this.closeFlyout();
                    }
                    // Shift tab direction (backwards)
                }
                else {
                    if (this.el.querySelectorAll(".yeti-combobox-input:focus").length > 0) {
                        this.closeFlyout();
                    }
                }
                break;
            }
            // Handle arrow navigation
            case "arrowdown": {
                if (this.isOpen) {
                    this.cursorPosition = (this.cursorPosition + 1) % this.options.length;
                    ev.preventDefault();
                }
                else {
                    this.cursorPosition = (ev.altKey) ? this.cursorPosition : 0;
                    this.openFlyout();
                    ev.preventDefault();
                }
                break;
            }
            // Handle arrow navigation
            case "arrowup": {
                if (this.isOpen) {
                    this.cursorPosition = (this.cursorPosition - 1 + this.options.length) % this.options.length;
                    ev.preventDefault();
                }
                else {
                    this.cursorPosition = this.options.length - 1;
                    this.openFlyout();
                    ev.preventDefault();
                }
                break;
            }
            // Handle escape navigation
            case "escape": {
                if (this.isOpen) {
                    this.closeFlyout();
                    ev.preventDefault();
                }
                break;
            }
            // Handle dropdown open/close toggling enter/space or selection-making enter/space
            case "enter": {
                // Check to see if this happened while selecting something.
                ev.preventDefault();
                let target = ev.target;
                // First check if the clear everything puck has focus
                if (target.classList.contains("yeti-combobox-clear")) {
                    target.click();
                    break;
                }
                else {
                    // Next check if the cursor is on a selection and the flyout is open
                    if (this.cursorPosition >= 0 && this.isOpen) {
                        // Toggle selection on the option at this cursor position.
                        this.handleOptionClick(this.cursorPosition);
                    }
                    // Finally, if the selection type is automatic, and there's at least one option selected, set the value to its label.
                    if (this.selectionType == "automatic") {
                        for (let option of this.options) {
                            if (option.selected) {
                                this.value = option.label;
                                break;
                            }
                        }
                    }
                    this.closeFlyout();
                }
                break;
            }
            default: {
                // If the user is trying to type a letter or number then open the flyout
                if (key.length == 1 && key.match(/[a-zA-Z0-9]/)) {
                    this.openFlyout();
                }
            }
        }
    }
    handleClearSelections(ev) {
        let fieldElement = this.el.querySelector(".yeti-combobox-input");
        for (let option of this.options) {
            option.selected = false;
        }
        this.value = "";
        fieldElement.focus();
        ev.stopPropagation();
        this.readyToVerifySlow.emit();
        this.readyToVerifyFast.emit();
    }
    handleInputChange(ev) {
        this.value = ev.target.value;
    }
    updateOptions() {
        // Based on the (new) value of this.value, set the options' status
        let foundASelectionAlready = false;
        for (let option of this.options) {
            option.selected = (option.label.toLowerCase() == this.value.toLowerCase());
            // Determine whether to show this option or not based on filtering
            if (this.isFilterable && option.label.toLowerCase().indexOf(this.value.toLowerCase()) < 0) {
                option.isVisible = false;
            }
            else {
                option.isVisible = true;
            }
            // Determine whether to mark this option as selected based on selection type
            if (this.selectionType == "automatic") {
                // If this is a match, and we don't already have one, mark this one as selected. Otherwise set it as unselected.
                if (!foundASelectionAlready
                    && this.value != ""
                    && option.label.toLowerCase().indexOf(this.value.toLowerCase()) >= 0) {
                    option.selected = true;
                    foundASelectionAlready = true;
                }
                else {
                    option.selected = false;
                }
            }
        }
    }
    openFlyout() {
        this.isOpen = true;
    }
    closeFlyout() {
        this.isOpen = false;
        // this.cursorPosition = -1;
        this.isTouched = true;
        this.readyToVerifySlow.emit();
    }
    toggleFlyout() {
        if (this.isOpen) {
            this.closeFlyout();
        }
        else {
            this.openFlyout();
        }
    }
    handleFieldBlur(ev) {
        this.isTouched = true;
        // If selection type is automatic, update value with the first selected option.
        if (this.selectionType == "automatic") {
            for (let option of this.options) {
                if (option.selected) {
                    this.value = option.label;
                    break;
                }
            }
        }
        this.readyToVerifySlow.emit(ev);
    }
    parseOptionElements(options) {
        for (let i = 0; i < options.length; i++) {
            let option = options.item(i);
            // First, confirm this element is indeed a yeti-combobox-option element.
            if (option.tagName.toLowerCase() == 'yeti-combobox-option') {
                let optionId;
                if (option.hasAttribute("id")) {
                    optionId = option.getAttribute("id");
                }
                else {
                    optionId = `${this.el.getAttribute("id")}_option${i}`;
                }
                this.options.push({
                    selected: (option.hasAttribute("selected") || option.innerHTML == this.value),
                    label: option.innerHTML,
                    isVisible: true,
                    id: optionId
                });
                if (option.hasAttribute("selected")) {
                    this.value = option.innerHTML;
                }
            }
        } // End for
        // Finally, we need to remove the option elements.
        for (let j = options.length - 1; j >= 0; --j) {
            options.item(j).remove();
        }
    }
    getPlaceholderDisplay() {
        // Returns the string of text that should go in the placeholder area.
        return (this.value != "") ? this.value : this.placeholder;
    }
    handleOptionClick(i) {
        // i = options index
        let clickedOption = this.options[i];
        let input = this.el.querySelector(".yeti-combobox-input");
        // Set selected state of each option
        for (let j = 0; j < this.options.length; j++) {
            this.options[j].selected = (i == j);
        }
        // Update value, close dropdown, refocus, and fire events
        this.value = clickedOption.label;
        this.closeFlyout();
        input.focus();
        this.readyToVerifyFast.emit();
    }
    componentWillLoad() {
        // Set up ids and handle any <yeti-combobox-option> elements
        let optionElements = this.el.children;
        // Set up ids
        this.componentId = this.el.getAttribute("id");
        if (!this.componentId || this.componentId == "") {
            this.componentId = utils.generateUniqueId();
            this.el.setAttribute("id", this.componentId);
        }
        this.inputId = (this.inputId != "") ? this.inputId : this.componentId + "_input";
        this.buttonId = this.componentId + "_button";
        this.dropdownId = this.componentId + "_dropdown";
        this.inputName = (this.inputName != "") ? this.inputName : this.inputId; // If the user supplied a name, use it, otherwise just re-use the id.
        // Look for and handle any <yeti-combobox-option> elements.
        if (optionElements.length > 0) {
            this.parseOptionElements(optionElements);
        }
        // Make sure selection type is a valid value.
        this.selectionType = (this.selectionType == "automatic") ? this.selectionType : "manual";
    }
    render() {
        let wrapperCss = 'yeti-combobox-wrapper';
        let dropdownCss = 'yeti-combobox-dropdown';
        let activeDescendantId = (this.isOpen && this.cursorPosition != -1) ? `${this.componentId}_option${this.cursorPosition}` : ``; // If there is an active descendant (i.e. the menu is open and one of the options has the cursor highlight) then its id will look something like componentId_option3.
        wrapperCss += (this.wrapperCss == "") ? '' : ` ${this.wrapperCss}`;
        if (this.isValid == false) {
            wrapperCss += ' yeti-combobox__error';
        }
        dropdownCss += (this.isOpen) ? " yeti-combobox-dropdown__open" : "";
        if (this.menuAlignment == "right") {
            dropdownCss += ' yeti-combobox-dropdown-align-right';
        }
        return ([
            h("div", { key: 'debc47962af179cb7341b8a37ec9ffd411c43d47', class: wrapperCss }, h("div", { key: '272ee676286b57e290b70691d07d8e1999be69ec', class: "yeti-combobox", onClick: (ev) => this.handleClick(ev) }, h("input", Object.assign({ key: 'c056f83e6f1b36715279fa02c8269c41fcc8da87', type: "text", class: "yeti-combobox-input",
                // title={this.value}
                value: this.value, name: this.inputName, onFocus: () => {
                    this.isTouched = true;
                }, onBlur: (e) => {
                    this.handleFieldBlur(e);
                }, onInput: (ev) => this.handleInputChange(ev), role: "combobox", autocomplete: "off", "aria-autocomplete": "none", "aria-controls": this.dropdownId, "aria-expanded": this.isOpen, id: this.inputId }, (this.inputDescribedBy != "") ? { "aria-describedby": this.inputDescribedBy } : {}, (activeDescendantId != "") ? { "aria-activedescendant": activeDescendantId } : {})), (this.showClear && this.value != '') ?
                (h("button", { class: "yeti-combobox-clear", title: "Clear all selections", onClick: (ev) => { this.handleClearSelections(ev); ev.preventDefault(); } }, h("span", { class: "material-icons yeti-combobox-clear-icon", "aria-hidden": "true" }, "clear")))
                :
                    "", h("button", { key: '028c2da840c2bed0b47d21c3007351ea45c1003c', class: "yeti-combobox-button", tabIndex: -1, "aria-controls": this.dropdownId, "aria-expanded": this.isOpen, id: this.buttonId, onClick: (ev) => { this.handleButtonClick(ev); } }, (!this.isLookup) ?
                h("yeti-icon", { iconCode: (this.isOpen ? 'expand_less' : 'expand_more'), alt: (this.isOpen ? 'close' : 'open') })
                :
                    h("yeti-icon", { iconCode: 'search', alt: (this.isOpen ? 'lookup, close' : 'lookup, open') }))), h("div", { key: '5ad9b8466cd814b129208dd9dd8d607f48c10675', class: dropdownCss }, h("ul", { key: 'a26859e7127d967ca54a125e4010c79aa0005bb0', class: "yeti-combobox-options", id: this.dropdownId, role: "listbox" }, this.options.map((option, i) => {
                let optionClass = (this.cursorPosition == i) ? "yeti-combobox-option yeti-combobox-option__hover" : "yeti-combobox-option";
                optionClass += (option.selected) ? " yeti-combobox-option__selected" : "";
                // Only render visible options
                if (!option.isVisible) {
                    return "";
                }
                return (h("li", { id: option.id, key: option.id, role: "option", "aria-selected": `${option.selected}`, class: optionClass, onClick: (ev) => { this.handleOptionClick(i); ev.preventDefault(); } }, h("span", { class: "yeti-combobox-option-label" }, option.label), h("span", { class: "yeti-combobox-option-checkmark", "aria-hidden": 'true' }, (option.selected) ?
                    h("yeti-icon", { iconCode: 'checkmark' })
                    :
                        '')));
            }))))
        ]);
    }
    componentDidRender() {
        // If the cursor is over an option, make sure it's visible.
        if (this.isOpen) {
            // The facade dropdown is open. If one of the options is being hovered over then we want to scroll it into view.
            // If not, then we'll scroll the whole dropdown into view.
            let dropdown = this.el.querySelector(".yeti-combobox-dropdown");
            let hoveredOption = this.el.querySelector(".yeti-combobox-option__hover");
            let thingToScrollIntoView = (hoveredOption) ? hoveredOption : dropdown;
            thingToScrollIntoView.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["handleValueChange"],
        "selectionType": ["handleSelectionTypeChange"]
    }; }
};

export { YetiCombobox as yeti_combobox };

//# sourceMappingURL=yeti-combobox.entry.js.map