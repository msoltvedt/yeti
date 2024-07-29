import { Component, Prop, h, State, Element, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';
@Component({
  tag: 'yeti-titletip',
  shadow: false,
})
export class YetiTitleTip {

  @Element() el: HTMLElement;

  /**
   * CSS classlist to add to the element serving as the component's wrapper.
   */
  @Prop() wrapperClass: string = '';

  /**
   * CSS classlist to add to the actual titletip element.
   */
  @Prop() titletipClass: string = '';

  /**
   * Text value to display as the titletip's contents.
   */
  @Prop() text: string = "I'm a helpful titletip.";

  /**
   * Token list to describe the titletip's position relative to its anchor: left | right and/or above | below.
   */
  @Prop() position: string = "above";

  /**
   * Boolean value that sets whether the titletip opens on hover/focus (default) or on click.
   */
  @Prop() clickToOpen: boolean = false;

  /**
   * id of the component's slot element.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) slotId: string = ""; // Set on load

  /**
   * id of the component's actual element corresponding to the titletip. Will be auto-populated with a unique value if not provided.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) tipId: string = ""; // Set on load

  /**
   * Whether the anchor should be forced to be a CSS display block style or left as is.
   */
  @Prop() blockAnchor: boolean = false;

  /**
   * Whether the titletip should remain open permanently.
   */
  @Prop() forceOpen: boolean = false;

  /**
   * Toggle to force a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = false;

  /**
   * Whether the titletip has been clicked open or not.
   */
  @State() isClickedOpen: boolean = false;

  justClickedClosed: boolean = false;


  @Listen('mouseover')
  handleSlotHover() {
    if (!this.clickToOpen) {
      this.scrollTitletipIntoView();
    }
  }



  @Listen('focusin')
  handleSlotFocus() {
    if (!this.clickToOpen) {
      this.scrollTitletipIntoView();
    }
  }



  scrollTitletipIntoView() {
    let actual = this.el.querySelector(".yeti-titletip");
    actual.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }



  componentWillLoad() {
    // Set up ids
    let componentId = this.el.getAttribute("id");

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }

    this.tipId = (this.tipId != "") ? this.tipId : `${componentId}_tip`;
    this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
  }


  render() {

    let wrapperClass = 'yeti-titletip-wrapper';
    let tipClass = 'yeti-titletip';

    wrapperClass += (this.wrapperClass != '') ? ` ${this.wrapperClass}` : '';
    tipClass += (this.titletipClass != '') ? ` ${this.titletipClass}` : '';

  



    switch (this.position) {

      case "right":

        tipClass += " yeti-titletip-right";
        break;

      case "below":

        tipClass += " yeti-titletip-below";
        break;

      case "left":

        tipClass += " yeti-titletip-left";
        break;

      case "below-left":

        tipClass += " yeti-titletip-below-left";
        break;

      case "below-right":

        tipClass += " yeti-titletip-below-right";
        break;

      case "above-left":

        tipClass += " yeti-titletip-above-left";
        break;

      case "above-right":

        tipClass += " yeti-titletip-above-right";
        break;

    }

    return ([
      <div class={wrapperClass}>

        <div 
 
       
        >

          <slot />

        </div>


        <div class={tipClass}>

          <div class="yeti-titletip-content" id={this.tipId}>{this.text}</div>

        </div>

      </div>
    ]);
  }



  componentDidRender() {
    let slot = this.el.querySelector(".yeti-titletip-trigger").firstElementChild;
    let trigger = this.el.querySelector(".yeti-titletip-trigger") as HTMLElement;
    //slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-describedby",this.tipId);

    if (this.justClickedClosed && trigger) {
      // The user just clicked the tooltip closed. Restore focus to the trigger.
      this.justClickedClosed = false;
      trigger.focus();
    }

  }

}
