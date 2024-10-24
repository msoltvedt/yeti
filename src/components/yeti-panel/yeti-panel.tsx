import { Component, Prop, h, State, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-panel',
  shadow: false,
})
export class YetiPanel {

  @Element() el: HTMLElement;

  /**
   * The descriptive text that appears in the heading bar above the content.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) heading: string = 'Heading';

  /**
   * Whether or not this panel can expand or collapse
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isExpandable: boolean = false;

  /**
   * Whether or not this panel is currently expanded.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isExpanded: boolean = true;

  /**
   * The id of the HTML element representing the panel header
   */
  @Prop({
    mutable: true,
    reflect: true
  }) headerId: string = utils.generateUniqueId();

  /**
   * The id of the HTML element representing the panel's content container
   */
  @Prop({
    mutable: true,
    reflect: true
  }) contentId: string = utils.generateUniqueId();

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;


  hasSubheader: boolean = false;



  handleHeaderClick() {
    if (this.isExpandable) {
      this.isExpanded = !this.isExpanded;
    }
  }



  componentWillLoad() {
    
    let potentialSubheader = this.el.querySelector('[slot="subheader"]');
    
    if (potentialSubheader) {
      this.hasSubheader = true;
    }

  }



  render() {

    let wrapperCSS = 'yeti-panel';

    wrapperCSS += (this.isExpandable) ? ' yeti-panel-expandable' : '';
    wrapperCSS += (this.isExpandable && this.isExpanded) ? ' yeti-panel__expanded' : '';

    return (

        <div class={wrapperCSS}>

          {/* Header */}
          {(this.isExpandable) ? 
          
            // It's expandable, use a button for the header.
            <button 
              id={this.headerId}
              class="yeti-panel-header"
              onClick={() => { this.handleHeaderClick(); }}
              aria-expanded={this.isExpanded}
              aria-controls={this.contentId}
            >

              <div class='yeti-panel-header-contents'>

                {(this.isExpanded) ?
                
                  <yeti-icon iconCode='expand_less' alt='' iconClass='yeti-panel-header-caret'></yeti-icon>

                :

                  <yeti-icon iconCode='expand_more' alt='' iconClass='yeti-panel-header-caret'></yeti-icon>

                }
                
                <div class="yeti-panel-header-actual">

                  {this.heading}
                  
                </div>


                <slot name="subheader" />


              </div>

            </button>

          :

            // It's not expandable, just use a div for the header.
            <div 
              id={this.headerId}
              class="yeti-panel-header"
            >

              <div class='yeti-panel-header-contents'>

                
                <div class="yeti-panel-header-actual">

                  {this.heading}
                  
                </div>


                <slot name="subheader" />


              </div>

            </div>
          
          }
          


          {/* Content */}
          <div 
            id={this.contentId}
            class="yeti-panel-content"
            role="region"
            aria-labelledby={this.headerId}
          >

            <slot />

          </div>


        </div>

    );
  }

}