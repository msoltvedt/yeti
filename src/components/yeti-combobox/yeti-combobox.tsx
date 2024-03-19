import { Component, Watch, Prop, h, State, Event, EventEmitter, Element, Listen, /*Watch*/ } from '@stencil/core';
import { utils, YetiComboboxOption } from '../../utils/utils';

@Component({
  tag: 'yeti-combobox',
  shadow: false,
})
export class YetiCombobox {

  @Element() el: HTMLElement;

  /**
   * Fires when the user has made a selection and closed the dropdown (usually by focusing elsewhere).
   */
  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  /**
   * Fires when the user clicks an option or types in the input field.
   */
  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter<CustomEvent>;

  /**
   * CSS classlist to add to the component's outer wrapper element.
   */
  @Prop({ attribute: 'wrapper-class'}) wrapperCss: string = '';

  /**
   * Whether the component requires a valid value.
   */
  @Prop() required: boolean = false;

  /**
   * Token list of left | right and/or above | below that describes the drop-down's visual position relative to the closed state anchor.
   */
  @Prop() menuAlignment: string = "";

  /**
   * Whether the component has a valid value.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  /**
   * The component's value.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';
 
  @Watch("value")
  handleValueChange() {
    this.updateOptions();
  }

  /**
   * Text that appears in the closed state/anchor when there are no selections.
   */
  @Prop() placeholder: string = "- Select -";

  /**
   * Array of YetiComboboxOptions that describes the component's internal representation of its options. See utils.js for more detail.
   */
  @State() options: YetiComboboxOption[] = [];

  /**
   * Whether or not the user has interacted with the component (i.e. focused and blurred).
   */
  @State() isTouched: boolean = false;

  /**
   * Toggle to re-render the whole component.
   */
  @State() iLoveJSX: boolean = false;

  /**
   * Whether or not the drop-down is open/visible or not.
   */
  @State() isOpen: boolean = false;

  /**
   * 0-based index of the currently focused option.
   */
  @State() cursorPosition: number = -1;

  /**
   * Whether or not to show the optional Clear all selections puck.
   */
  @Prop() showClear: boolean = true;


  // These will be initialized on component load
  componentId: string;
  inputId: string;
  buttonId: string;
  dropdownId: string;



  @Listen("click", {
    target: "body"
  })
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



  @Listen("keydown")
  handleKeydown(ev: KeyboardEvent) {

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
        } else {

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
        } else {

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
        } else {

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
        let target = ev.target as HTMLElement;

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



  handleClearSelections(ev: Event) {
    let fieldElement = this.el.querySelector(".yeti-combobox-input") as HTMLElement;
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
      
      // First, confirm this element is indeed a yeti-combobox-option element.
      if (option.tagName.toLowerCase() == 'yeti-combobox-option') {

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



  handleOptionClick(i: number) {
    // i = options index
    let clickedOption = this.options[i];
    let input = this.el.querySelector(".yeti-combobox-input") as HTMLInputElement;

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
    this.buttonId = this.componentId + "_button";
    this.dropdownId = this.componentId + "_dropdown";

    // Look for and handle any <yeti-combobox-option> elements.
    if (optionElements.length > 0) {
      this.parseOptionElements(optionElements);
    }
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
      dropdownCss += ' yeti-combobox-dropdown-align-right'
    }

    return ([
      <div class={wrapperCss}>

        <div 
          class="yeti-combobox"
          onClick={(ev) => this.handleClick(ev)}
        >

          <input 
            type="text" 
            class="yeti-combobox-input" 
            title={this.value}
            value={this.value}
            onFocus={() => {
              this.isTouched = true;
            }}
            onBlur={() => {
              //this.isOpen = false;
            }}
            onInput={(ev) => this.handleInputChange(ev)}
            role="combobox"
            aria-autocomplete="none"
            aria-controls={this.dropdownId}
            aria-expanded={this.isOpen}
            id={this.inputId}
            {...(activeDescendantId != "") ? { "aria-activedescendant" : activeDescendantId } : {}}
          />

          { (this.showClear && this.value != '') ? 

            (<button class="yeti-combobox-clear" title="Clear all selections" onClick={ (ev) => { this.handleClearSelections(ev); ev.preventDefault() }}>
              <span class="material-icons yeti-combobox-clear-icon">clear</span>
            </button>)

          :

            ""

          }

          <button 
            class="yeti-combobox-button" 
            tabIndex={-1}
            aria-controls={this.dropdownId}
            aria-expanded={this.isOpen}
            id={this.buttonId}
            onClick={(ev) => { this.handleButtonClick(ev) }}
          >
            <yeti-icon iconCode={(this.isOpen ? 'expand_less' : 'expand_more')} alt={(this.isOpen ? 'close' : 'open')}></yeti-icon>
          </button>

        </div>

        
        <div class={dropdownCss} aria-hidden="true">
        
          <ul
            class="yeti-combobox-options"
            id={this.dropdownId}
            role="listbox"
          >

            {this.options.map((option, i) => {

                let optionClass = (this.cursorPosition == i) ? "yeti-combobox-option yeti-combobox-option__hover" : "yeti-combobox-option";
                optionClass += (option.selected) ? " yeti-combobox-option__selected" : "";
              
                return (
                  <li 
                    id={option.id} 
                    key={option.id} 
                    role="option"
                    aria-selected={option.selected}
                    class={optionClass}
                    onClick={(ev) => { this.handleOptionClick(i); ev.preventDefault(); }}
                  >

                      <span class="yeti-combobox-option-label">{option.label}</span>
                      <span class="yeti-combobox-option-checkmark">
                        {(option.selected) ? 
                        
                          <yeti-icon iconCode='checkmark' alt='selected'></yeti-icon>

                        :

                          ''

                        }
                      </span>

                  </li>
                )
              }
            
            )}

          </ul>

        </div>

      </div>
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

}