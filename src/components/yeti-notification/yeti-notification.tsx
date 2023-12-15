import { Component, Prop, h, State, Element, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-notification',
  shadow: false,
})
export class YetiTooltip {

  @Element() el: HTMLElement;


  /**
   * CSS classlist to add to the element serving as the component's wrapper.
   */
  @Prop({ attribute: 'wrapper-class'}) wrapperCSS: string = '';

  /**
   * Text value to display as the notification's title.
   */
  @Prop() textTitle: string = "Mmmm Toast!";

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
   * Whether the tooltip has been clicked open or not.
   */
  @State() isClickedOpen: boolean = false;



  @Listen('click', {
    target: 'body'
  })
  handleDeFocusingClick() {
    this.isClickedOpen = false;
  }



  handleCloseClick(e) {
    this.isClickedOpen = false;
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

    let wrapperCSS = 'yeti-notification-wrapper-error';
  

    return ([
      <div class={wrapperCSS}>

        <div class="yeti-notification-container">
          
          <div class="yeti-flex">
            <yeti-icon iconCode="error" iconCSS='yeti-color-red yeti-typo-size-5 yeti-margin-right-2'></yeti-icon>
          </div>

          <div class="yeti-notification-content-wrapper">
          
            <div class="yeti-notification-content-title" id={this.notificationId}>{this.textTitle}</div>
            <div class="yeti-notification-content" id={this.notificationId}>

              <slot />

            </div>

          </div>
          
          <button class="yeti-notification-close" onClick={(e) => { this.handleCloseClick(e); }}>
            <yeti-icon iconCode="close" iconCSS='yeti-color-white yeti-typo-size-4'></yeti-icon>
          </button>

        </div>

      </div>
    ]);
  }



  componentDidRender() {
    let slot = this.el.querySelector(".yeti-notification-trigger").firstElementChild;
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-describedby",this.notificationId);
  }

}
