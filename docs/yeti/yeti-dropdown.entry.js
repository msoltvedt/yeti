import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
        this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
        this.wrapperClass = '';
        this.comboboxId = "";
        this.flyoutId = "";
        this.formName = "";
        this.required = false;
        this.isMultiselect = false;
        this.menuAlignment = "";
        this.isValid = true;
        this.value = '';
        this.labelledBy = "";
        this.describedBy = "";
        this.placeholder = "- Select -";
        this.showClear = true;
        this.isSearchable = false;
        this.searchString = "";
        this.options = [];
        this.isTouched = false;
        this.numSelections = 0;
        this.isOpen = false;
        this.cursorPosition = -1;
        this.iLoveJSX = false;
    }
    handleDefocusingClick() {
        if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
            this.closeFlyout();
        }
    }
    handleKeydown(ev) {
        var _a, _b, _c;
        let key = ev.key.toString().toLowerCase();
        switch (key) {
            // Handle potential tabout
            case "tab": {
                // Normal tab direction
                if (!ev.shiftKey) {
                    if (this.el.querySelectorAll(".yeti-dropdown:focus").length == 0) {
                        this.closeFlyout();
                    }
                    // Shift tab direction (backwards)
                }
                else {
                    if (this.el.querySelectorAll(".yeti-dropdown:focus").length > 0) {
                        this.closeFlyout();
                    }
                }
                break;
            }
            // Handle arrow navigation
            case "arrowdown": {
                if (this.isOpen) {
                    // If the user is searching, we first need to switch focus back to the main control so the readout makes sense.
                    if (this.el != document.activeElement) {
                        (_a = this.el.querySelector(".yeti-dropdown")) === null || _a === void 0 ? void 0 : _a.focus();
                    }
                    this.cursorPosition = this.getNextVisibleCursorPosition();
                    ev.preventDefault();
                }
                else if (ev.altKey) {
                    this.cursorPosition = 0;
                    this.openFlyout();
                    ev.preventDefault();
                }
                break;
            }
            // Handle arrow navigation
            case "arrowup": {
                if (this.isOpen) {
                    // If the user is searching, we first need to switch focus back to the main control so the readout makes sense.
                    if (this.el != document.activeElement) {
                        (_b = this.el.querySelector(".yeti-dropdown")) === null || _b === void 0 ? void 0 : _b.focus();
                    }
                    // this.cursorPosition = (this.cursorPosition - 1 + this.options.length) % this.options.length;
                    this.cursorPosition = this.getPreviousVisibleCursorPosition();
                    ev.preventDefault();
                }
                else if (ev.altKey) {
                    this.openFlyout();
                    ev.preventDefault();
                }
                break;
            }
            // Handle escape navigation
            case "escape": {
                if (this.isOpen) {
                    // If the user is searching, escape should just return focus to the main element.
                    if (this.el != document.activeElement) {
                        (_c = this.el.querySelector(".yeti-dropdown")) === null || _c === void 0 ? void 0 : _c.focus();
                        ev.preventDefault();
                        break;
                    }
                    this.closeFlyout();
                    ev.preventDefault();
                }
                break;
            }
            // Handle flyout open/close toggling enter/space or selection-making enter/space
            case "enter":
            case " ": {
                // Check to see if this happened while selecting something.
                ev.preventDefault();
                let target = ev.target;
                // First check if the clear everything puck has focus
                if (target.classList.contains("yeti-dropdown-puck")) {
                    target.click();
                    break;
                }
                else {
                    // Next check if the cursor is on a selection
                    if (this.cursorPosition >= 0) {
                        // Toggle selection on the option at this cursor position.
                        this.handleOptionClick(this.cursorPosition);
                    }
                    else {
                        // User isn't selecting or activating clear puck, so just toggle the flyout open/close state.
                        this.toggleFlyout();
                    }
                }
                break;
            }
        }
    }
    getNextVisibleCursorPosition() {
        // Get the index of the option in this.options that corresponds to the next visible option, wrapping to the start of the array if necessary, or returning the original cursor position if no other options are visible.
        let numOptions = this.options.length;
        let safeCursorPosition = (this.cursorPosition + numOptions) % numOptions;
        // Look for a match between this.cursorPosition and the end of the array.
        for (let i = (safeCursorPosition + 1) % numOptions; i != safeCursorPosition; i = (i + 1) % numOptions) {
            if (this.options[i].isVisible) {
                return i;
            }
        }
        return this.cursorPosition;
    }
    getPreviousVisibleCursorPosition() {
        // Get the index of the option in this.options that corresponds to the next visible option, wrapping to the start of the array if necessary, or returning the original cursor position if no other options are visible.
        let numOptions = this.options.length;
        let safeCursorPosition = (this.cursorPosition + numOptions) % numOptions;
        // Look for a match between this.cursorPosition and the end of the array.
        for (let i = ((safeCursorPosition - 1) + numOptions) % numOptions; i != safeCursorPosition; i = ((i - 1) + numOptions) % numOptions) {
            if (this.options[i].isVisible) {
                return i;
            }
        }
        return this.cursorPosition;
    }
    openFlyout() {
        this.isOpen = true;
    }
    closeFlyout() {
        this.isOpen = false;
        this.cursorPosition = -1;
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
        this.readyToVerifySlow.emit(ev);
    }
    parseOptionElements(options) {
        let runningInitialValueArray = [];
        let alreadyFoundASelectedOption = false;
        for (let i = 0; i < options.length; i++) {
            let option = options.item(i);
            // First, confirm this element is indeed a yeti-dropdown-option element.
            if (option.tagName.toLowerCase() == 'yeti-dropdown-option') {
                let optionId;
                let selectedState = false;
                if (option.hasAttribute("id")) {
                    optionId = option.getAttribute("id");
                }
                else {
                    optionId = `${this.el.getAttribute("id")}_option${i}`;
                }
                // Handle selected attribute
                if (this.isMultiselect) {
                    selectedState = option.hasAttribute("selected");
                }
                else {
                    selectedState = option.hasAttribute("selected") && !alreadyFoundASelectedOption; // Single select should ignore all but the first selected attribute
                    if (selectedState) {
                        alreadyFoundASelectedOption = true;
                    }
                }
                this.options.push({
                    selected: selectedState,
                    label: option.innerHTML,
                    id: optionId,
                    isVisible: true
                });
                if (selectedState) {
                    ++this.numSelections;
                    runningInitialValueArray.push(option.innerHTML);
                }
            }
        } // End for
        // Initialize value
        this.value = runningInitialValueArray.toString();
        // Finally, we need to remove the option elements.
        for (let j = options.length - 1; j >= 0; --j) {
            options.item(j).remove();
        }
    }
    getPlaceholderDisplay() {
        // Returns the string of text that should go in the placeholder area.
        switch (this.numSelections) {
            case 0:
                return this.placeholder;
            case 1:
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].selected) {
                        return this.options[i].label;
                    }
                }
            default: // Multiple selections
                return `${this.numSelections} selections`;
        }
    }
    handleOptionClick(i) {
        // i = options index
        let newValue = [];
        let newNumSelections = (this.options[i].selected) ? --this.numSelections : ++this.numSelections;
        this.options[i].selected = !this.options[i].selected;
        for (let j = 0; j < this.options.length; j++) {
            // Multiselect
            if (this.isMultiselect) {
                if (this.options[j].selected) {
                    newValue.push(this.options[j].label);
                }
                // Single-select
            }
            else {
                if (i == j) {
                    this.value = this.options[i].label;
                    newNumSelections = (this.options[j].selected) ? 1 : 0;
                    this.closeFlyout();
                }
                else {
                    this.options[j].selected = false;
                }
            }
        }
        if (this.isMultiselect) {
            this.value = newValue.toString(); // Already updated value in the loop for single-select
        }
        this.numSelections = newNumSelections;
        this.readyToVerifyFast.emit();
    }
    handleClearSelections(ev) {
        let fieldElement = this.el.querySelector(".yeti-dropdown");
        for (let i = 0; i < this.options.length; i++) {
            this.options[i].selected = false;
        }
        this.value = "";
        this.numSelections = 0;
        fieldElement.focus();
        ev.stopPropagation();
        this.readyToVerifySlow.emit();
        this.readyToVerifyFast.emit();
    }
    handleSearchKeyUp(e) {
        let searchField = e.target;
        let searchString = searchField.value;
        if (!this.isSearchable) {
            return;
        }
        for (let option of this.options) {
            if (searchString != "" && option.label.indexOf(searchString) < 0) {
                option.isVisible = false;
            }
            else {
                option.isVisible = true;
            }
        }
        this.searchString = searchString;
    }
    //handleProgrammaticValueChange(newValue: string, oldValue: string) {
    // Usually you'd pre-set the value of the control by specifying the selected attribute of yeti-dropdown-option, however it can also be
    // set programmatically via the value property of the component.
    //console.log(`Value should change from ${oldValue} to ${newValue}`);
    //}
    componentWillLoad() {
        // Set up ids and handle any <yeti-dropdown-option> elements
        let optionElements = this.el.children;
        // Set up ids
        let componentId = this.el.getAttribute("id");
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        this.comboboxId = (this.comboboxId != "") ? this.comboboxId : `${componentId}_combobox`;
        this.formName = (this.formName != "") ? this.formName : componentId;
        this.flyoutId = (this.flyoutId != "") ? this.flyoutId : `${componentId}_flyout`;
        // Look for and handle any <yeti-dropdown-option> elements.
        if (optionElements.length > 0) {
            this.parseOptionElements(optionElements);
        }
    }
    componentDidRender() {
        // If the cursor is over an option, make sure it's visible.
        if (this.isOpen) {
            // The flyout is open. If one of the options is being hovered over then we want to scroll it into view.
            // If not, then we'll scroll the whole flyout into view.
            let flyout = this.el.querySelector(".yeti-dropdown-flyout");
            let hoveredOption = this.el.querySelector(".yeti-dropdown-option__hover");
            let thingToScrollIntoView = (hoveredOption) ? hoveredOption : flyout;
            thingToScrollIntoView.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }
    render() {
        let comboboxClasses = 'yeti-dropdown';
        let flyoutClass = 'yeti-dropdown-flyout';
        if (this.wrapperClass != '') {
            comboboxClasses += ' ' + this.wrapperClass;
        }
        if (this.isValid == false) {
            comboboxClasses += ' yeti-dropdown__error';
        }
        flyoutClass += (this.isOpen) ? " yeti-dropdown-flyout__open" : "";
        if (this.menuAlignment == "right") {
            flyoutClass += ' yeti-dropdown-flyout-align-right';
        }
        return ([
            h("div", { key: '56a159378246bb8477b78437e431ec5465aa86dc', class: "yeti-dropdown-wrapper" }, h("div", Object.assign({ key: 'a6ab1d4c160c5c8eb7fe3d93e8663808383891e5', tabIndex: 0, class: comboboxClasses, onClick: () => {
                    this.isOpen = !this.isOpen;
                }, onFocus: () => {
                    this.isTouched = true;
                }, role: "combobox" }, ((!this.isValid) ? { "aria-invalid": 'true' } : {}), ((this.labelledBy != "") ? { "aria-labeledby": this.labelledBy } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), { "aria-controls": this.flyoutId, "aria-expanded": this.isOpen, "aria-haspopup": "listbox" }, ((this.isOpen && this.cursorPosition >= 0) ? { "aria-activedescendant": this.options[this.cursorPosition].id } : {}), { id: this.comboboxId }), h("span", { key: '1fa571cbac05ff1ddfd8ade0ed01c2fbf4953d81', class: "yeti-dropdown-placeholder", title: this.getPlaceholderDisplay() }, this.getPlaceholderDisplay(), (this.numSelections > 1) ?
                h("span", { class: "yeti-a11y-hidden" }, this.value)
                :
                    ""), (this.isMultiselect && this.showClear && this.numSelections > 0) ? // Clear puck
                (h("button", { class: "yeti-dropdown-puck", title: "Clear all selections", onClick: (ev) => { this.handleClearSelections(ev); ev.preventDefault(); } }, h("span", { class: "yeti-a11y-hidden" }, "Clear all selections"), h("span", { class: "material-icons yeti-dropdown-puck-icon", "aria-hidden": "true" }, "cancel")))
                :
                    ""), h("div", { key: '6c329ba63bad0e3d896e4be193106d7b13a53e9d', class: flyoutClass }, /*Search field */ (this.isSearchable) ?
                h("div", { class: "yeti-dropdown-search-wrapper" }, h("input", Object.assign({ type: "search", class: "yeti-dropdown-search", placeholder: 'Type to search', onKeyUp: (e) => { this.handleSearchKeyUp(e); }, "aria-controls": this.flyoutId }, ((!this.isOpen) ? { "tabindex": -1 } : {}))))
                :
                    "", h("ul", Object.assign({ key: 'f3f3ddca585a6454a3c8179af9a2256fac4f42af', class: "yeti-dropdown-options", id: this.flyoutId, role: "listbox", "aria-multiselectable": "true" }, ((this.labelledBy != "") ? { "aria-labeledby": this.labelledBy } : {}), ((this.isOpen && this.cursorPosition >= 0) ? { "aria-activedescendant": this.options[this.cursorPosition].id } : {})), this.options.map((option, i) => {
                let optionClass = (this.cursorPosition == i) ? "yeti-dropdown-option yeti-dropdown-option__hover" : "yeti-dropdown-option";
                return ((option.isVisible) ?
                    h("li", { id: option.id, key: option.id, role: "option", "aria-selected": `${option.selected}` }, h("button", { class: optionClass, tabIndex: -1, onClick: (ev) => { this.handleOptionClick(i); ev.preventDefault(); } }, (this.isMultiselect) ?
                        h("span", { class: "yeti-dropdown-option-checkbox" }, h("span", { class: "material-icons", "aria-hidden": "true" }, (option.selected) ? "check_box" : "check_box_outline_blank"))
                        :
                            "", h("span", { class: "yeti-dropdown-option-label" }, option.label), (!this.isMultiselect && option.selected) ?
                        h("yeti-icon", { iconCode: "check", "aria-hidden": "true", iconClass: 'yeti-typo-size-4' })
                        :
                            ""))
                    :
                        "");
            }))))
        ]);
    }
    get el() { return getElement(this); }
};

export { YetiDropdown as yeti_dropdown };

//# sourceMappingURL=yeti-dropdown.entry.js.map