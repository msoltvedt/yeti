import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiMultiselect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
        this.readyToVerifyFast = createEvent(this, "readyToVerifyFast", 7);
        this.wrapperClass = '';
        this.comboboxId = "";
        this.flyoutId = "";
        this.formName = "";
        this.required = false;
        this.menuAlignment = "";
        this.isValid = true;
        this.value = '';
        this.labelledBy = "";
        this.describedBy = "";
        this.placeholder = "- Select -";
        this.showClear = true;
        this.options = [];
        this.isTouched = false;
        this.numSelections = 0;
        this.iLoveJSX = false;
        this.isOpen = false;
        this.cursorPosition = -1;
    }
    handleDefocusingClick() {
        if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
            this.closeFlyout();
        }
    }
    handleKeydown(ev) {
        let key = ev.key.toString().toLowerCase();
        switch (key) {
            // Handle potential tabout
            case "tab": {
                // Normal tab direction
                if (!ev.shiftKey) {
                    if (this.el.querySelectorAll(".yeti-multiselect:focus").length == 0) {
                        this.closeFlyout();
                    }
                    // Shift tab direction (backwards)
                }
                else {
                    if (this.el.querySelectorAll(".yeti-multiselect:focus").length > 0) {
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
                    this.cursorPosition = (this.cursorPosition - 1 + this.options.length) % this.options.length;
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
                if (target.classList.contains("yeti-multiselect-puck")) {
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
        for (let i = 0; i < options.length; i++) {
            let option = options.item(i);
            // First, confirm this element is indeed a yeti-multiselect-option element.
            if (option.tagName.toLowerCase() == 'yeti-multiselect-option') {
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
        this.numSelections = (this.options[i].selected) ? --this.numSelections : ++this.numSelections;
        this.options[i].selected = !this.options[i].selected;
        for (let j = 0; j < this.options.length; j++) {
            if (this.options[j].selected) {
                newValue.push(this.options[j].label);
            }
        }
        this.value = newValue.toString();
        this.iLoveJSX = !this.iLoveJSX; // Trigger re-render
        this.readyToVerifyFast.emit();
    }
    handleClearSelections(ev) {
        let fieldElement = this.el.querySelector(".yeti-multiselect");
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
    //handleProgrammaticValueChange(newValue: string, oldValue: string) {
    // Usually you'd pre-set the value of the control by specifying the selected attribute of yeti-multiselect-option, however it can also be
    // set programmatically via the value property of the component.
    //console.log(`Value should change from ${oldValue} to ${newValue}`);
    //}
    componentWillLoad() {
        // Set up ids and handle any <yeti-multiselect-option> elements
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
        // Look for and handle any <yeti-multiselect-option> elements.
        if (optionElements.length > 0) {
            this.parseOptionElements(optionElements);
        }
    }
    componentDidRender() {
        // If the cursor is over an option, make sure it's visible.
        if (this.isOpen) {
            // The flyout is open. If one of the options is being hovered over then we want to scroll it into view.
            // If not, then we'll scroll the whole flyout into view.
            let flyout = this.el.querySelector(".yeti-multiselect-flyout");
            let hoveredOption = this.el.querySelector(".yeti-multiselect-option__hover");
            let thingToScrollIntoView = (hoveredOption) ? hoveredOption : flyout;
            thingToScrollIntoView.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }
    render() {
        let comboboxClasses = 'yeti-multiselect';
        let flyoutClass = 'yeti-multiselect-flyout';
        if (this.wrapperClass != '') {
            comboboxClasses += ' ' + this.wrapperClass;
        }
        if (this.isValid == false) {
            comboboxClasses += ' yeti-multiselect__error';
        }
        flyoutClass += (this.isOpen) ? " yeti-multiselect-flyout__open" : "";
        if (this.menuAlignment == "right") {
            flyoutClass += ' yeti-multiselect-flyout-align-right';
        }
        return ([
            h("div", { key: '1c84421239a6bafba1c691ace21f1a52203fc1fa', class: "yeti-multiselect-wrapper" }, h("div", Object.assign({ key: 'ac18693c8e3bbebb9d67484067c13816e32c58cf', tabIndex: 0, class: comboboxClasses, onClick: () => {
                    this.isOpen = !this.isOpen;
                }, onFocus: () => {
                    this.isTouched = true;
                }, role: "combobox" }, ((!this.isValid) ? { "aria-invalid": 'true' } : {}), ((this.labelledBy != "") ? { "aria-labeledby": this.labelledBy } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}), { "aria-controls": this.flyoutId, "aria-expanded": this.isOpen, "aria-haspopup": "listbox" }, ((this.isOpen && this.cursorPosition >= 0) ? { "aria-activedescendant": this.options[this.cursorPosition].id } : {}), { id: this.comboboxId }), h("span", { key: '9b8a5e2e0e615b63c2b6255306894258e250886b', class: "yeti-multiselect-placeholder", title: this.getPlaceholderDisplay() }, this.getPlaceholderDisplay(), (this.numSelections > 1) ?
                h("span", { class: "yeti-a11y-hidden" }, this.value)
                :
                    ""), (this.showClear && this.numSelections > 0) ?
                (h("button", { class: "yeti-multiselect-puck", title: "Clear all selections", onClick: (ev) => { this.handleClearSelections(ev); ev.preventDefault(); } }, h("span", { class: "yeti-a11y-hidden" }, "Clear all selections"), h("span", { class: "material-icons yeti-multiselect-puck-icon", "aria-hidden": "true" }, "cancel")))
                :
                    ""), h("div", { key: 'a061961218dcb88d12c428b982189674a6941292', class: flyoutClass }, h("ul", Object.assign({ key: '597528e6d339337bf63cb3f17dc3c35c9b180549', class: "yeti-multiselect-options", id: this.flyoutId, role: "listbox", "aria-multiselectable": "true" }, ((this.labelledBy != "") ? { "aria-labeledby": this.labelledBy } : {}), ((this.isOpen && this.cursorPosition >= 0) ? { "aria-activedescendant": this.options[this.cursorPosition].id } : {})), this.options.map((option, i) => {
                let optionClass = (this.cursorPosition == i) ? "yeti-multiselect-option yeti-multiselect-option__hover" : "yeti-multiselect-option";
                return (h("li", { id: option.id, key: option.id, role: "option", "aria-selected": `${option.selected}` }, h("button", { class: optionClass, tabIndex: -1, onClick: (ev) => { this.handleOptionClick(i); ev.preventDefault(); } }, h("span", { class: "yeti-multiselect-option-checkbox" }, h("span", { class: "material-icons", "aria-hidden": "true" }, (option.selected) ? "check_box" : "check_box_outline_blank")), h("span", { class: "yeti-multiselect-option-label" }, option.label))));
            }))))
        ]);
    }
    get el() { return getElement(this); }
};

export { YetiMultiselect as yeti_multiselect };

//# sourceMappingURL=yeti-multiselect.entry.js.map