import { Component, Prop, h, State, Watch, Listen, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-field',
  shadow: false,
})

export class YetiField {

  @Element() el: HTMLElement;

  /**
   * id that will be assigned to the actual input element. A unique one will be assigned if one is not provided.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) inputId: string = utils.generateUniqueId();

  /**
   * name that will be assigned to the actual input element. id will be assigned if one is not provided.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) inputName: string = this.inputId;

  /**
   * type that will be assigned to the actual input element.
   */
  @Prop() type: string = "text";

  /**
   * maximum length for the field.
   */
  @Prop() inputMaxlength?: number = 0;
  
  /**
   * Mandatory value for the label of the field.
   */
  @Prop() label: string="";
  

  /**
   * Value for the optional input tip that appears at the bottom of the field.
   */
  @Prop() tip: string = "";

  /**
   * Position of the input tip relative to the rest of the field's contents. Defaults to "below", can also be "above".
   */
  @Prop() tipPosition?: string = "below";

  /**
   * Whether the field is required to have a valid value by the greater form.
   */
  @Prop() required?: boolean = false;

  /**
   * Whether to indicate the field is required by showing a default icon.
   */
  @Prop() indicateRequired?: boolean = false;

  /**
   * Error message that appears when the field is invalid. Can be updated at any time.
   */
  @Prop({mutable: true}) errorMessage: string = 'Error: please correct this field.'

  /**
   * Whether the input is currently valid or invalid.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean = true;
  @Watch('isValid')
  updateSlottedContentForErrorState(newValue: string) {

    if (!this.hasSlottedField) {
      return; // We don't need to do anything here unless the form element comes via slotted content.
    }

    let element = this.el.querySelector(`#${this.inputId}`);

    if (element) {

      if (newValue) {
        element.classList.add("yeti-input__error");
      } else {
        element.classList.remove("yeti-input__error");
      }

    }
  }

  /**
   * Default value of the field's input.
   */
  @Prop() defaultValue: string = '';

  /**
   * Determines whether the field should attempt to validate itself or merely pass through any readyToVerify events from its input.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) autovalidate: boolean = true;

  /**
   * Determines whether the field uses block (default) or inline labels.
   */
  @Prop() isInline: boolean = false;

  /**
   * Additional user-supplied CSS classes to apply to the Field's wrapper.
   */
  @Prop() wrapperClass?: string = "";

  /**
   * Additional user-supplied CSS classes to apply to the input.
   */
  @Prop() inputClass?: string = "";

  /**
   * Additional user-supplied CSS classes to apply to the input's wrapper.
   */
  @Prop() inputWrapperClass?: string = "";

  /**
   * Tracks whether the field's input has been focused and then blurred (i.e. if the user has interacted with it yet).
   */
  @State() isDirty: boolean = false;
  
  @Listen('readyToVerifySlow', { capture: true })
  handleReadyToVerifySlow(ev) {

    let childControl = ev.target;

    if (this.autovalidate == false) {
      return;
    }

   
    if (this.required) {

      // Autoverification is on, this field is required, and the child component just notified us that it's ready for verification.

      // First, regardless of whether it's an input or date-picker, it can't be empty.
      if (childControl.value == "") {

        this.errorMessage = (this.errorMessage != "") ? this.errorMessage : `${this.label} field is required.`
        this.isValid = false;
        return;

      }
      
    } else if (childControl.nodeName.toLowerCase() == "yeti-date-picker") {

      // Second, if it's a non-empty date-picker, see if it's a valid date.

      if (!childControl.isValid) {

        // The date-picker already validates itself. We just need to check its status.
        this.errorMessage = 'Enter the date in mm/dd/yyyy format.'
        this.isValid = false;
        return;

      }
    }

    this.isValid = true;

  }


  tipId = utils.generateUniqueId();
  errorId = utils.generateUniqueId();
  hasSlottedField: boolean = false;
  hasSlottedRequired: boolean = false;
  hasSlottedLabel: boolean = false;



  componentWillLoad() {
    
    let potentiallySlottedElement = this.el.querySelector('[slot="element"]');
    let potentiallySlottedRequired = this.el.querySelector('[slot="required"]');
    let potentiallySlottedLabel = this.el.querySelector('[slot="label"]');
    let describedBy = (this.tip != "") ? `${this.tipId} ` : ``;
    describedBy += (this.errorMessage != "" && !this.isValid) ? `${this.errorId}` : ``;

    // Handle Required
    if (potentiallySlottedRequired) {

      this.hasSlottedRequired = true;

    }

     // Handle label
     if (potentiallySlottedLabel) {

      this.hasSlottedLabel = true;

    }

    // Handle Element
    if (potentiallySlottedElement) {

      this.hasSlottedField = true;
      this.autovalidate = false; // We can't autovalidate a slotted element provided by the user

      // See if the slotted element has an id
      if (potentiallySlottedElement.id) {
        this.inputId = potentiallySlottedElement.id; // It does, so replace the auto-generated default with the user-provided one.
      } else {
        potentiallySlottedElement.id = this.inputId; // It doesn't, so assign the auto-generated default one.
      }

      // See if the slotted element has a name
      if (potentiallySlottedElement.hasAttribute("name")) {
        this.inputName = potentiallySlottedElement.getAttribute("name"); // It does, so replace the auto-generated default with the user-provided one.
      } else {
        potentiallySlottedElement.setAttribute("name", this.inputName);  // It doesn't, so assign the auto-generated default one.
      }

      // Connect the slotted element to the tip and/or error message
      if (describedBy != "") {
        potentiallySlottedElement.setAttribute("aria-describedby", describedBy);
      }

      // Add the error class if necessary
      if (!this.isValid) {
        potentiallySlottedElement.classList.add("yeti-input__error");
      }

    }
    
  }



  renderRequiredIndicator() {

    if (!this.required) {
      return null;
    }
    

    if (this.required && this.indicateRequired) {

      // Use the slotted required content if it exists
      if (this.hasSlottedRequired) {
        return <slot name="required"></slot>;
      }

      // Otherwise use the Yeti Required Symbol
      else {
        return <span class="yeti-form-label-required-wrapper">
          <yeti-required-symbol></yeti-required-symbol>
        </span>;
      }

    }

  }



  render() {

    let cssClass = "yeti-form-field";
    cssClass += (this.wrapperClass != "") ? ` ${this.wrapperClass}` : '';


    let tipClass = `yeti-form-tip`;
    tipClass += (this.tipPosition == "above") ? ` yeti-form-tip-above` : ``;

    let describedBy = (this.tip != "") ? `${this.tipId} ` : ``;
    describedBy += (this.errorMessage != "" && !this.isValid) ? `${this.errorId}` : ``;

    if (this.isInline) {
      cssClass += " yeti-form-field-inline";
    }

    return (
      <div class={cssClass}>

        <label htmlFor={this.inputId} class="yeti-form-label">
          {(this.hasSlottedLabel) ? <slot name="label"></slot> : `${this.label}`}
          {(this.indicateRequired) ? 
           (this.hasSlottedRequired ? <slot name="required"></slot> : <yeti-required-symbol></yeti-required-symbol>)
           : null}
        </label>

        {(!this.hasSlottedField) ?

            (this.type == "date") ?

              <yeti-date-picker
                input-id={this.inputId}
                input-name={this.inputName}
                value={this.defaultValue}
                required={this.required}
                is-valid={this.isValid}
                described-by={describedBy}
              ></yeti-date-picker>

            :
          
              <yeti-input 
                inputId={this.inputId} 
                // input-class={!this.isValid ? 'yeti-input__error' : null}
                value={this.defaultValue} 
                required={this.required}
                isValid={this.isValid}
                describedBy={describedBy}
                inputName={this.inputName}
                {...((this.inputClass != "") ? {"input-class": this.inputClass} : {})}
                {...((this.inputWrapperClass != "") ? {"wrapper-class": this.inputWrapperClass} : {})}
                {...((this.inputMaxlength != 0) ? {"input-maxlength": this.inputMaxlength} : {})}
              ></yeti-input>

        :

          <slot name="element"></slot>

        }

        
        {
          (this.tip != "") ?

            <span class={tipClass} aria-live="polite" id={this.tipId}>{this.tip}</span>

          :
            ""
        }
        
        
        {
          (this.errorMessage != "" && !this.isValid) ?

            <span class="yeti-form-field-error" aria-live="polite" id={this.errorId}>{this.errorMessage}</span>

          :
            ""
        }
        
      </div>
    );
  }

}
