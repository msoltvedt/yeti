import { Component, Prop, h, State, Element, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-tooltip',
  shadow: false,
})
export class YetiTooltip {

  @Element() el: HTMLElement;

  /**
   * CSS classlist to add to the element serving as the component's wrapper.
   */
  @Prop({ attribute: 'wrapper-class'}) wrapperCSS: string = '';

  /**
   * CSS classlist to add to the actual tooltip element.
   */
  @Prop({ attribute: 'tooltip-class'}) tooltipCSS: string = '';

  /**
   * Text value to display as the tooltip's contents.
   */
  @Prop() text: string = "I'm a helpful tooltip.";

  /**
   * Token list to describe the tooltip's position relative to its anchor: left | right and/or above | below.
   */
  @Prop() position: string = "above";

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
  }) tipId: string = ""; // Set on load

  /**
   * Whether the anchor should be forced to be a CSS display block style or left as is.
   */
  @Prop() blockAnchor: boolean = false;

  /**
   * Toggle to force a re-render of the whole component.
   */
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
