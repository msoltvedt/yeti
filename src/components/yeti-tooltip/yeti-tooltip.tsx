import { Component, Prop, h, State, Element } from '@stencil/core';
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

  @Prop() slotId: string = utils.generateUniqueId();

  @Prop() tipId: string = utils.generateUniqueId();

  @State() iLoveJSX: boolean = false;

  @State() isOpen: boolean = false;



  render() {

    let wrapperCSS = 'yeti-tooltip-wrapper';
    let tipClass = 'yeti-tooltip';

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


        <div class="yeti-tooltip-slot" id={this.slotId} aria-describedby={this.tipId}>
        
          <slot />

        </div>

      </div>
    ]);
  }

}
