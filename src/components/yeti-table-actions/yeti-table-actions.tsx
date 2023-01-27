import { Component, Prop, h, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-table-actions',
  shadow: false,
})
export class YetiTableActions {

  @Element() el: HTMLElement;

  @Prop() cssClass: string = '';

  @Prop() htmlId: string = utils.generateUniqueId();

  render() {

    let cssClasses = 'yeti-table-actions';

    if (this.cssClass != '') {
      cssClasses += ' ' + this.cssClass;
    }

    return (
      <div class={cssClasses} id={this.htmlId}><slot /></div>
    );
  }

}
