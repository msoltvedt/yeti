import { Component, Prop, h, State, Event, EventEmitter, Listen, Watch, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-input',
  shadow: false,
})
export class YetiInput {

  @Element() el: HTMLElement;

  @Listen('keyup')
  handleKeyUp(ev) {
    this.isTouched = true;
    this.inputValue = ev.target.value;
    this.readyToVerifyFast.emit(ev);
  }

  @Event() readyToVerifySlow: EventEmitter<CustomEvent>;

  @Event() readyToVerifyFast: EventEmitter<CustomEvent>;

  @Event() inputValueChanged: EventEmitter<CustomEvent>;

  @Prop() inputClass: string = '';

  @Prop() inputId: string = utils.generateUniqueId();

  @Prop() required: boolean = false;

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  @Prop({
    mutable: true,
    reflect: true
  }) inputValue: string = '';

  @Watch('inputValue')
  handleValueChange(ev: CustomEvent) {
    this.inputValueChanged.emit(ev);
  }

  @State() isTouched: boolean = false;

  handleFieldBlur(ev) {
    this.isTouched = true;
    this.inputValue = ev.target.value;
    this.readyToVerifySlow.emit(ev);
  }

  render() {

    let cssClasses = 'yeti-input';

    if (this.inputClass != '') {
      cssClasses += ' ' + this.inputClass;
    }

    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }

    return (
      <input 
        type="text" 
        class={cssClasses} 
        id={this.inputId} 
        value={this.inputValue}
        onBlur={(ev) => this.handleFieldBlur(ev)}
        aria-invalid={!this.isValid}
      />
    );
  }

}
