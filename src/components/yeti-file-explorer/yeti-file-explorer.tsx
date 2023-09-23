import { Component, Prop, h, State, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-file-explorer',
  shadow: false,
})
export class YetiFileExplorer {

  @Element() el: HTMLElement;

  /**
   * CSS classlist applied to the explorer wrapper element.
   */
  @Prop({ attribute: 'wrapper-css'}) wrapperCSS?: string = '';

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;



  render() {

    let wrapperCSS = 'yeti-file_explorer';

    wrapperCSS += (this.wrapperCSS != '') ? ` ${this.wrapperCSS}` : '';

    return (

        <div class={wrapperCSS}></div>

    );
  }

}