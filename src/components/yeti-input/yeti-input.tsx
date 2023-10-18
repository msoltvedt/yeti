import { Component, Prop, h, State, Event, EventEmitter, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-input',
  shadow: false,
})
export class YetiInput {

  @Element() el: HTMLElement;

  /**
   * Event that fires when the user leaves (blurs) the input field.
   */
  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  /**
   * Event that fires when the user enters or changes the contents of the input field.
   */
  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter<CustomEvent>;

  /**
   * Event that fires when the field is a search field and the user hits the clear button within it.
   */
  @Event({ bubbles: true }) searchFieldClear: EventEmitter<CustomEvent>;

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
   * Optional attribute to set the maxlength of the field
   */
  @Prop({ attribute: "input-maxlength"}) maxlength?: number = 0;

  /**
   * Whether the field is required to have a valid value or not.
   */
  @Prop() required: boolean = false;

  /**
   * What type of input element this is; defaults to "text".
   */
  @Prop() type?: string = "text";

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
  @Prop() describedBy?: string = "";

  /**
   * Text description of what the input is or does
   */
  @Prop() description?: string = "";

  /**
   * Standard old-school input placeholder
   */
  @Prop() placeholder?: string = "";

  /**
   * Whether the user has focused and left (i.e. interacted with) the actual input element.
   */
  @State() isTouched: boolean = false;

  

  handleKeyUp(ev) {
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifyFast.emit(ev);
  }



  handleClearClick(ev) {
    this.value = "";
    (this.el.querySelector(".yeti-input") as HTMLInputElement).focus();
    ev.preventDefault();
    this.searchFieldClear.emit(ev);
    return false;
  }



  handleFieldBlur(ev) {
    ev.stopImmediatePropagation();
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifySlow.emit(ev);
  }



  render() {

    let cssClasses = 'yeti-input';
    let clearButtonClass = (this.value != "") ? 'yeti-input-clear' : 'yeti-input-clear yeti-input-clear__inert';

    if (this.inputClass != '') {
      cssClasses += ' ' + this.inputClass;
    }

    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }

    return (
      <div class="yeti-input-wrapper">

        <input 
          type={this.type} 
          class={cssClasses} 
          id={this.inputId}
          name={this.inputName}
          value={this.value}
          onKeyUp={(ev) => this.handleKeyUp(ev)}
          onBlur={(ev) => this.handleFieldBlur(ev)}
          aria-invalid={!this.isValid}
          {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
          {...((this.description != "") ? {"aria-description": this.description} : {})}
          {...((this.placeholder != "") ? {"placeholder": this.placeholder} : {})}
          {...((this.maxlength != 0) ? {"maxlength": this.maxlength} : {})}
        />

        <button class={clearButtonClass} onClick={(ev) => this.handleClearClick(ev)}>
          <span class="material-icons yeti-size-4 yeti-typo-size-4" aria-hidden="true">close</span>
          <span class="yeti-a11y-hidden">clear</span>
        </button>
        

      </div>
    );
  }

}
