import { Component, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-notification',
  shadow: false,
})
export class YetiNotification {

  @Element() el: HTMLElement;

  /**
   * Fires when the user clicks the action button.
   */
  @Event({ bubbles: true }) notificationActionClick: EventEmitter;


  /**
   * CSS classlist to add to the element serving as the component's wrapper.
   */
  @Prop() wrapperClass: string = '';

  /**
   * The type of notification: error (default) | info | success | warning | warningAlt.
   */
  @Prop() notificationType: string = "";

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
   * Text value to display as the notification's title.
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
  }) notificationId: string = ""; // Set on load

  /**
   * Toggle to force a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = false;

  /**
   * Whether the notification is visible or not.
   */
  @Prop() isVisible: boolean = true;



  handleCloseClick(e) {
    this.isVisible = false;
    e.stopImmediatePropagation();
    e.preventDefault();
  }



  handleActionClick(e) {
    this.notificationActionClick.emit();
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

    this.notificationId = (this.notificationId != "") ? this.notificationId : `${componentId}_tip`;
    this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
  }


  render() {

    let altText = this.iconAltText;
    let iconCode = this.iconCode;
    let wrapperClass = 'yeti-notification';
    wrapperClass += (this.size == 'full') ? ' yeti-notification_full' : '';
    wrapperClass += (this.wrapperClass !== '') ? ` ${this.wrapperClass}` : ``;

    // Set type-based CSS class
    switch (this.notificationType) {

      case "error":

        wrapperClass += ' yeti-notification-error';
        altText = (altText != '') ? altText : 'Error';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

      case "info":

        wrapperClass += ' yeti-notification-info';
        altText = (altText != '') ? altText : 'Information';
        iconCode = (iconCode != '') ? iconCode : 'info';
        break;

      case "success":

        wrapperClass += ' yeti-notification-success';
        altText = (altText != '') ? altText : 'Success';
        iconCode = (iconCode != '') ? iconCode : 'check_circle';
        break;

      case "warning":

        wrapperClass += ' yeti-notification-warning';
        altText = (altText != '') ? altText : 'Warning';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

      case "warningAlt":

        wrapperClass += ' yeti-notification-warning_alt';
        altText = (altText != '') ? altText : 'Warning';
        iconCode = (iconCode != '') ? iconCode : 'warning';
        break;

      case "":
      default:
        altText = (altText != '') ? altText : 'Error';
        iconCode = (iconCode != '') ? iconCode : 'error';
        break;

    }
    

    // Set high-contrast mode
    wrapperClass += (this.isHighContrast) ? ' yeti-notification-high_contrast' : '';


    // Set visibility
    wrapperClass += (this.isVisible) ? '' : ' yeti-notification__hidden';
  

    return (
      <div class={wrapperClass} id={this.notificationId} role="status">

        <div class="yeti-notification-icon">
          
          <span class="material-icons" aria-hidden="true">{iconCode}</span>
          <span class="yeti-a11y-hidden">{altText}</span>

        </div>


        <div class="yeti-notification-content">
        
          {
            (this.textTitle != "") ?
              <div class="yeti-notification-content-title">{this.textTitle}</div>
            :
              ''
          }
          <div class="yeti-notification-content-subtitle">

            <slot />

          </div>

        </div>

        {
          (this.actionLabel != "") ?

            <button class="yeti-notification-action" onClick={(e) => this.handleActionClick(e)}>
              {this.actionLabel}
            </button>
          :
            ""
        }

        {
          (this.showCloseButton) ?

            <button class="yeti-notification-close" onClick={(e) => this.handleCloseClick(e)}>
              <span class="material-icons">close</span>
            </button>
          :
            ""
        }

      </div>
    );
  }

}