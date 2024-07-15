import { Component, Prop, h, State, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import { utils, YetiDropdownOption } from '../../utils/utils';

@Component({
  tag: 'yeti-dropdown',
  shadow: false,
})
export class YetiDropdown {

  @Element() el: HTMLElement;

  /**
   * Fires when the user has made a selection and closed the dropdown (usually by focusing elsewhere).
   */
  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  /**
   * Fires when the user toggles any of the options.
   */
  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter<CustomEvent>;

  /**
   * CSS classlist to add to the component's outer wrapper element.
   */
  @Prop() wrapperClass: string = '';

  /**
   * id of the root html element.
   */
  @Prop({
    attribute: "html-id",
    mutable: true,
    reflect: true
  }) comboboxId: string = ""; // Will be initialized on load (if necessary).

  /**
   * id of the drop-down element.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) flyoutId: string = ""; // Will be initialized on load (if necessary).

  /**
   * form's name for the actual drop-down element. Defaults to match id.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) formName: string = ""; // Will be initialized on load (if necessary).

  /**
   * Whether the component requires a valid value.
   */
  @Prop() required: boolean = false;

  /**
   * Whether the component is a Multiselect variant or not (defaults to not).
   */
  @Prop() isMultiselect: boolean = false;

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
  }) isValid: boolean = true;

  /**
   * The component's value is represented as a string of comma-separated values.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  /**** TODO: handle programmatic value changes: i.e. when controller JS sets [component].value 
  @Watch("value")
  handleValueChange(newValue: string, oldValue: string) {
    this.handleProgrammaticValueChange(newValue, oldValue);
  }*/

  /**
   * id of an external HTML element that the component's actual drop-down element references in aria-labelledby.
   */
  @Prop() labelledBy: string = "";

  /**
   * id of an external HTML element that the component's actual drop-down element references in aria-describedby.
   */
  @Prop() describedBy: string = "";

  /**
   * Text that appears in the closed state/anchor when there are no selections.
   */
  @Prop() placeholder: string = "- Select -";

  /**
   * Whether or not to show the optional Clear all selections puck.
   */
  @Prop() showClear: boolean = true;

  /**
   * Whether or not the user can filter the options by searching for a specific string.
   */
  @Prop() isSearchable: boolean = false;

  /**
   * A string to filter options against. Empty doesn't filter anything.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) searchString: string = "";

  /**
   * Array of YetiDropdownOptions that describes the component's internal representation of its options. See utils.js for more detail.
   */
  @Prop({mutable: true}) options: YetiDropdownOption[] = [];
  @Watch("options")
  handleOptionsChange() {

    let runningInitialValueArray = [];
    let alreadyFoundASelectedOption = false;
    let newNumSelections = 0;

    for (let i = 0; i < this.options.length; i++) {

      let option = this.options[i];

      // Set id
      option.id = (option.id) ? option.id : `${this.el.getAttribute("id")}_option${i}`;

      // Set value
      option.value = option.value ? option.value : option.label;

      // Handle selected attribute
      if (!this.isMultiselect) {
        if (option.selected) {
          option.selected = !alreadyFoundASelectedOption;
        }
        
        if (option.selected) {
          alreadyFoundASelectedOption = true;
        }
      }

      if (option.selected) {
        ++newNumSelections;
        runningInitialValueArray.push(option.value);
      }
        

    } // End for

    // Initialize value and numSelections
    this.value = runningInitialValueArray.toString();
    this.numSelections = newNumSelections;

  }

  /**
   * Whether or not the user has interacted with the component (i.e. focused and blurred).
   */
  @State() isTouched: boolean = false;

  /**
   * Number of total selections (used primarily for the anchor).
   */
  @State() numSelections: number = 0;

  /**
   * Whether or not the drop-down is open/visible or not.
   */
  @State() isOpen: boolean = false;
  @Watch("isOpen")
  handleIsOpenChange(newValue) {
    if (newValue) {
      this.didJustOpen = true; // So we can set focus on the search field when the flyout opens.
    }
  }

  /**
   * 0-based index of the currently focused option.
   */
  @State() cursorPosition: number = -1;

  /**
   * Toggle to re-render the whole component.
   */
  @State() iLoveJSX: boolean = false;


  searchId = utils.generateUniqueId();
  didJustOpen = false;



  @Listen("click", {
    target: "body"
  })
  handleDefocusingClick() {
    if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
      this.closeFlyout();
    }
  }



  @Listen("keyup")
  handleKeyup(ev: KeyboardEvent) {

    let key = ev.key.toString().toLowerCase();
    let dropdownElement = this.el.querySelector(".yeti-dropdown") as HTMLElement;

    switch (key) {

      // Handle potential tabout
      case "tab": {

        setTimeout(() => {
          
          if (!this.el.contains(document.activeElement)) {
            this.closeFlyout();
          }

        }, 1);
        
        break;
      }


      // Handle arrow navigation
      case "arrowdown": {

        if (this.isOpen) {
          
          // If the user is searching, we first need to switch focus back to the main control so the readout makes sense.
          if (dropdownElement != document.activeElement) {
            dropdownElement?.focus();
          }

          this.cursorPosition = this.getNextVisibleCursorPosition();
          ev.preventDefault();

        } else if (ev.altKey) {

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
          if (dropdownElement != document.activeElement) {
            dropdownElement?.focus();
          }

          // this.cursorPosition = (this.cursorPosition - 1 + this.options.length) % this.options.length;
          this.cursorPosition = this.getPreviousVisibleCursorPosition();
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

          // If the user is searching, escape should just return focus to the main element.
          // if (dropdownElement != document.activeElement) {
          //   dropdownElement?.focus();
          //   ev.preventDefault();
          //   break;
          // }

          dropdownElement?.focus();
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

        // First check if a clear option has focus
        if (target.classList.contains("yeti-dropdown-puck") || target.classList.contains("yeti-input-clear")) {
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



  @Listen("searchFieldClear")
  handleSearchInputClear() {
    (this.el.querySelector(".yeti-dropdown-search") as HTMLInputElement).value = "";
    this.resetAllOptionsVisibility();
    this.searchString = "";
  }



  getNextVisibleCursorPosition() {
    // Get the index of the option in this.options that corresponds to the next visible option, wrapping to the start of the array if necessary, or returning the original cursor position if no other options are visible.
    
    let numOptions = this.options.length;
    let safeCursorPosition = (this.cursorPosition + numOptions) % numOptions;
    
    // Look for a match between this.cursorPosition and the end of the array.
    for (
        let i = (safeCursorPosition + 1) % numOptions;
        i != safeCursorPosition;
        i = (i + 1)  %  numOptions
    ) {

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
    for (
        let i = ((safeCursorPosition - 1) + numOptions) % numOptions;
        i != safeCursorPosition;
        i = ((i - 1) + numOptions)  %  numOptions
    ) {

      if (this.options[i].isVisible) {
        return i;
      }

    }

    return this.cursorPosition;

  }



  resetAllOptionsVisibility() {
    for (let option of this.options) {
      option.isVisible = true;
    }
  }



  openFlyout() {
    this.isOpen = true;
  }



  closeFlyout() {
    this.isOpen = false;
    this.cursorPosition = -1;
    this.isTouched = true;
    this.searchString = '';
    this.resetAllOptionsVisibility();
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

    let runningInitialValueArray = [];
    let alreadyFoundASelectedOption = false;

    for (let i = 0; i < options.length; i++) {
      
      let option = options.item(i);
      
      // First, confirm this element is indeed a yeti-dropdown-option element.
      if (option.tagName.toLowerCase() == 'yeti-dropdown-option') {

        let optionId;
        let selectedState = false;
        let optionValue = "";

        // Set id
        if (option.hasAttribute("id")) {
          optionId = option.getAttribute("id");
        } else {
          optionId = `${this.el.getAttribute("id")}_option${i}`;
        }

        // Set value
        if (option.hasAttribute("value")) {
          optionValue = option.getAttribute("value");
        } else {
          optionValue = option.innerHTML;
        }


        // Handle selected attribute
        if (this.isMultiselect) {
          selectedState = option.hasAttribute("selected");
        } else {
          selectedState = option.hasAttribute("selected") && !alreadyFoundASelectedOption; // Single select should ignore all but the first selected attribute
          if (selectedState) {
            alreadyFoundASelectedOption = true;
          }
        }

        this.options.push({
          selected: selectedState,
          label: option.innerHTML,
          id: optionId,
          value: optionValue,
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
        for (let i=0; i < this.options.length; i++) {
          
          if (this.options[i].selected) {
            return this.options[i].label;
          }

        }

      default: // Multiple selections
        return `${this.numSelections} selections`;
    }
  }



  handleOptionClick(i: number) {
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
      } else {

        if (i == j) {
          this.value = this.options[i].value;
          newNumSelections = (this.options[j].selected) ? 1 : 0;
          this.closeFlyout();
        } else {
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



  handleClearSelections(ev: Event) {
    let fieldElement = this.el.querySelector(".yeti-dropdown") as HTMLElement;
    for (let i=0; i<this.options.length; i++) {
      this.options[i].selected = false;
    }
    this.value = "";
    this.numSelections = 0;
    fieldElement.focus();
    ev.stopPropagation();
    this.readyToVerifySlow.emit();
    this.readyToVerifyFast.emit();
  }



  handleSearchKeyUp(ev: KeyboardEvent) {
    let searchField = this.el.querySelector(".yeti-dropdown-search") as HTMLInputElement;
    let searchString = searchField.value;

    if (!this.isSearchable) {
      return;
    }

    if (ev.key == " ") {
      ev.stopImmediatePropagation();
    }

    for (let option of this.options) {
      
      if (searchString?.toLowerCase() != "" && option.label?.toLowerCase()?.indexOf( searchString.toLowerCase() ) < 0) {
        option.isVisible = false;
      } else {
        option.isVisible = true;
      }

    }

    this.searchString = searchString;
  }



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

      if (this.isSearchable && this.didJustOpen) {
        (this.el.querySelector(".yeti-dropdown-search") as HTMLElement)?.focus();
        this.didJustOpen = false;
      }

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
      flyoutClass += ' yeti-dropdown-flyout-align-right'
    }

    return ([
      <div class="yeti-dropdown-wrapper">

        <div 
          tabIndex={0}
          class={comboboxClasses}
          onClick={() => {
            this.isOpen = !this.isOpen;
          }}
          onFocus={() => {
            this.isTouched = true;
          }}
          role="combobox"
          {...((!this.isValid) ? {"aria-invalid": 'true'} : {})}
          {...((this.labelledBy != "") ? {"aria-labeledby": this.labelledBy} : {})}
          {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
          aria-controls={this.flyoutId}
          aria-expanded={this.isOpen}
          aria-haspopup="listbox"
          {...((this.isOpen && this.cursorPosition >= 0) ? { "aria-activedescendant": this.options[this.cursorPosition].id } : {})}
          id={this.comboboxId}
          {...((this.isSearchable) ? { "aria-description": "searchable" } : {})}
        >

          <span 
            class="yeti-dropdown-placeholder"
            title={this.getPlaceholderDisplay()}
          >{this.getPlaceholderDisplay()}
          
          {(this.numSelections > 1) ?
            <span class="yeti-a11y-hidden">{this.value}</span>
          :
            ""
          }
          </span>


          { (/*this.isMultiselect && */this.showClear && this.numSelections > 0) ? // Clear puck

            (<button class="yeti-dropdown-puck" title="Clear all selections" onClick={ (ev) => { this.handleClearSelections(ev); ev.preventDefault() }}>
              <span class="yeti-a11y-hidden">Clear all selections</span>
              <span class="material-icons yeti-dropdown-puck-icon" aria-hidden="true">cancel</span>
            </button>)

          :

            ""

          }

        </div>

        
        <div class={flyoutClass}>

          {/*Search field */

            (this.isSearchable) ?

              <div class="yeti-dropdown-search-wrapper">
                {/* <input 
                  type="search" 
                  class="yeti-dropdown-search" 
                  placeholder='Type to search' 
                  onKeyUp={(e) => { this.handleSearchKeyUp(e); }}
                  aria-controls={this.flyoutId}
                  autocomplete='off'
                  id={this.searchId}
                  value={this.searchString}
                  {...(!this.isOpen ? {"tabindex": "-1"} : {})}
                /> */}
                
                <yeti-input
                  input-class="yeti-dropdown-search"
                  placeholder='Type to search' 
                  onKeyUp={(e) => { this.handleSearchKeyUp(e); }}
                  aria-controls={this.flyoutId}
                  inputId={this.searchId}
                  value={this.searchString}
                  autocomplete="off"
                  {...(!this.isOpen ? {"input-tabindex": "-1"} : {})}
                />
              </div>

            :

              ""

          }

        
          <ul
            class="yeti-dropdown-options"
            id={this.flyoutId}
            role="listbox"
            aria-multiselectable="true"
            {...((this.labelledBy != "") ? {"aria-labeledby": this.labelledBy} : {})}
            {...((this.isOpen && this.cursorPosition >= 0) ? { "aria-activedescendant": this.options[this.cursorPosition].id } : {})}
          >

            {this.options.map((option, i) => {

                let optionClass = (this.cursorPosition == i) ? "yeti-dropdown-option yeti-dropdown-option__hover" : "yeti-dropdown-option";
              
                return (

                  (option.isVisible) ?

                    <li 
                      id={option.id} 
                      key={option.id}
                      role="option"
                      aria-selected={`${option.selected}`}
                    >
                      <button class={optionClass} tabIndex={-1} onClick={(ev) => { this.handleOptionClick(i); ev.preventDefault(); }}>


                        {
                          (this.isMultiselect) ?
                        
                            <span class="yeti-dropdown-option-checkbox">
                              <span class="material-icons" aria-hidden="true">{(option.selected) ? "check_box" : "check_box_outline_blank"}</span>
                            </span>

                          :

                            ""
                        }

                        
                        <span class="yeti-dropdown-option-label">{option.label}</span>


                        {
                          (!this.isMultiselect && option.selected) ?

                            <yeti-icon iconCode="check" aria-hidden="true" iconClass='yeti-typo-size-4'></yeti-icon>

                          :

                            ""
                        }


                      </button>
                    </li>

                  :

                    ""
                )
              }
            
            )}

          </ul>

        </div>

      </div>
    ]);
  }

}