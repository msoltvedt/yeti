import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'yeti-required-symbol',
  shadow: false,
})
export class YetiRequiredSymbol {

  @Element() el: HTMLElement;

  /**
   * Alternative text announced by screen-readers; set to an empty string to announce nothing.
   */
  @Prop() alt?: string = 'Required';

  /**
   * CSS classlist applied to the element.
   */
  @Prop() cssClass?: string = '';



  render() {

    let wrapperClass = 'yeti-form-required-symbol';
    wrapperClass += (this.cssClass) ? ` ${this.cssClass}` : ``;

    return (

        <span class={wrapperClass}>

          {(this.alt) ? <span class='yeti-a11y-hidden'>{this.alt}</span> : ''}
          
        </span>

    );
  }

}