import { Component, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-toast',
  shadow: false,
})
export class YetiToast {

  @Element() el: HTMLElement;

  /**
   * Fires when the user clicks the action button.
   */
  @Event({ bubbles: true }) toastActionClick: EventEmitter;


  /**
   * CSS classlist to add to the element serving as the component's wrapper.
   */
  @Prop() wrapperClass: string = '';

  /**
   * The type of toast: error (default) | info | success | warning | warningAlt.
   */
  @Prop() toastType: string = "";

  /**
   * Whether to use the low-contrast variant or not.
   */
  @Prop() isLowContrast: boolean = false;

  /**
   * Whether to show the close button or not.
   */
  @Prop() showCloseButton: boolean = true;

  /**
   * Which icon to use (see Google Material Icons).
   */
  @Prop() iconCode: string = "";

  /**
   * The alt text for the icon.
   */
  @Prop() iconAltText: string = "";

  /**
   * Text value to display as the toast's title.
   */
  @Prop() textTitle: string = "Mmmm Toast!";

  /**
   * Optionally set a size (currently only supports default and "full")
   */
  @Prop() size: string = "";

  /**
   * Text label for the action button.
   */
  @Prop() actionLabel: string = "";

  /**
   * id of the component's slot element.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) slotId: string = ""; // Set on load

  /**
   * id of the component's actual element corresponding to the tooltip. Will be auto-populated with a unique value if not provided.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) toastId: string = ""; // Set on load

  /**
   * Time in ms before the Toast closes itself. Values of less than 1 will be ignored.
   */
  @Prop() closesSelfAfter: number = 0;

  /**
   * Toggle to force a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = false;

  /**
   * Whether the toast is visible or not.
   */
  @Prop() isVisible: boolean = true;



  handleCloseClick(e) {
    this.isVisible = false;
    e.stopImmediatePropagation();
    e.preventDefault();
  }



  handleActionClick(e) {
    this.toastActionClick.emit();
    e.stopImmediatePropagation();
    e.preventDefault();
  }



  componentWillLoad() {
    // Set up ids
    let componentId = this.el.getAttribute("id");

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }

    this.toastId = (this.toastId != "") ? this.toastId : `${componentId}_tip`;
    this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;

    if (this.closesSelfAfter > 0) {
      setTimeout(() => {
        this.isVisible = false;
      }, this.closesSelfAfter);
    }
  }


  render() {

    let altText = this.iconAltText;
    let iconCode = this.iconCode;
    let wrapperClass = 'yeti-toast';
    wrapperClass += (this.size == 'full') ? ' yeti-toast_full' : '';
    wrapperClass += (this.wrapperClass !== '') ? ` ${this.wrapperClass}` : ``;

    // Set type-based CSS class
    switch (this.toastType) {

      case "error":

        wrapperClass += ' yeti-toast-error';
        altText = (altText != '') ? altText : 'Error';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

      case "info":

        wrapperClass += ' yeti-toast-info';
        altText = (altText != '') ? altText : 'Information';
        iconCode = (iconCode != '') ? iconCode : 'info';
        break;

      case "success":

        wrapperClass += ' yeti-toast-success';
        altText = (altText != '') ? altText : 'Success';
        iconCode = (iconCode != '') ? iconCode : 'check_circle';
        break;

      case "warning":

        wrapperClass += ' yeti-toast-warning';
        altText = (altText != '') ? altText : 'Warning';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

      case "warningAlt":

        wrapperClass += ' yeti-toast-warning_alt';
        altText = (altText != '') ? altText : 'Warning';
        iconCode = (iconCode != '') ? iconCode : 'warning';
        break;

      case "":
      default:
        altText = (altText != '') ? altText : 'Error';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

    }
    

    // Set low-contrast mode
    wrapperClass += (this.isLowContrast) ? ' yeti-toast-low_contrast' : '';


    // Set visibility
    wrapperClass += (this.isVisible) ? '' : ' yeti-toast__hidden';
  

    return (
      <div class={wrapperClass} id={this.toastId} role="status">

        <div class="yeti-toast-icon">
          
          <span class="material-icons" aria-hidden="true">{iconCode}</span>
          <span class="yeti-a11y-hidden">{altText}</span>

        </div>


        <div class="yeti-toast-content">
        
          {
            (this.textTitle != "") ?
              <div class="yeti-toast-content-title">{this.textTitle}</div>
            :
              ''
          }
          <div class="yeti-toast-content-subtitle">

            <slot />

          </div>

        </div>

        {
          (this.actionLabel != "") ?

            <button class="yeti-toast-action" onClick={(e) => this.handleActionClick(e)}>
              {this.actionLabel}
            </button>
          :
            ""
        }

        {
          (this.showCloseButton) ?

            <button class="yeti-toast-close" onClick={(e) => this.handleCloseClick(e)}>
              <span class="material-icons">close</span>
            </button>
          :
            ""
        }

      </div>
    );
  }

}