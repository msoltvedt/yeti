import { Component, Prop, h, State, Event, EventEmitter, Element, Listen } from '@stencil/core';
import { utils, YetiMultiselectOption } from '../../utils/utils';

@Component({
  tag: 'yeti-multiselect',
  shadow: false,
})
export class YetiMultiselect {

  @Element() el: HTMLElement;

  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter<CustomEvent>;

  @Prop() cssClass: string = '';

  @Prop({
    mutable: true,
    reflect: true
  }) facadeId: string = "";

  @Prop({
    mutable: true,
    reflect: true
  }) actualId: string = "";

  @Prop({
    mutable: true,
    reflect: true
  }) actualName: string = this.actualId;

  @Prop() required: boolean = false;

  @Prop() menuAlignment: string = "";

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  @Prop() labelledBy: string = "";

  @Prop() describedBy: string = "";

  @Prop() placeholder: string = "- Select -";

  @Prop() showClear: boolean = true;

  @State() options: YetiMultiselectOption[] = [];

  @State() isTouched: boolean = false;

  @State() numSelections: number = 0;

  @State() iLoveJSX: boolean = false;

  @State() isOpen: boolean = false;

  @State() cursorPosition: number = -1;



  @Listen("click", {
    target: "body"
  })
  handleDefocusingClick() {
    if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
      this.closeFlyout();
    }
  }



  @Listen("keydown")
  handleKeydown(ev: KeyboardEvent) {

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
        } else {

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
        } else if (ev.altKey) {

          this.openFlyout();
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
        } else if (ev.altKey) {

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
        let target = ev.target as HTMLElement;

        // First check if the clear everything puck has focus
        if (target.classList.contains("yeti-multiselect-puck")) {
          target.click();
          break;
        } else {
        // Next check if the cursor is on a selection
        
          if (this.cursorPosition >= 0) {
            // Toggle selection on the option at this cursor position.
            this.handleOptionClick(this.cursorPosition);
          } else {

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
      this.closeFlyout()
    } else {
      this.openFlyout();
    }
  }



  handleFieldBlur(ev) {
    this.isTouched = true;
    this.readyToVerifySlow.emit(ev);
  }



  parseOptionElements(options: HTMLCollection) {

    for (let i = 0; i < options.length; i++) {
      
      let option = options.item(i);
      
      // First, confirm this element is indeed a yeti-table-pagination-option element.
      if (option.tagName.toLowerCase() == 'yeti-multiselect-option') {

        let optionId;

        if (option.hasAttribute("id")) {
          optionId = option.getAttribute("id");
        } else {
          optionId = `${this.el.getAttribute("id")}_option${i}`;
        }

        this.options.push({
          selected: option.hasAttribute("selected"),
          label: option.innerHTML,
          id: optionId
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
        for (let i=0; i < this.options.length; i++) {
          
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
    for (let i=0; i<this.options.length; i++) {
      let optionActual = <option value={this.options[i].label} selected={this.options[i].selected}>{this.options[i].label}</option>;
      optionsActual.push(optionActual);
    }

    return optionsActual;
  }



  handleOptionClick(i: number) {
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



  handleClearSelections(ev: Event) {
    let fieldElement = this.el.querySelector(".yeti-multiselect") as HTMLElement;
    for (let i=0; i<this.options.length; i++) {
      this.options[i].selected = false;
    }
    this.value = "";
    this.numSelections = 0;
    fieldElement.focus();
    ev.stopPropagation();
    this.readyToVerifyFast.emit();
  }



  handleActualFocus() {
    let facade = this.el.querySelector(".yeti-multiselect") as HTMLElement;
    if (facade) {
      facade.focus();
    }
  }



  componentWillLoad() {
    // Set up ids and handle any <yeti-multiselect-option> elements
    let optionElements = this.el.children;

    // Set up ids
    let componentId = this.el.getAttribute("id");

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }

    this.actualId = (this.actualId != "") ? this.actualId : `${componentId}_actual`;
    this.actualName = this.actualId;

    this.facadeId = (this.facadeId != "") ? this.facadeId : `${componentId}_facade`;
    

    // Handle any <yeti-multiselect-option> elements
    if (this.el.hasAttribute("id") && this.el.getAttribute("id") != "") { 
      this.el.getAttribute("id");
    } else {
      this.el.setAttribute("id", utils.generateUniqueId());
    }

    // Look for and handle any <yeti-multiselect-option> elements.
    if (optionElements.length > 0) {
      
      this.parseOptionElements(optionElements);

    }
  }



  componentWillRender() {
    if (this.value == "") {
      for (let i=0; i<this.options.length; i++) {
        this.options[i].selected = false;
      }
      this.value = "";
      this.numSelections = 0;
    }
  }



  componentDidRender() {
    // If the cursor is over an option, make sure it's visible.
    if (this.isOpen) {
      let flyout = this.el.querySelector(".yeti-multiselect-flyout");
      flyout.scrollIntoView({
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
      cssClasses += ' yeti-multiselect__error';
    }

    flyoutClass += (this.isOpen) ? " yeti-multiselect-flyout__open" : "";

    if (this.menuAlignment == "right") {
      flyoutClass += ' yeti-multiselect-flyout-align-right'
    }

    return ([
      <div class="yeti-multiselect-wrapper">

        <select
          tabIndex={-1}
          class="yeti-multiselect-actual yeti-a11y-hidden"
          multiple={true}
          id={this.actualId}
          name={this.actualName}
          onFocus={() => {this.handleActualFocus()}}
          {...((!this.isValid) ? {"aria-invalid": true} : {})}
          {...((this.labelledBy != "") ? {"aria-labelledby": this.labelledBy} : {})}
          {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
        >
          
          {this.renderActualOptions()}

        </select>

        <div 
          tabIndex={0}
          class={cssClasses}
          onClick={() => {
            this.isOpen = !this.isOpen;
          }}
          onFocus={() => {
            this.isTouched = true;
          }}
          aria-hidden="true"
        >

          <span class="yeti-multiselect-placeholder" title={this.getPlaceholderDisplay()}>{this.getPlaceholderDisplay()}</span>

          { (this.showClear && this.numSelections > 0) ? 

            (<button class="yeti-multiselect-puck" title="Clear all selections" onClick={ (ev) => { this.handleClearSelections(ev); ev.preventDefault() }}>
              <span class="material-icons yeti-multiselect-puck-icon" aria-hidden="true">cancel</span>
            </button>)

          :

            ""

          }

        </div>

        
        <div class={flyoutClass} aria-hidden="true">
        
          <ul
            class="yeti-multiselect-options"
            id={this.facadeId}
          >

            {this.options.map((option, i) => {

                let optionClass = (this.cursorPosition == i) ? "yeti-multiselect-option yeti-multiselect-option__hover" : "yeti-multiselect-option";
              
                return (
                  <li id={option.id} key={option.id}>
                    <button class={optionClass} tabIndex={-1} onClick={(ev) => { this.handleOptionClick(i); ev.preventDefault(); }}>
                      <span class="yeti-multiselect-option-checkbox">
                        <span class="material-icons">{(option.selected) ? "check_box" : "check_box_outline_blank"}</span>
                      </span>
                      <span class="yeti-multiselect-option-label">{option.label}</span>
                    </button>
                  </li>
                )
              }
            
            )}

          </ul>

        </div>

      </div>
    ]);
  }

}
