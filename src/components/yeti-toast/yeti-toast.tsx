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
  @Prop() actualClass: string = '';

  /**
   * The type of toast: error (default) | info | success | warning | warningAlt.
   */
  @Prop() toastType: string = "";

  /**
   * Whether to use the high-contrast variant or not.
   */
  @Prop() isHighContrast: boolean = false;

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
   * Whether the toast is closed or not.
   */
  @Prop() isClosed: boolean = false;



  handleCloseClick(e) {

    e.stopImmediatePropagation();
    e.preventDefault();
    this.isClosed = true;

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
        this.isClosed = true;
      }, this.closesSelfAfter);
    }

  }


  render() {

    let altText = this.iconAltText;
    let iconCode = this.iconCode;
    let wrapperClass = 'yeti-toast-wrapper';
    let actualClass = 'yeti-toast';
    actualClass += (this.size == 'full') ? ' yeti-toast_full' : '';
    actualClass += (this.actualClass !== '') ? ` ${this.actualClass}` : ``;

    wrapperClass += (this.isClosed) ? ' yeti-toast-wrapper__closed' : '';

    // Set type-based CSS class
    switch (this.toastType) {

      case "error":

        actualClass += ' yeti-toast-error';
        altText = (altText != '') ? altText : 'Error';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

      case "info":

        actualClass += ' yeti-toast-info';
        altText = (altText != '') ? altText : 'Information';
        iconCode = (iconCode != '') ? iconCode : 'info';
        break;

      case "success":

        actualClass += ' yeti-toast-success';
        altText = (altText != '') ? altText : 'Success';
        iconCode = (iconCode != '') ? iconCode : 'check_circle';
        break;

      case "warning":

        actualClass += ' yeti-toast-warning';
        altText = (altText != '') ? altText : 'Warning';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

      case "warningAlt":

        actualClass += ' yeti-toast-warning_alt';
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
    actualClass += (this.isHighContrast) ? ' yeti-toast-high_contrast' : '';
  

    return (
      <div class={wrapperClass}>

        <div class={actualClass} id={this.toastId} role="status">

          <div class="yeti-toast-icon">
            
            <span class="material-icons" aria-hidden="true">{iconCode}</span>
            <span class="yeti-a11y-hidden">{altText}</span>

          </div>


          <div class="yeti-toast-content">

            <div class="yeti-toast-content-text">
          
              {
                (this.textTitle != "") ?
                  <div class="yeti-toast-content-text-title">{this.textTitle}</div>
                :
                  ''
              }
              <div class="yeti-toast-content-text-copy">

                <slot />

              </div>

            </div>


            {
              (this.actionLabel != "") ?

                <button class="yeti-toast-action yeti-button yeti-button-tertiary yeti-button-size-xs" onClick={(e) => this.handleActionClick(e)}>
                  {this.actionLabel}
                </button>
              :
                ""
            }

          </div>

          {
            (this.showCloseButton) ?

              <button class="yeti-toast-close" onClick={(e) => this.handleCloseClick(e)}>
                <span class="material-icons">close</span>
              </button>
            :
              ""
          }

        </div>

      </div>
    );
  }

}