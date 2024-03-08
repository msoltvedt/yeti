import { Component, Prop, h, State, Event, EventEmitter, Element, Listen, /*Watch*/ } from '@stencil/core';
import { utils, YetiComboboxOption } from '../../utils/utils';

@Component({
  tag: 'yeti-combobox',
  shadow: false,
})
export class YetiCombobox{

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
  @Prop() cssClass: string = '';

  /**
   * id of the visual representation of the drop-down.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) facadeId: string = "";

  /**
   * id of the actual drop-down element.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) actualId: string = "";

  /**
   * name of the actual drop-down element. Defaults to match id.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) actualName: string = this.actualId;

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
   * Array of YetiMultiselectOptions that describes the component's internal representation of its options. See utils.js for more detail.
   */
  @State() options: YetiComboboxOption[] = [];

  /**
   * Whether or not the user has interacted with the component (i.e. focused and blurred).
   */
  @State() isTouched: boolean = false;

  /**
   * Number of total selections (used primarily for the anchor).
   */
  @State() numSelections: number = 0;

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


  @State() dropoptions: YetiComboboxOption[] = [];

  @State() boolean: boolean = false;

  @State() textInput: string = "";

  @Prop() dropvalue: string = "";

 





  @Listen("click", {
    target: "body"
  })
  handleDefocusingClick() {
    if (this.el.querySelectorAll(":focus").length == 0 && this.isOpen) {
      this.closeFlyout();
    }
  }

  handleTextKeyUp(ev: KeyboardEvent) {
    //Get the target element
    let inputHTMLElement = ev.target as HTMLInputElement;
    //Update textInput with current value
    this.textInput = inputHTMLElement.value;
}



  @Listen("keydown")
  handleKeydown(ev: KeyboardEvent) {

    let key = ev.key.toString().toLowerCase();

    switch (key) {

      // Handle potential tabout
      case "tab": {

        // Normal tab direction
        if (!ev.shiftKey) {

          if (this.el.querySelectorAll(".yeti-combobox:focus").length == 0) {
            this.closeFlyout();
          }

        // Shift tab direction (backwards)
        } else {

          if (this.el.querySelectorAll(".yeti-combobox:focus").length > 0) {
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
        if (target.classList.contains("yeti-combobox-puck")) {
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
      
      // First, confirm this element is indeed a yeti-multiselect-option element.
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
    };


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
    let fieldElement = this.el.querySelector(".yeti-combobox") as HTMLElement;
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



  handleActualFocus() {
    let facade = this.el.querySelector(".yeti-combobox") as HTMLElement;
    if (facade) {
      facade.focus();
    }
  }



  //handleProgrammaticValueChange(newValue: string, oldValue: string) {
    // Usually you'd pre-set the value of the control by specifying the selected attribute of yeti-combobox-option, however it can also be
    // set programmatically via the value property of the component.
    
    //console.log(`Value should change from ${oldValue} to ${newValue}`);
  //}



  componentWillLoad() {
    // Set up ids and handle any <yeti-combobox-option> elements
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
    

    // Handle any <yeti-combobox-option> elements
    if (this.el.hasAttribute("id") && this.el.getAttribute("id") != "") { 
      this.el.getAttribute("id");
    } else {
      this.el.setAttribute("id", utils.generateUniqueId());
    }

    // Look for and handle any <yeti-combobox-option> elements.
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
      // The facade flyout is open. If one of the options is being hovered over then we want to scroll it into view.
      // If not, then we'll scroll the whole flyout into view.
      let flyout = this.el.querySelector(".yeti-combobox-flyout");
      let hoveredOption = this.el.querySelector(".yeti-combobox-option__hover");
      let thingToScrollIntoView = (hoveredOption) ? hoveredOption : flyout;
      thingToScrollIntoView.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

  



// Rendering functions
renderDropdown() {
  // Based on the textInput, loop through options and only show matching ones

  let matchingOptions = [];
  let dropdownCss = "yeti-combobox-options";

  for (let i=0; i <  this.options.length; i++) {

      let matchingOption = this.options[i];

      if (matchingOption.label.includes(this.textInput)) {
          matchingOptions.push(matchingOption);
      }

  }

  // At this point matchingOptions contains an array of all options that match the text the user typed, and each option is of type YetiComboboxOption

  if (matchingOptions.length <= 0) {
      this.isOpen = false;
      dropdownCss += "yeti-combobox-options";
  } else {
      this.isOpen = true;
  }

  return <ul class={dropdownCss}>
      this.renderDropdownOptions(matchingOptions);
  </ul>
}



renderDropdownOptions(matchingOptions: YetiComboboxOption) {
  // Given an array of options that match user input, return JSX for each one.
  let jsxItems = [];

  for (let i=0; i < this.options.length; i++) {
      // Convert each option in matchingOptions to JSX
      let match = matchingOptions[i];

      jsxItems.push(
          this.renderDropdownOption(match)
      )

  }

  // jsxItems is now an array of lis that correspond to only matching options

  return jsxItems;
}



renderDropdownOption(match: YetiComboboxOption) {
  return <li class="yeti-combobox-dropdown-options">{match.label}</li>;
}



  render() {

    let cssClasses = 'yeti-combobox';
    let flyoutClass = 'yeti-combobox-flyout';

    if (this.cssClass != '') {
      cssClasses += ' ' + this.cssClass;
    }

    if (this.isValid == false) {
      cssClasses += ' yeti-combobox__error';
    }

    flyoutClass += (this.isOpen) ? " yeti-combobox-flyout__open" : "";

    if (this.menuAlignment == "right") {
      flyoutClass += ' yeti-combobox-flyout-align-right'
    }



    return ([
      <div class="yeti-combobox-wrapper">

      

        <select
          tabIndex={-1}
          class="yeti-combobox-actual yeti-a11y-hidden"
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

          
<input type="text" class="yeti-combobox-placeholder" title={this.getPlaceholderDisplay()} placeholder={this.getPlaceholderDisplay()}
      onKeyUp={(eventObject) => {
        this.handleTextKeyUp(eventObject);
      
      }}
      />
         

          { (this.showClear && this.numSelections > 0) ? 

            (<button class="yeti-combobox-puck" title="Clear all selections" onClick={ (ev) => { this.handleClearSelections(ev); ev.preventDefault() }}>
              <span class="material-icons yeti-combobox-puck-icon" aria-hidden="true">cancel</span>
            </button>)

          :

            ""

          }

        </div>

        
        <div class={flyoutClass} aria-hidden="true">
        
          <ul
            class="yeti-combobox-options"
            id={this.facadeId}
          >

            {this.options.map((option, i) => {

                let optionClass = (this.cursorPosition == i) ? "yeti-combobox-option yeti-combobox-option__hover" : "yeti-combobox-option";
                
          
              
                return (

                  
                  <li id={option.id} key={option.id}>
                    <button class={optionClass} tabIndex={-1} onClick={(ev) => { this.handleOptionClick(i); ev.preventDefault(); }}>
                     
                      <span class="yeti-combobox-option-label">{option.label}</span>
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