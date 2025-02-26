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
  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter;

  /**
   * Event that fires when the user enters or changes the contents of the input field.
   */
  @Event({ bubbles: true }) readyToVerifyFast: EventEmitter;

  /**
   * Event that fires when the field is a search field and the user hits the clear button within it.
   */
  @Event({ bubbles: true }) searchFieldClear: EventEmitter;

  /**
   * CSS classlist applied to the actual HTML input element.
   */
  @Prop() inputClass: string = '';

  /**
   * CSS classlist applied to the HTML wrapper around the element and associated elements.
   */
  @Prop() wrapperClass: string = '';

  /**
   * Whether or not the input is disabled.
   */
  @Prop() isDisabled: boolean = false;

  /**
   * Passthrough to the input's autocomplete attribute.
   */
  @Prop() autocomplete: string = '';

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
  }) isValid: boolean = true;

  /**
   * The actual value of the input field.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  /**
   * The tabindex of the input field.
   */
  @Prop({
    mutable: true,
    reflect: true,
  }) inputTabindex: string = '';

  /**
   * id of an outside HTML element pointed to by the actual input element's aria-labeledby attribute.
   */
  @Prop() labeledBy?: string = "";

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
   * id of an outside HTML element controlled by the input
   */
  @Prop() controls?: string = "";

  /**
   * Whether the user has focused and left (i.e. interacted with) the actual input element.
   */
  @State() isTouched: boolean = false;

  

  handleKeyUp(ev) {
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifyFast.emit({
      "originalEvent": ev,
      "yetiInput": this.el,
      "value": ev.target.value
    });
  }



  handleClearClick(ev) {
    this.value = "";
    (this.el.querySelector(".yeti-input") as HTMLInputElement).focus();
    ev.preventDefault();
    this.searchFieldClear.emit({
      "originalEvent": ev,
      "yetiInput": this.el,
      "value": ev.target.value
    });
    return false;
  }



  handleFieldBlur(ev) {
    ev.stopImmediatePropagation();
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifySlow.emit({
      "originalEvent": ev,
      "yetiInput": this.el,
      "value": ev.target.value
    });
  }



  render() {

    let cssClasses = 'yeti-input';
    let wrapperClasses = 'yeti-input-wrapper';
    let clearButtonClass = (this.value != "" && !this.isDisabled) ? 'yeti-input-clear' : 'yeti-input-clear yeti-input-clear__inert';

    if (this.inputClass != '') {
      cssClasses += ' ' + this.inputClass;
    }

    if (this.wrapperClass != '') {
      wrapperClasses += ' ' + this.wrapperClass;
    }

    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }

    return (
      <div class={wrapperClasses}>

        <input 
          type={this.type} 
          class={cssClasses} 
          id={this.inputId}
          name={this.inputName}
          value={this.value}
          onKeyUp={(ev) => this.handleKeyUp(ev)}
          onBlur={(ev) => this.handleFieldBlur(ev)}
          aria-invalid={!this.isValid}
          {...((this.isDisabled) ? {"disabled": this.isDisabled} : {})}
          {...((this.autocomplete != "") ? {"autocomplete": this.autocomplete} : {})}
          {...((this.inputTabindex != "") ? {"tabindex": this.inputTabindex} : {})}
          {...((this.labeledBy != "") ? {"aria-labelledby": this.labeledBy} : {})}
          {...((this.controls != "") ? {"aria-controls": this.controls} : {})}
          {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
          {...((this.description != "") ? {"aria-description": this.description} : {})}
          {...((this.placeholder != "") ? {"placeholder": this.placeholder} : {})}
          {...((this.maxlength != 0) ? {"maxlength": this.maxlength} : {})}
        />


        {(this.type == "search") ?
            
            <button class={clearButtonClass} onClick={(ev) => this.handleClearClick(ev)}>
              <span class="material-icons yeti-size-4 yeti-typo-size-4" aria-hidden="true">close</span>
              <span class="yeti-a11y-hidden">Clear search input</span>
            </button>
            
          :
            ""
        }
        

      </div>
    );
  }

}
