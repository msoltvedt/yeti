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

  /**
   * Event that fires when the user leaves (blurs) the input field.
   */
  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  /**
   * Event that fires when the user enters or changes the contents of the input field.
   */
  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter<CustomEvent>;

  /**
   * CSS classlist applied to the actual HTML input element.
   */
  @Prop() inputClass: string = '';

  /**
   * id applied to the actual HTML input element.
   */
  @Prop() inputId: string = utils.generateUniqueId();

  /**
   * name applied to the actual HTML input element. Defaults to match id.
   */
  @Prop() inputName: string = this.inputId;

  /**
   * Whether the field is required to have a valid value or not.
   */
  @Prop() required: boolean = false;

  /**
   * Tracks whether the input's current value is valid or not.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  /**
   * The actual value of the input field.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  /**
   * id of an outside HTML element pointed to by the actual input element's aria-describedby attribute.
   */
  @Prop() describedBy: string = "";

  /**
   * Whether the user has focused and left (i.e. interacted with) the actual input element.
   */
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
