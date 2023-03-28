import { Component, Prop, h, State, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-icon',
  shadow: false,
})
export class YetiIcon {

  @Element() el: HTMLElement;

  @Prop({ attribute: 'type'}) iconCode: string = 'check_circle';

  @Prop({ attribute: 'icon-css'}) iconCSS?: string = '';

  @Prop() iconId?: string = utils.generateUniqueId();

  @Prop() alt?: string = "";

  @Prop() focusable?: boolean = false;

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