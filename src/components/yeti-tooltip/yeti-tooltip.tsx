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
   * Token list to describe the tooltip's position relative to its anchor: left | right and/or above | below.
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

  /**
   * Whether the tooltip has been clicked open or not.
   */
  @State() isClickedOpen: boolean = false;



  @Listen('mouseover')
  handleSlotHover() {
    if (!this.clickToOpen) {
      this.scrollTooltipIntoView();
    }
  }



  @Listen('focusin')
  handleSlotFocus() {
    if (!this.clickToOpen) {
      this.scrollTooltipIntoView();
    }
  }



  @Listen('click', {
    target: 'body'
  })
  handleDeFocusingClick() {
    this.isClickedOpen = false;
  }



  @Listen('click')
  handleClick(e) {
    e.stopImmediatePropagation(); // Intercept the click event before it gets to the body-level handler
  }

  

  handleTriggerClick(e) {
    if (this.clickToOpen) {
      this.isClickedOpen = !this.isClickedOpen;
      e.stopImmediatePropagation();
      e.preventDefault();
      this.scrollTooltipIntoView();
      return false;
    }
  }



  handleCloseTooltipClick(e) {
    this.isClickedOpen = false;
    e.stopImmediatePropagation();
    e.preventDefault();
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

    wrapperCSS += (this.wrapperCSS != '') ? ` ${this.wrapperCSS}` : '';
    tipClass += (this.tooltipCSS != '') ? ` ${this.tooltipCSS}` : '';

    tipClass += (this.isClickedOpen) ? ' yeti-tooltip__clicked_open' : '';

    wrapperCSS += (this.clickToOpen) ? ' yeti-tooltip-wrapper-is_click_to_open' : '';
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

      case "below-left":

        tipClass += " yeti-tooltip-below-left";
        break;

      case "below-right":

        tipClass += " yeti-tooltip-below-right";
        break;

      case "above-left":

        tipClass += " yeti-tooltip-above-left";
        break;

      case "above-right":

        tipClass += " yeti-tooltip-above-right";
        break;

    }

    return ([
      <div class={wrapperCSS}>

      <div class="yeti-tooltip-trigger" onClick={(e) => this.handleTriggerClick(e)}>

        <slot />

      </div>

        <div class={tipClass}>

          <div class="yeti-tooltip-content" id={this.tipId}>{this.text}</div>

          {
            (this.clickToOpen) ?

              <button class="yeti-tooltip-close" onClick={(e) => { this.handleCloseTooltipClick(e); }}>
                <yeti-icon iconCode="close" iconCSS='yeti-color-white yeti-typo-size-5'></yeti-icon>
              </button>

            :
              null
          }
          
        </div>

      </div>
    ]);
  }



  componentDidRender() {
    let slot = this.el.querySelector(".yeti-tooltip-trigger").firstElementChild;
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-describedby",this.tipId);
  }

}
