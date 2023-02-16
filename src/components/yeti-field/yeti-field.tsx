import { Component, Prop, h, State, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-field',
  shadow: false,
})
export class YetiField {

  @Prop() inputId: string = utils.generateUniqueId();

  @Prop() inputName: string = this.inputId;

  @Prop() type: string = "text";

  @Prop() fieldClass: string = "";
  
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: string) {
    // Label must have a non-empty value.
    const isInvalid = typeof newValue !== 'string' || newValue === '';
    if (isInvalid) {
      throw new Error('yeti-field must have a non-empty label attribute');
    }
  }

  @Prop() tip: string;

  @Prop() required: boolean = false;

  @Prop({mutable: true}) errorMessage: string = 'Error: please correct this field.'

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean = true;

  @Prop() defaultValue: string = '';

  @Prop() autovalidate: boolean = true;

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
