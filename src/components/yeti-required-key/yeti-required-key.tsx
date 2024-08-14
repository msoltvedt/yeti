import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'yeti-required-key',
  shadow: false,
})
export class YetiRequiredKey {

  @Element() el: HTMLElement;

  /**
   * Whether all fields are required (default) or not.
   */
  @Prop() allFieldsRequired = true;

  /**
   * CSS classlist applied to the wrapper element.
   */
  @Prop() cssClass?: string = '';



  render() {

    let wrapperClass = 'yeti-form-required-key';
    wrapperClass += (this.cssClass) ? ` ${this.cssClass}` : ``;

    return (

        <div class={wrapperClass}>

          {(!this.allFieldsRequired) ?

            [
            <yeti-required-symbol></yeti-required-symbol>,
            <span class="yeti-form-required-key-label">Indicates required field</span>
            ]

          :

            <span class="yeti-form-required-key-label">All fields required</span>

          }

        </div>

    );
  }

}