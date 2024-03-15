import { r as registerInstance, a as createEvent, h, g as getElement } from './index-2baeb834.js';
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
    }
    handleValueChange() {
        this.updateOptions();
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
                if (target.classList.contains("yeti-combobox-puck")) {
                    target.click();
                    break;
                }
                else {
                    // Next check if the cursor is on a selection and the flyout is open
                    if (this.cursorPosition >= 0 && this.isOpen) {
                        // Toggle selection on the option at this cursor position.
                        this.handleOptionClick(this.cursorPosition);
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
        for (let option of this.options) {
            option.selected = (option.label.toLowerCase() == this.value.toLowerCase());
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
                    selected: option.hasAttribute("selected"),
                    label: option.innerHTML,
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
        this.inputId = this.componentId + "_input";
        this.dropdownId = this.componentId + "_dropdown";
        // Look for and handle any <yeti-combobox-option> elements.
        if (optionElements.length > 0) {
            this.parseOptionElements(optionElements);
        }
    }
    render() {
        let wrapperCss = 'yeti-combobox-wrapper';
        let dropdownCss = 'yeti-combobox-dropdown';
        wrapperCss += (this.wrapperCss == "") ? '' : ` ${this.wrapperCss}`;
        if (this.isValid == false) {
            wrapperCss += ' yeti-combobox__error';
        }
        dropdownCss += (this.isOpen) ? " yeti-combobox-dropdown__open" : "";
        if (this.menuAlignment == "right") {
            dropdownCss += ' yeti-combobox-dropdown-align-right';
        }
        return ([
            h("div", { key: '8af2f4c6dc77acc43950374f078aae815ee53849', class: wrapperCss }, h("div", { key: '3cc76f39450d8a06dce3e7537f478eaadca5cc82', class: "yeti-combobox", onClick: (ev) => this.handleClick(ev) }, h("input", { key: '3bc4bb5e9cc9f7b3647716b1591ebb65e9230e54', type: "text", class: "yeti-combobox-input", title: this.value, value: this.value, onFocus: () => {
                    this.isTouched = true;
                }, onBlur: () => {
                    //this.isOpen = false;
                }, onInput: (ev) => this.handleInputChange(ev), role: "combobox", "aria-autocomplete": "none", "aria-controls": this.dropdownId, "aria-expanded": this.isOpen, id: this.inputId }), (this.showClear && this.value != '') ?
                (h("button", { class: "yeti-combobox-clear", title: "Clear all selections", onClick: (ev) => { this.handleClearSelections(ev); ev.preventDefault(); } }, h("span", { class: "material-icons yeti-combobox-clear-icon" }, "clear")))
                :
                    "", h("button", { key: '2702ea4fafa12d5115ca93b2ee7e455dec2c207d', class: "yeti-combobox-button", tabIndex: -1, "aria-hidden": "true" }, h("yeti-icon", { key: '3c3dc8248e7f2fbfd608a7f86c4d2c490000b953', iconCode: (this.isOpen ? 'expand_less' : 'expand_more'), alt: (this.isOpen ? 'close' : 'open') }))), h("div", { key: '59270a2c88bb4d0804fb44c89e56a717aff919ca', class: dropdownCss, "aria-hidden": "true" }, h("ul", { key: '398bc2bb1814b18f6a437d051a2a7b5005a0870a', class: "yeti-combobox-options", id: this.dropdownId, role: "listbox" }, this.options.map((option, i) => {
                let optionClass = (this.cursorPosition == i) ? "yeti-combobox-option yeti-combobox-option__hover" : "yeti-combobox-option";
                optionClass += (option.selected) ? " yeti-combobox-option__selected" : "";
                return (h("li", { id: option.id, key: option.id, role: "option", "aria-selected": option.selected }, h("button", { class: optionClass, tabIndex: -1, onClick: (ev) => { this.handleOptionClick(i); ev.preventDefault(); }, "aria-controls": this.dropdownId, "aria-expanded": this.isOpen }, h("span", { class: "yeti-combobox-option-label" }, option.label), h("span", { class: "yeti-combobox-option-checkmark" }, (option.selected) ?
                    h("yeti-icon", { iconCode: 'checkmark', alt: 'selected' })
                    :
                        ''))));
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
        "value": ["handleValueChange"]
    }; }
};

export { YetiCombobox as yeti_combobox };

//# sourceMappingURL=yeti-combobox.entry.js.map