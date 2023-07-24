import { Component, Prop, h, State, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-field',
  shadow: false,
})
export class YetiField {

  /**
   * id that will be assigned to the actual input element. A unique one will be assigned if one is not provided.
   */
  @Prop() inputId: string = utils.generateUniqueId();

  /**
   * name that will be assigned to the actual input element. id will be assigned if one is not provided.
   */
  @Prop() inputName: string = this.inputId;

  /**
   * type that will be assigned to the actual input element.
   */
  @Prop() type: string = "text";

  /**
   * CSS classlist that will be assigned to the containing field element (probably a div).
   */
  @Prop() fieldClass: string = "";
  
  /**
   * Mandatory value for the label of the field.
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: string) {
    // Label must have a non-empty value.
    const isInvalid = typeof newValue !== 'string' || newValue === '';
    if (isInvalid) {
      throw new Error('yeti-field must have a non-empty label attribute');
    }
  }

  /**
   * Value for the optional input tip that appears at the bottom of the field.
   */
  @Prop() tip: string;

  /**
   * Whether the field is required to have a valid value by the greater form.
   */
  @Prop() required: boolean = false;

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

  /**
   * Default value of the field's input.
   */
  @Prop() defaultValue: string = '';

  /**
   * Determines whether the field should attempt to validate itself or merely pass through any readyToVerify events from its input.
   */
  @Prop() autovalidate: boolean = true;

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

        this.errorMessage = `${this.label} field is required.`
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



  render() {

    let cssClass = "yeti-form-field";

    this.validateLabel(this.label);

    if (this.fieldClass != "") {
      cssClass ="yeti-form-field " + this.fieldClass;
    }

    return (
      <div class={cssClass}>

        <label htmlFor={this.inputId} class="yeti-form-label">{this.label}{this.required ? ' (required)' : null}</label>

        { 
          (this.type == "date") ?

            <yeti-date-picker
              input-id={this.inputId}
              input-name={this.inputName}
              value={this.defaultValue}
              required={this.required}
              is-valid={this.isValid}
              described-by={this.tipId}
            ></yeti-date-picker>

          :
        
            <yeti-input 
              input-id={this.inputId} 
              input-class={!this.isValid ? 'yeti-input__error' : null} 
              value={this.defaultValue} 
              required={this.required}
              is-valid={this.isValid}
              described-by={this.tipId}
            ></yeti-input>
        }
        
        <span class="yeti-form-tip" aria-live="polite" id={this.tipId}>{

              !this.isValid
              ? this.errorMessage
              : 
                this.tip
                ? this.tip
                : null

        }</span>
        
      </div>
    );
  }

}
