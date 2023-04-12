import { Component, Prop, h, State, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import { utils, YetiMenuButtonOption } from '../../utils/utils';

@Component({
  tag: 'yeti-menu-button',
  shadow: false,
})
export class YetiMenuButton {

  @Element() el: HTMLElement;

  @Event({ bubbles: true }) menuButtonChange: EventEmitter;

  @Prop({ attribute: 'wrapper-class'}) wrapperCSS: string = '';

  @Prop({ attribute: 'button-class'}) buttonCSS: string = '';

  @Prop({ attribute: 'menu-class'}) menuCSS: string = '';

  @Prop({
    mutable: true,
    reflect: true
  }) buttonId: string = "";

  @Prop() buttonType?: string = "";

  @Prop({
    mutable: true,
    reflect: true
  }) menuId: string = "";

  @Prop() tooltipText: string = "Options";

  @Prop() menuAlignment: string = "";

  @Prop() hasTooltip: boolean = true;

  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';
  @Watch('value')
  handleValueChange(newValue: string, oldValue: string) {
    this.menuButtonChange.emit({
      "newValue": newValue,
      "oldValue": oldValue
    });
  }

  @Prop() labelledBy: string = "";

  @Prop() describedBy: string = "";

  @State() options: YetiMenuButtonOption[] = [];

  @State() isTouched: boolean = false;

  @State() iLoveJSX: boolean = false;

  @State() isOpen: boolean = false;

  @State() cursorPosition: number = -1;

  private justMadeASelection: boolean = false;

  private hasCustomButtonContents: boolean = false;


  @Listen("click", {
    target: "body"
  })
  handleDefocusingClick() {
    if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
      this.closeMenu();
    }
  }



  @Listen("keydown")
  handleKeydown(ev: KeyboardEvent) {

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
        } else {
          
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
        } else {

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
      this.closeMenu()
    } else {
      this.openMenu();
    }
  }



  parseChildTags() {

    let options = this.el.querySelectorAll("yeti-menu-button-option");
    let buttonLabel = this.el.querySelector("yeti-menu-button-contents");

    this.options = (options && options.length && options.length > 0) ? [] : this.options;

    for (let i = 0; i < options.length; i++) {
      
      let option = options.item(i) as Element;
      
      // First, confirm this element is indeed a yeti-menu-button-option element.
      if (option.tagName.toLowerCase() == 'yeti-menu-button-option') {

        let optionObject: YetiMenuButtonOption = {
          label: "",
          id: "",
          href: "",
          value: "",
          hasHTML: false
        };

        let optionId = option.getAttribute("id");

        optionObject.id = (optionId && optionId != "") ? optionId : `${this.el.getAttribute("id")}_option${i}`;
        optionObject.label = (option as HTMLElement).innerText.trim().replace(/\t/g, '');
        optionObject.label = optionObject.label.replace(/\n/g, ' ');

        // Check to see if it has a href attribute.
        if (option.hasAttribute("href") && option.getAttribute("href") != "") {
          optionObject.href = option.getAttribute("href");
        }

        // Check to see if it's normal or fancy (i.e. has HTML)
        if (option.childNodes.length != 1 || option.firstChild.nodeType != 3) { // If there's not just a single text node

          optionObject.hasHTML = true;

          // Create a slot element and move all childNodes to it.
          let div = document.createElement("div");
          div.setAttribute("slot", optionObject.id);

          while (option.childNodes.length > 0) {
            div.appendChild(option.childNodes[0]);
          }

          this.el.appendChild(div);

          optionObject.innerHTML = option.innerHTML;
          
        }

        this.options.push(optionObject);

      }

    } // End for

    // Handle the button label (if it exists)
    if (buttonLabel) {
      this.hasCustomButtonContents = true;
      buttonLabel.setAttribute("slot", "buttonContents");
    }

    // Finally, we need to remove the option elements.
    for (let j = options.length - 1; j >= 0; --j) {
      options.item(j).remove();
    }

  }



  unwrapButtonContents() {
    let wrapper = this.el.querySelector("yeti-menu-button-contents");
    if (wrapper) {
      wrapper.replaceWith(...Array.from(wrapper.childNodes));
    }
  }



  renderMenuItems() {
    // Creates the <option>s for the actual <select>.
    let items = [];
    for (let i=0; i<this.options.length; i++) {
      // let optionActual = <option value={this.options[i].label} selected={this.options[i].selected}>{this.options[i].label}</option>;
      // optionsActual.push(optionActual);

      let option = this.options[i];
      let linkOrButtonElement;
      let item;
      //let listItemId = `${option.id}_item${i}`;
      let listItemId = `${option.id}`;

      // See if it's a link
      if (option.href) {
        linkOrButtonElement = <a 
          href={option.href} 
          class="yeti-menu_button-menu-item-link" 
          role="menuitem" 
          tabindex="-1"
          data-option-index={i}
          onClick={(ev) => { this.handleOptionClick(i, ev, true) }}>
            
            {(option.hasHTML) ? <slot name={option.id}></slot> : option.label}
            
        </a>
      }

      // Nope, it's a button.
      else {
        linkOrButtonElement = <button 
          class="yeti-menu_button-menu-item-button" 
          role="menuitem" 
          tabindex="-1"
          data-option-index={i}
          onClick={(ev) => { this.handleOptionClick(i, ev) }}>

            {(option.hasHTML) ? <slot name={option.id}></slot> : option.label}

        </button>
      }

      item = <li 
        class="yeti-menu_button-menu-item" 
        role="presentation"
        id={listItemId}
        key={listItemId}
      >{linkOrButtonElement}</li>

      items.push(item);

    }

    return items;
  }



  handleOptionClick(i: number, ev: Event, isLink: boolean = false) {

    this.value = this.options[i].label;
    this.justMadeASelection = true;
    this.closeMenu();
    if (!isLink) {
      ev.preventDefault();
    }
  }



  handleActualFocus() {
    let facade = this.el.querySelector(".yeti-multiselect") as HTMLElement;
    if (facade) {
      facade.focus();
    }
  }



  handleButtonClick(ev: Event) {
    this.isOpen = !this.isOpen;
    ev.preventDefault();
  }



  renderButton(buttonClass: string) {
    return <button 
      class={buttonClass}
      aria-haspopup="true"
      {...((this.isOpen) ? {"aria-expanded": "true"} : {})}
      aria-controls={this.menuId} 
      id={this.buttonId}
      role="button"
      onClick={(ev) => {
        this.handleButtonClick(ev)
    }}>

      {(this.hasCustomButtonContents) ?
        <slot name="buttonContents"></slot>
      :
        [
          <span class="material-icons" aria-hidden="true">more_vert</span>,
          <span class="yeti-a11y-hidden">Options</span>
        ]
      }
    </button>
  }



  componentWillLoad() {
    // Set ids
    let elementId = this.el.getAttribute("id");
  
    if (!elementId || elementId == "") {

      this.el.setAttribute("id", utils.generateUniqueId());

    }

    this.buttonId = (this.buttonId != "") ? this.buttonId : `${elementId}_button`;
    this.menuId = (this.menuId != "") ? this.menuId : `${elementId}_menu`;

  }



  componentWillRender() {
    // Look for and handle any <yeti-menu-button-*> tags.
    this.parseChildTags();
  }



  componentDidRender() {

    // Unwrap button contents, if necessary
    this.unwrapButtonContents();

    // If the cursor is over an option, make sure it's visible.
    let selector = '[data-option-index="' + this.cursorPosition + '"';
    let linkOrButtonElement = this.el.querySelector(selector) as HTMLElement;
    let menu = this.el.querySelector(".yeti-menu_button-menu");

    if (linkOrButtonElement) {
      
      linkOrButtonElement.focus();

    }

    if (this.isOpen) {

      menu.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }

    if (this.justMadeASelection) {

      let button = this.el.querySelector('.yeti-menu_button-button') as HTMLElement;

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
    let tooltipId = `${this.el.getAttribute("id")}_tooltip`;

    if (this.menuAlignment.indexOf("right") > -1) {
      wrapperCSS += ' yeti-menu_button-right_aligned';
    }

    if (this.isOpen) {
      wrapperCSS += ' yeti-menu_button__open';
    }

    if (this.buttonType && this.buttonType != "") {
      buttonClass = `${buttonClass} yeti-menu_button-button-mimic ${buttonClass}-${this.buttonType}`;
    }

    wrapperCSS += (this.wrapperCSS && this.wrapperCSS != "") ? " " + this.wrapperCSS : "";
    buttonClass += (this.buttonCSS && this.buttonCSS != "") ? " " + this.buttonCSS : "";
    menuClass += (this.menuCSS && this.menuCSS != "") ? " " + this.menuCSS : "";

    return ([
      <div class={wrapperCSS}>

        {
          (this.hasTooltip) ?

            <yeti-tooltip text={this.tooltipText} id={tooltipId} slotId={this.buttonId} tipId={`${this.buttonId}_tooltip`}>
              {this.renderButton(buttonClass)}
            </yeti-tooltip>

          :

            this.renderButton(buttonClass)
        }

        
        <ul class={menuClass} role="menu" id={this.menuId} aria-labelledby={this.buttonId} key={this.menuId}>

          {this.renderMenuItems()}

        </ul>

      </div>
    ]);
  }

}
