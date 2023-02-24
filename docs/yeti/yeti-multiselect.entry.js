import { r as registerInstance, e as createEvent, h, g as getElement } from './index-77339656.js';
import { u as utils } from './utils-a407a515.js';

const YetiMultiselect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
    this.cssClass = '';
    this.htmlId = utils.generateUniqueId();
    this.actualId = utils.generateUniqueId();
    this.htmlName = this.htmlId;
    this.required = false;
    this.isValid = undefined;
    this.value = '';
    this.describedBy = "";
    this.placeholder = "-Select-";
    this.showClear = true;
    this.options = [];
    this.isTouched = false;
    this.numSelections = 0;
    this.iLoveJSX = false;
    this.isOpen = false;
    this.cursorPosition = -1;
  }
  handleDefocusingClick() {
    if (this.el.querySelectorAll(":focus").length == 0) {
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
          this.iLoveJSX = !this.iLoveJSX;
          ev.preventDefault();
        }
        break;
      }
      // Handle arrow navigation
      case "arrowup": {
        if (this.isOpen) {
          this.cursorPosition = (this.cursorPosition - 1 + this.options.length) % this.options.length;
          this.iLoveJSX = !this.iLoveJSX;
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
    this.value = ev.target.value;
    this.readyToVerifySlow.emit(ev);
  }
  parseOptionElements(options) {
    for (let i = 0; i < options.length; i++) {
      let option = options.item(i);
      // First, confirm this element is indeed a yeti-table-pagination-option element.
      if (option.tagName.toLowerCase() == 'yeti-multiselect-option') {
        // Check to see if it has an all attribute, and push the string "All" if it does.
        this.options.push({
          selected: option.hasAttribute("selected"),
          label: option.innerHTML
        });
        if (option.hasAttribute("selected")) {
          ++this.numSelections;
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
  renderActualOptions() {
    // Creates the <option>s for the actual <select>.
    let optionsActual = [];
    for (let i = 0; i < this.options.length; i++) {
      let optionActual = h("option", { value: this.options[i].label, selected: this.options[i].selected }, this.options[i].label);
      optionsActual.push(optionActual);
    }
    return optionsActual;
  }
  handleOptionClick(i) {
    // i = options index
    this.numSelections = (this.options[i].selected) ? --this.numSelections : ++this.numSelections;
    this.options[i].selected = !this.options[i].selected;
    this.iLoveJSX = !this.iLoveJSX; // Trigger re-render
  }
  handleClearSelections(ev) {
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].selected = false;
    }
    this.numSelections = 0;
    ev.stopPropagation();
  }
  handleActualFocus() {
    let facade = this.el.querySelector(".yeti-multiselect");
    if (facade) {
      facade.focus();
    }
  }
  componentWillLoad() {
    let optionElements = this.el.children;
    // Look for and handle any <yeti-multiselect-option> elements.
    if (optionElements.length > 0) {
      this.parseOptionElements(optionElements);
    }
  }
  componentDidRender() {
    // If the cursor is over an option, make sure it's visible.
    let cursorOption = this.el.querySelector(".yeti-multiselect-option__hover");
    if (cursorOption != null) {
      cursorOption.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }
  render() {
    let cssClasses = 'yeti-multiselect';
    let flyoutClass = 'yeti-multiselect-flyout';
    if (this.cssClass != '') {
      cssClasses += ' ' + this.cssClass;
    }
    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }
    flyoutClass += (this.isOpen) ? " yeti-multiselect-flyout__open" : "";
    return ([
      h("div", { class: "yeti-multiselect-wrapper" }, h("select", Object.assign({ tabIndex: -1, class: "yeti-multiselect-actual yeti-a11y-hidden", multiple: true, id: this.htmlId, name: this.htmlName, onFocus: () => { this.handleActualFocus(); } }, ((!this.isValid) ? { "aria-invalid": true } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {})), this.renderActualOptions()), h("div", { tabIndex: 0, class: cssClasses, onClick: () => {
          this.isOpen = !this.isOpen;
        }, "aria-hidden": "true" }, h("span", { class: "yeti-multiselect-placeholder", title: this.getPlaceholderDisplay() }, this.getPlaceholderDisplay()), (this.showClear) ?
        (h("button", { class: "yeti-multiselect-puck", title: "Clear all selections", onClick: (ev) => { this.handleClearSelections(ev); ev.preventDefault(); } }, h("span", { class: "material-icons yeti-multiselect-puck-icon", "aria-hidden": "true" }, "cancel")))
        :
          ""), h("div", { class: flyoutClass, "aria-hidden": "true" }, h("ul", { class: "yeti-multiselect-options" }, this.options.map((option, i) => {
        let optionClass = (this.cursorPosition == i) ? "yeti-multiselect-option yeti-multiselect-option__hover" : "yeti-multiselect-option";
        return (h("li", { key: i }, h("button", { class: optionClass, tabIndex: -1, onClick: (ev) => { this.handleOptionClick(i); ev.preventDefault(); } }, h("span", { class: "yeti-multiselect-option-checkbox" }, h("span", { class: "material-icons" }, (option.selected) ? "check_box" : "check_box_outline_blank")), h("span", { class: "yeti-multiselect-option-label" }, option.label))));
      }))))
    ]);
  }
  get el() { return getElement(this); }
};

export { YetiMultiselect as yeti_multiselect };
