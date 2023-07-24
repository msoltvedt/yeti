import { Component, Prop, h, State, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-icon',
  shadow: false,
})
export class YetiIcon {

  @Element() el: HTMLElement;

  /**
   * The type of icon. Corresponds to the analogous "code" Google uses (i.e. check_circle).
   */
  @Prop({ attribute: 'type'}) iconCode: string = 'check_circle';

  /**
   * CSS classlist applied to the actual element producing the icon.
   */
  @Prop({ attribute: 'icon-css'}) iconCSS?: string = '';

  /**
   * id of the actual element producing the icon. Set to a unique id if one is not provided.
   */
  @Prop() iconId?: string = utils.generateUniqueId();

  /**
   * Optional replacement text to use as a more clear description of the icon for screen-reader users. Otherwise AT will announce the Google "code" (i.e. check_circle).
   */
  @Prop() alt?: string = "";

  /**
   * Whether the icon can gain focus (used primarily for tooltip anchors).
   */
  @Prop() focusable?: boolean = false;

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;



  componentDidRender() {
    if (this.focusable) {
        this.el.setAttribute("tabindex", "0");
    }
  }



  render() {

    let iconCSS = 'material-icons';

    iconCSS += (this.iconCSS != '') ? ` ${this.iconCSS}` : '';

    return (

        // <span class="yeti-icon-wrapper" {...((this.focusable) ? {"tabindex": 0} : {})}>
        [
            
            <span class={iconCSS} {...((this.alt != "") ? {"aria-hidden": true} : {})}>{this.iconCode}</span>,
            
            (this.alt != "") ? <span class="yeti-a11y-hidden">{this.alt}</span> : ""
          
        ]
        //</span>

    );
  }

}