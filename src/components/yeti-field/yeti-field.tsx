import { Component, Prop, h, State, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-field',
  shadow: false,
})
export class YetiField {

  @Prop() inputId: string = utils.generateUniqueId();
  
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

  @Prop() errorMessage: string = 'Error: please correct this field.'

  @Prop({mutable: true}) value: string = '';

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean = true;

  @Prop({
    mutable: true,
    reflect: true
  }) inputValue: string = '';

  @State() isDirty: boolean = false;

  @Listen('inputValueChanged')
  handleInputValueChanged(ev: CustomEvent) {
    let yetiInput = ev.target as HTMLInputElement;
    let actualInput = yetiInput.querySelector('input');
    this.inputValue = actualInput.value;
  }

  handleFieldFocus(e) {
    e.target.classList.add('focused');
  };

  handleFieldBlur(e) {
    this.isDirty = true;
    e.target.classList.remove('focused');
    this.value = e.target.value;
  }

  handleInputChange(e: Event) {
    alert('Input changed!');
    this.inputValue = (e.target as HTMLInputElement).value;
  }

  render() {

    this.validateLabel(this.label);

    return (
      <div class="yeti-form-field">

        <label htmlFor={this.inputId} class="yeti-form-label">{this.label}{this.required ? ' (required)' : null}</label>

        {/* <input type="text" class="yeti-input" id={this.inputId} value={this.value} onFocus={(e) => this.handleFieldFocus(e)} onBlur={(e) => this.handleFieldBlur(e)} /> */}

        <yeti-input input-id={this.inputId} input-class={!this.isValid ? 'yeti-input__error' : null} input-value={this.inputValue}></yeti-input>
        
        {
          this.tip || !this.isValid
          ? <span class="yeti-form-tip">{

              !this.isValid
              ? this.errorMessage
              : 
                this.tip
                ? this.tip
                : null

            }</span> 
          : null
        }
        
      </div>
    );
  }

}
