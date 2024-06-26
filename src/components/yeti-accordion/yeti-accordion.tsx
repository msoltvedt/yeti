import { Component, Prop, h, State, Element, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-accordion',
  shadow: false,
})
export class YetiAccordion {

  @Element() el: HTMLElement;

  /**
   * The 0-based index of the open section.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) openIndex: number = 0;

  /**
   * The total number of sections the Accordion has.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) sections: number = 0;

  /**
   * A list of the Accordion's yeti-accordion-section child elements
   */
  @Prop({
    mutable: true
  }) sectionElements: NodeList = null;

  /**
   * Whether or not to use wizard mode, in which you can only open one section at a time, and you have to go in order
   */
  @Prop() isWizard: boolean = false;

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;



  @Listen('accordionActionClick')
  handleAccordionActionClicked(e) {

    switch (e.detail.actionType) {

      case "previous": {
        if (e.detail.sectionIndex > 0) {
          this.openSection(parseInt(e.detail.sectionIndex) - 1);
        }
        break;
      }

      case "next": {
        if (e.detail.sectionIndex < this.sections-1 && e.detail.sectionStatus != "error") {
          this.openSection(parseInt(e.detail.sectionIndex) + 1);
        }
        break;
      }

    }
  }



  @Listen('accordionSectionHeaderClick')
  handleAccordionSectionHeaderClick(e) {

    // User clicked on a section heading, toggle this pane's state and set the others accordingly.
    console.log(e.detail.sectionIndex);

    // First make sure it wasn't a section after this one while in wizard mode or the one that's already open
    if (e.detail.sectionIndex > this.openIndex && this.isWizard
        || e.detail.sectionIndex == this.openIndex
    ) {
      this.openSection(this.openIndex);
      return;
    }

    else {
      this.openSection(e.detail.sectionIndex);
    }

  }



  openSection(suppliedIndex: number = 0) {
    this.sectionElements.forEach((sectionElements, index) => {
      let section = sectionElements as HTMLElement;
      let sectionHeader = section.querySelector(".yeti-accordion-section-heading") as HTMLElement;

      if (index == suppliedIndex) {
        section.setAttribute("is-open", "true");
        this.openIndex = index;
        setTimeout(() => { 
          sectionHeader?.focus();
        }, 100);
      } else {
        section.setAttribute("is-open", "false");
      }

      // Set the Openable state
      section.setAttribute("is-openable", `${ (index <= suppliedIndex)  ||  !this.isWizard }`);

    });

    this.openIndex = suppliedIndex;
  }



  componentWillLoad() {
    // Populate the sectionElements array and do some initial set-up.
    this.sectionElements = this.el.querySelectorAll('yeti-accordion-section');
    this.sections = this.sectionElements.length;

    if (!this.el.hasAttribute("id")) {
      this.el.setAttribute("id", utils.generateUniqueId());
    }

    if (!this.sectionElements || this.sectionElements.length < 2) {
      console.error("Yeti Accordion must have at least two yeti-accordion-section elements.");
      return;
    }

    this.sectionElements.forEach((sectionElement, index) => {

      let section = (sectionElement as HTMLElement);

      section.setAttribute("is-open", `${(index == 0)}`);
      section.setAttribute("index", `${index}`);
      section.setAttribute("of", `${this.sectionElements.length}`);
      section.setAttribute("is-openable", `${(index == 0)}`);
      section.setAttribute("is-in-wizard", `${this.isWizard}`);

    });

  }



  render() {

    return (

        <div class="yeti-accordion">

          <slot />

        </div>

    );
  }

}