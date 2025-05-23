import { Component, Prop, h, State, Event, EventEmitter, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-textarea',
  shadow: false,
})
export class YetiTextarea {

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
   * CSS classlist applied to the actual HTML textarea element.
   */
  @Prop() textareaClass: string = '';

  /**
   * CSS classlist applied to the HTML wrapper around the element and associated elements.
   */
  @Prop() wrapperClass: string = '';

  /**
   * Whether or not the textarea is disabled.
   */
  @Prop() isDisabled: boolean = false;

  /**
   * Passthrough to the textarea's autocomplete attribute.
   */
  @Prop() autocomplete: string = '';

  /**
   * id applied to the actual HTML textarea element.
   */
  @Prop() textareaId: string = utils.generateUniqueId();

  /**
   * name applied to the actual HTML textarea element. Defaults to match id.
   */
  @Prop() textareaName: string = this.textareaId;

  /**
   * Optional attribute to set the maxlength of the field
   */
  @Prop({ attribute: "textarea-maxlength"}) maxlength?: number = 100000;

  /**
   * Whether the field is required to have a valid value or not.
   */
  @Prop() required: boolean = false;

  /**
   * Tracks whether the textarea's current value is valid or not.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean = true;

  /**
   * The actual value of the textarea field.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  /**
   * The tabindex of the textarea field.
   */
  @Prop({
    mutable: true,
    reflect: true,
  }) textareaTabindex: string = '';

  /**
   * id of an outside HTML element pointed to by the actual textarea element's aria-labeledby attribute.
   */
  @Prop() labeledBy?: string = "";

  /**
   * id of an outside HTML element pointed to by the actual textarea element's aria-describedby attribute.
   */
  @Prop() describedBy?: string = "";

  /**
   * Text description of what the textarea is or does
   */
  @Prop() description?: string = "";

  /**
   * Id of an HTML element that represents the character counter
   */
  @Prop() characterCounterId?: string = "";

  /**
   * Whether the user has focused and left (i.e. interacted with) the actual textarea element.
   */
  @State() isTouched: boolean = false;

  /**
   * How many characters long the textarea's value is.
   */
  @State() length: number = 0;

  
  private usesCharacterCounter: boolean = false;
  private characterCounter: HTMLElement; // A reference to the actual HTML element that represents the character counter.

  

  handleKeyDown() {
    // Any validation of a keystroke would go here.
  }
  


  handleKeyUp(ev) {
    this.isTouched = true;
    this.value = ev.target.value;
    this.length = this.value.length;
    this.conformValueToMaxlength();
    this.readyToVerifyFast.emit({
      "originalEvent": ev,
      "yetiTextarea": this.el,
      "value": ev.target.value
    });

    if (this.usesCharacterCounter) {
      this.updateCharacterCounter();
    }
  }



  handleFieldBlur(ev) {
    ev.stopImmediatePropagation();
    this.isTouched = true;
    this.value = ev.target.value;
    this.readyToVerifySlow.emit({
      "originalEvent": ev,
      "yetiTextarea": this.el,
      "value": ev.target.value
    });
  }



  conformValueToMaxlength() {
    // If the value is longer than maxlength we need to truncate it.
    if (this.value.length > this.maxlength) {
      this.value = this.value.substring(0, this.maxlength);
      this.length = this.maxlength;
    }
  }



  updateCharacterCounter() {

    if (this.usesCharacterCounter) {
      this.characterCounter.innerHTML = `${this.maxlength - this.length}/${this.maxlength} <span class='yeti-a11y-hidden'>characters remaining</span>`;
    }
  }



  componentWillLoad() {
    this.length = this.value.length;
    this.conformValueToMaxlength();
  }



  componentDidLoad() {
    // Verify value is within bounds initially
    this.conformValueToMaxlength();

    // Initialize private variables
    try {
      if (this.characterCounterId != "") {
        // User supplied an id for the character counter. Use it if it points to an actual HTML element.
        this.characterCounter = document.getElementById(this.characterCounterId) as HTMLElement;
        this.usesCharacterCounter = true;
        this.updateCharacterCounter();
        this.describedBy += ` ${this.characterCounterId}`;
      }
    } catch(error) {
      console.warn(`Yeti Textarea was unable to set a character counter element with the supplied id of ${this.characterCounterId}.`, error);
    }

  }



  render() {

    let cssClasses = 'yeti-textarea';
    let wrapperClasses = 'yeti-textarea-wrapper';

    if (this.textareaClass != '') {
      cssClasses += ' ' + this.textareaClass;
    }

    if (this.wrapperClass != '') {
      wrapperClasses += ' ' + this.wrapperClass;
    }

    if (this.isValid == false) {
      cssClasses += ' yeti-textarea__error';
    }

    return (
      <div class={wrapperClasses}>
        <textarea 
          class={cssClasses} 
          id={this.textareaId}
          name={this.textareaName}
          value={this.value}
          onKeyDown={() => this.handleKeyDown()}
          onKeyUp={(ev) => this.handleKeyUp(ev)}
          onBlur={(ev) => this.handleFieldBlur(ev)}
          aria-invalid={!this.isValid} 
          {...((this.isDisabled) ? {"disabled": this.isDisabled} : {})}
          {...((this.autocomplete != "") ? {"autocomplete": this.autocomplete} : {})}
          {...((this.textareaTabindex != "") ? {"tabindex": this.textareaTabindex} : {})}
          {...((this.labeledBy != "") ? {"aria-labelledby": this.labeledBy} : {})}
          {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
          {...((this.description != "") ? {"aria-description": this.description} : {})}
          {...((this.maxlength != 100000) ? {"maxlength": this.maxlength} : {})}>

          {this.value}
        
        </textarea>
      </div>
    );
  }

}
