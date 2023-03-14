import { r as registerInstance, e as createEvent, h, g as getElement } from './index-63c9e11c.js';
import { u as utils } from './utils-a407a515.js';

const YetiMenuButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.menuButtonChange = createEvent(this, "menuButtonChange", 7);
    this.justMadeASelection = false;
    this.wrapperCSS = '';
    this.buttonCSS = '';
    this.menuCSS = '';
    this.buttonId = utils.generateUniqueId();
    this.menuId = utils.generateUniqueId();
    this.tooltipText = "Options";
    this.menuAlignment = "";
    this.value = '';
    this.labelledBy = "";
    this.describedBy = "";
    this.options = [];
    this.isTouched = false;
    this.iLoveJSX = false;
    this.isOpen = false;
    this.cursorPosition = -1;
  }
  handleValueChange(newValue, oldValue) {
    this.menuButtonChange.emit({
      "newValue": newValue,
      "oldValue": oldValue
    });
  }
  handleDefocusingClick() {
    if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
      this.closeMenu();
    }
  }
  handleKeydown(ev) {
    let key = ev.key.toString().toLowerCase();
    switch (key) {
      // Handle potential tabout
      case "tab": {
        this.closeMenu();
        break;
      }
      // Handle down arrow
      case "arrowdown": {
        // Menu is already open, focus on next option.
        if (this.isOpen) {
          this.cursorPosition = (this.cursorPosition + 1) % this.options.length;
          // Menu isn't open, so open it and focus on the first option.
        }
        else {
          this.cursorPosition = 0;
          this.openMenu();
        }
        ev.preventDefault();
        break;
      }
      // Handle up arrow
      case "arrowup": {
        // Menu is already open, focus on previous option.
        if (this.isOpen) {
          this.cursorPosition = (this.cursorPosition - 1 + this.options.length) % this.options.length;
          // Menu isn't open, so open it and focus on the last option.
        }
        else {
          this.cursorPosition = this.options.length - 1;
          this.openMenu();
        }
        ev.preventDefault();
        break;
      }
      // Handle space, which should open the menu but do nothing else.
      case " ": {
        // Check to see if the menu is open.
        if (!this.isOpen) {
          this.cursorPosition = 0;
          this.openMenu();
        }
        ev.preventDefault();
        break;
      }
      // Handle enter
      case "enter": {
        // Check to see if the menu is open.
        if (!this.isOpen) {
          this.openMenu();
          this.cursorPosition = 0;
          ev.preventDefault();
        }
        // Menu is already open, so the user just made a selection.
        else {
          this.value = this.options[this.cursorPosition].label;
          this.justMadeASelection = true;
          this.closeMenu();
          // Note we're not preventing default here, so if the option was a link, that link will still work.
        }
        break;
      }
      // Home
      case "home": {
        // If the menu is open then move the cursor to the first option.
        if (this.isOpen) {
          this.cursorPosition = 0;
        }
        ev.preventDefault();
        break;
      }
      // End
      case "end": {
        if (this.isOpen) {
          this.cursorPosition = this.options.length - 1;
        }
        ev.preventDefault();
        break;
      }
    }
  }
  openMenu() {
    this.isOpen = true;
  }
  closeMenu() {
    this.isOpen = false;
    this.cursorPosition = -1;
    this.isTouched = true;
  }
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    }
    else {
      this.openMenu();
    }
  }
  parseOptionElements(options) {
    for (let i = 0; i < options.length; i++) {
      let option = options.item(i);
      // First, confirm this element is indeed a yeti-menu-button-option element.
      if (option.tagName.toLowerCase() == 'yeti-menu-button-option') {
        // Check to see if it has a href attribute.
        if (option.hasAttribute("href") && option.getAttribute("href") != "") {
          this.options.push({
            href: option.getAttribute("href"),
            label: option.innerHTML
          });
        }
        else {
          this.options.push({
            label: option.innerHTML
          });
        }
      }
    } // End for
    // Finally, we need to remove the option elements.
    for (let j = options.length - 1; j >= 0; --j) {
      options.item(j).remove();
    }
  }
  renderMenuItems() {
    // Creates the <option>s for the actual <select>.
    let items = [];
    for (let i = 0; i < this.options.length; i++) {
      // let optionActual = <option value={this.options[i].label} selected={this.options[i].selected}>{this.options[i].label}</option>;
      // optionsActual.push(optionActual);
      let option = this.options[i];
      let linkOrButtonElement;
      let item;
      // See if it's a link
      if (option.href) {
        linkOrButtonElement = h("a", { href: option.href, class: "yeti-menu_button-menu-item-link", role: "menuitem", tabindex: "-1", key: i, "data-option-index": i, onClick: () => { this.handleOptionClick(i); } }, option.label);
      }
      // Nope, it's a button.
      else {
        linkOrButtonElement = h("button", { class: "yeti-menu_button-menu-item-button", role: "menuitem", tabindex: "-1", key: i, "data-option-index": i, onClick: () => { this.handleOptionClick(i); } }, option.label);
      }
      item = h("li", { class: "yeti-menu_button-menu-item", role: "presentation" }, linkOrButtonElement);
      items.push(item);
    }
    return items;
  }
  handleOptionClick(i) {
    this.value = this.options[i].label;
    this.justMadeASelection = true;
    this.closeMenu();
  }
  handleActualFocus() {
    let facade = this.el.querySelector(".yeti-multiselect");
    if (facade) {
      facade.focus();
    }
  }
  handleButtonClick() {
    this.isOpen = !this.isOpen;
  }
  componentWillLoad() {
    let optionElements = this.el.children;
    // Look for and handle any <yeti-menu-button-option> elements.
    if (optionElements.length > 0) {
      this.parseOptionElements(optionElements);
    }
  }
  componentDidRender() {
    // If the cursor is over an option, make sure it's visible.
    let selector = '[data-option-index="' + this.cursorPosition + '"';
    let linkOrButtonElement = this.el.querySelector(selector);
    if (linkOrButtonElement) {
      linkOrButtonElement.focus();
    }
    if (this.isOpen) {
      this.el.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    if (this.justMadeASelection) {
      let button = this.el.querySelector('.yeti-menu_button-button');
      if (button) {
        button.focus();
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
      this.justMadeASelection = false;
    }
  }
  render() {
    let wrapperCSS = 'yeti-menu_button';
    let buttonClass = 'yeti-menu_button-button';
    let menuClass = 'yeti-menu_button-menu';
    if (this.menuAlignment.indexOf("right") > -1) {
      wrapperCSS += ' yeti-menu_button-right_aligned';
    }
    if (this.isOpen) {
      wrapperCSS += ' yeti-menu_button__open';
    }
    buttonClass += (this.buttonCSS && this.buttonCSS != "") ? " " + this.buttonCSS : "";
    menuClass += (this.menuCSS && this.menuCSS != "") ? " " + this.menuCSS : "";
    return ([
      h("div", { class: wrapperCSS }, h("yeti-tooltip", { text: this.tooltipText }, h("button", { class: buttonClass, "aria-haspopup": "true", "aria-expanded": "true", "aria-controls": this.menuId, id: this.buttonId, onClick: () => {
          this.handleButtonClick();
        } }, h("span", { class: "material-icons", "aria-hidden": "true" }, "more_vert"), h("span", { class: "yeti-a11y-hidden" }, "Options"))), h("ul", { class: menuClass, role: "menu", id: this.menuId, "aria-labelledby": this.buttonId }, this.renderMenuItems()))
    ]);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
};

export { YetiMenuButton as yeti_menu_button };