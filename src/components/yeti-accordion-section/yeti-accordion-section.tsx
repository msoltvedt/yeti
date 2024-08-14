import { Component, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-accordion-section',
  shadow: false,
})
export class YetiAccordionSection {

  @Element() el: HTMLElement;

  @Event() accordionActionClick: EventEmitter;

  @Event() accordionSectionHeaderClick: EventEmitter;

  /**
   * The descriptive text that appears in the heading bar above the content.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) heading: string = 'Heading';

  /**
   * Whether or not to automatically number the section headings
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isNumbered: boolean = true;

  /**
   * The 0-based index of this section relative to its peers. This should only be set by the parent Accordion component.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) index: number = 0;

  /**
   * The total number of sections the parent Accordion has. Should only be set by the parent.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) of: number = 1;

  /**
   * Whether the panel is open or not.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isOpen: boolean = (this.index == 0);

  /**
   * Whether the panel is openable or not.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isOpenable: boolean = (this.index == 0);

  /**
   * Whether the panel is a step in a wizard or not. This should be set by the parent Accordion component.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isInWizard: boolean = false;

  /**
   * Whether the consumer supplied buttons or not. Let the component set this.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) hasActions: boolean = false;

  /**
   * The panel's status: can be "success", "error", "reachable", or "undefined".
   */
  @Prop({
    mutable: true,
    reflect: true
  }) status: string = "undefined";

  /**
   * The heading button's HTML id.
   */
  @Prop() headingId: string = utils.generateUniqueId();

  /**
   * The section's HTML id.
   */
  @Prop() sectionId: string = utils.generateUniqueId();

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;



  handleSectionClick(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.accordionSectionHeaderClick.emit({
      "originalEvent": e,
      "section": this.el,
      "sectionIndex": this.index,
      "sectionStatus": this.status,
      "isOpen": this.isOpen
    });
  }



  handleActionClick(e, actionType) {
    e.preventDefault();
    e.stopPropagation();
    this.accordionActionClick.emit({
      "originalEvent": e,
      "section": this.el,
      "sectionIndex": this.index,
      "sectionStatus": this.status,
      "actionType": actionType
    });
  }



  renderStatusIcon() {
    switch (this.status) {

      case "success": {
        return <yeti-icon iconCode='check_circle' alt='complete' iconClass='yeti-accordion-section-status_icon yeti-accordion-section-status_icon-success'></yeti-icon>
      }

      case "error": {
        return <yeti-icon iconCode='error' alt='error' iconClass='yeti-accordion-section-status_icon yeti-accordion-section-status_icon-error'></yeti-icon>
      }

      default: return "";

    }
  }



  renderActions() {
    // Render the action buttons for a section.

    // Use the user's content if provided...
    if (this.hasActions) {

      return <slot name="actions"></slot>

    // ...otherwise automatically create our own.
    } else {

      let actions = [];

      // Previous
      if (this.index != 0) {
        actions.push(
          
          <li>
            <button 
              class="yeti-button yeti-button-secondary yeti-button-size-s" 
              onClick={(e) => {this.handleActionClick(e, "previous")}}
            >
              <yeti-icon iconCode='navigate_before' alt="" iconClass='yeti-accordion-action-button-icon' />Previous
            </button>
          </li>

        );
      }
      
      // Next
      if (this.index  <  this.of - 1) {
        actions.push(
          
          <li>
            <button 
              class="yeti-button yeti-button-primary yeti-button-size-s" 
              onClick={(e) => {this.handleActionClick(e, "next")}}
              {...((this.isInWizard && this.status != "success") ? {"disabled": true, "tabIndex": -1} : {})}
            >
              Next<yeti-icon iconCode='navigate_next' alt="" iconClass='yeti-accordion-action-button-icon' />
            </button>
          </li>

        );
      }

      // Cancel
      actions.push(
        <li><button class="yeti-button yeti-button-ghost yeti-button-size-s" onClick={(e) => {this.handleActionClick(e, "cancel")}}>Cancel</button></li>
      );


      return <ul class="yeti-button-group">{actions}</ul>;
      
    }

  }



  componentWillLoad() {
    
    let potentialActionsSlot = this.el.querySelector('[slot="actions"]');

    // User supplied actions, see if they marked them with an accordion-action attribute.
    if (potentialActionsSlot) {
      let elementsTaggedAsActions = potentialActionsSlot.querySelectorAll('[accordion-action]');
      this.hasActions = true;

      elementsTaggedAsActions.forEach((element) => {
        element.addEventListener("click", (e) => {
          this.handleActionClick(e, element.getAttribute("accordion-action"));
        });
      });

    }

  }



  render() {

    let wrapperCSS = 'yeti-accordion-section';

    wrapperCSS += (this.isOpenable) ? ' yeti-accordion-section-openable' : '';
    wrapperCSS += (this.isOpen) ? ' yeti-accordion-section__open' : '';

    return (

        <div class={wrapperCSS}>

          <button 
            id={this.headingId}
            class="yeti-accordion-section-heading"
            onClick={(e) => { this.handleSectionClick(e); }}
            aria-expanded={`${this.isOpen}`}
            aria-controls={this.sectionId}
            {...(!this.isOpenable ? {"disabled": true, "tabIndex": -1} : {})}
          >

            <div class='yeti-accordion-section-heading-contents'>

              {(this.isOpen) ?
              
                <yeti-icon iconCode='expand_less' alt='' iconClass='yeti-accordion-section-heading-caret'></yeti-icon>

              :

                <yeti-icon iconCode='expand_more' alt='' iconClass='yeti-accordion-section-heading-caret'></yeti-icon>

              }

              
              <div class="yeti-accordion-section-heading-actual">

                {(this.isNumbered) ? (this.index + 1) : ""} {this.heading}
                
              </div>


              {this.renderStatusIcon()}


            </div>

          </button>

          
          <div 
            id={this.sectionId}
            class="yeti-accordion-section-content"
            role="region"
            aria-labelledby={this.headingId}
          >

            <slot name="content" />

          </div>


          <div class="yeti-accordion-section-actions">

            {this.renderActions()}
          
          </div>


        </div>

    );
  }

}