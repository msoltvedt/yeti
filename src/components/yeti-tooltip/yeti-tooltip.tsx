import { Component, Prop, h, State, Element, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-tooltip',
  shadow: false,
})
export class YetiTooltip {

  @Element() el: HTMLElement;

  @Prop({ attribute: 'wrapper-class'}) wrapperCSS: string = '';

  @Prop({ attribute: 'tooltip-class'}) tooltipCSS: string = '';

  @Prop() text: string = "I'm a helpful tooltip.";

  @Prop() position: string = "above";

  @Prop({
    mutable: true,
    reflect: true
  }) slotId: string = ""; // Set on load

  @Prop({
    mutable: true,
    reflect: true
  }) tipId: string = ""; // Set on load

  @Prop() blockAnchor: boolean = false;

  @State() iLoveJSX: boolean = false;



  @Listen('mouseover')
  handleSlotHover() {
    this.scrollTooltipIntoView();
  }



  @Listen('focusin')
  handleSlotFocus() {
    this.scrollTooltipIntoView();
  }



  scrollTooltipIntoView() {
    let actual = this.el.querySelector(".yeti-tooltip");
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

    let wrapperCSS = 'yeti-tooltip-wrapper';
    let tipClass = 'yeti-tooltip';

    wrapperCSS += (this.blockAnchor) ? ' yeti-tooltip-wrapper-has_block_anchor' : '';

    switch (this.position) {

      case "right":

        tipClass += " yeti-tooltip-right";
        break;

      case "below":

        tipClass += " yeti-tooltip-below";
        break;

      case "left":

        tipClass += " yeti-tooltip-left";
        break;

    }

    return ([
      <div class={wrapperCSS}>

        <div class={tipClass}>

          <div class="yeti-tooltip-content" id={this.tipId}>{this.text}</div>
          
        </div>


        <slot />

      </div>
    ]);
  }



  componentDidRender() {
    let slot = this.el.querySelector(".yeti-tooltip").nextElementSibling;
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-describedby",this.tipId);
  }

}
