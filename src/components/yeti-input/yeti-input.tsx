import { Component, Prop, h, State, Event, EventEmitter, Listen, Element } from '@stencil/core';
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
    this.value = ev.target.value;
    this.readyToVerifyFast.emit(ev);
  }

  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter<CustomEvent>;

  @Prop() inputClass: string = '';

  @Prop() inputId: string = utils.generateUniqueId();

  @Prop() inputName: string = this.inputId;

  @Prop() required: boolean = false;

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  @Prop() describedBy: string = "";

  @State() isTouched: boolean = false;

  handleFieldBlur(ev) {
    this.isTouched = true;
    this.value = ev.target.value;
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
        name={this.inputName}
        value={this.value}
        onBlur={(ev) => this.handleFieldBlur(ev)}
        aria-invalid={!this.isValid}
        {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
      />
    );
  }

}
