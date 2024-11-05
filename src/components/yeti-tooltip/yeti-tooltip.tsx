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
  @Prop() wrapperClass: string = '';

  /**
   * CSS classlist to add to the actual tooltip element.
   */
  @Prop() tooltipClass: string = '';

  /**
   * Text value to display as the tooltip's contents.
   */
  @Prop() text: string = "I'm a helpful tooltip.";

  /**
   * Token list to describe the tooltip's position relative to its anchor: left | right and/or above | below.
   */
  @Prop() position: string = "above";

  /**
   * Boolean value that sets whether the tooltip opens on hover/focus (default) or on click.
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
   * Whether the tooltip should remain open permanently.
   */
  @Prop() forceOpen: boolean = false;

  /**
   * Whether the tooltip has been clicked open or not.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isClickedOpen: boolean = false;

  /**
   * Toggle to force a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = false;

  /**
   * Whether the tooltip has rich content (i.e. html rather than just a string of text) or not.
   */
  @State() hasRichContent: boolean = false;

  justClickedClosed: boolean = false;


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
    if (this.clickToOpen && !this.justClickedClosed) {
      this.closeOtherTooltips();
      e.stopImmediatePropagation();
      e.preventDefault();
      this.scrollTooltipIntoView();
      this.isClickedOpen = !this.isClickedOpen;
      return false;
    }
  }

  

  handleTriggerKeyPress(e) {
    if (this.clickToOpen && e.key == "Enter" && !this.justClickedClosed) {
      this.handleTriggerClick(e);
    }
  }



  handleCloseTooltipClick(e) {
    this.justClickedClosed = true;
    e.stopImmediatePropagation();
    e.preventDefault();
    this.isClickedOpen = false;
  }



  closeOtherTooltips() {
    let allTooltips = document.querySelectorAll("yeti-tooltip");

    for (let i = 0; i < allTooltips.length; i++) {
      let someTooltip = allTooltips[i];
      if (someTooltip.clickToOpen && someTooltip.isClickedOpen && someTooltip.id != this.el.getAttribute("id")) {
        someTooltip.isClickedOpen = false;
      }
    }
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

    if (this.el.querySelector('[slot="content"]')) {
      this.hasRichContent = true;
    }

    this.tipId = (this.tipId != "") ? this.tipId : `${componentId}_tip`;
    this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
  }



  renderContent() {
    if (this.hasRichContent) {
      return <slot name="content"></slot>
    } else {
      return this.text;
    }
  }


  render() {

    let wrapperClass = 'yeti-tooltip-wrapper';
    let tipClass = 'yeti-tooltip';

    wrapperClass += (this.wrapperClass != '') ? ` ${this.wrapperClass}` : '';
    tipClass += (this.tooltipClass != '') ? ` ${this.tooltipClass}` : '';

    tipClass += (this.isClickedOpen) ? ' yeti-tooltip__clicked_open' : '';

    tipClass += (this.forceOpen) ? ' yeti-tooltip__forced_open' : '';

    wrapperClass += (this.clickToOpen) ? ' yeti-tooltip-wrapper-is_click_to_open' : '';
    wrapperClass += (this.blockAnchor) ? ' yeti-tooltip-wrapper-has_block_anchor' : '';

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
      <div class={wrapperClass}>

        <div 
          class="yeti-tooltip-trigger" 
          onClick={(e) => this.handleTriggerClick(e)}
          onKeyPress={(e) => this.handleTriggerKeyPress(e)}
          {...((this.clickToOpen) ? { "tabindex": 0 } : {})}  
        >

          <slot />

        </div>


        <div class={tipClass}>

          <div class="yeti-tooltip-content" id={this.tipId}>{this.renderContent()}</div>

          {
            (this.clickToOpen && this.isClickedOpen) ?

              <button class="yeti-tooltip-close" onClick={(e) => { this.handleCloseTooltipClick(e); }}>
                <yeti-icon iconCode="close" iconClass='yeti-color-white yeti-typo-size-5'></yeti-icon>
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
    let trigger = this.el.querySelector(".yeti-tooltip-trigger") as HTMLElement;
    //slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-describedby",this.tipId);

    if (this.justClickedClosed && trigger) {
      // The user just clicked the tooltip closed. Restore focus to the trigger.
      this.justClickedClosed = false;
      trigger.focus();
    }

  }

}
