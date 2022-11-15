import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'yeti-input',
  shadow: false,
})
export class YetiInput {

  @Prop() htmlId: string = 'id1';
  
  @Prop() label: string;

  @Prop() inputTip: string;

  @Prop() required: boolean = false;

  @Prop({mutable: true}) value: string = '';

  @State() isDirty: boolean = false;

  handleFieldFocus(e) {
    e.target.classList.add('focused');
  };

  handleFieldBlur(e) {
    this.isDirty = true;
    e.target.classList.remove('focused');
    this.value = e.target.value;
  }

  render() {
    return (
      <div class="wrapper">

        <label htmlFor={this.htmlId} class="label">{this.label}{this.required ? ' (required)' : null}</label>

        <input type="text" class="field" id={this.htmlId} value={this.value} onFocus={(e) => this.handleFieldFocus(e)} onBlur={(e) => this.handleFieldBlur(e)} />

        {
          (this.isDirty && this.required && !this.value)
          ? <span class="error">Please enter a value.</span>
          : null
        }
        
        {
          this.inputTip 
          ? <span class="input_tip">{this.inputTip}</span> 
          : null
        }
        
      </div>
    );
  }

}
