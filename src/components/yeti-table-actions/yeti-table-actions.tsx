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

  @Prop() useGrid: boolean = false;



  parseTableActionElements() {
    let actionElementsWithoutGridColumnsSpecified = this.el.querySelectorAll('yeti-table-action:not([grid-columns]), yeti-table-pagination:not([grid-columns])');
    let actionElementsWithGridColumnsSpecified = this.el.querySelectorAll('[grid-columns]');
    const numberOfGridColumns = 16;
    let gridColumnsAvailable = numberOfGridColumns;
    let genericColumns; // This will eventually be what column span to give actions that didn't specify that.

    // actionElement... is the outer, <yeti-*> wrapper element. Since their parent is the grid container, we need to apply
    // the grid cell styling directly to this element.
    
    // First handle the actions that have a grid-columns attribute.
    actionElementsWithGridColumnsSpecified.forEach((actionElement) => {
      
      let spanAttribute = parseInt(actionElement.getAttribute('grid-columns'));
      let span = (isNaN(spanAttribute)) ? 1 : spanAttribute;
      let className = 'yeti-grid-column-' + span;
      let existingClasses = actionElement.getAttribute("class");
      existingClasses = (existingClasses) ? existingClasses : '';

      actionElement.setAttribute('class', `${existingClasses} ${className}`);
      gridColumnsAvailable -= span;

    });

    if (gridColumnsAvailable < actionElementsWithoutGridColumnsSpecified.length) {
      console.warn('Table actions must use a total of no more than 16 columns.');
    }

    genericColumns = Math.floor( gridColumnsAvailable / actionElementsWithoutGridColumnsSpecified.length );
    
    // Second divvy up the remaining grid columns amongst the actions that don't have a grid-columns attribute.
    for (let i = 0; i < actionElementsWithoutGridColumnsSpecified.length; i++) {
      
      let actionElement = actionElementsWithoutGridColumnsSpecified[i];
      let isLastElementWithoutColumnsSpecified = ((i+1) == actionElementsWithoutGridColumnsSpecified.length) ? true : false;
      let span = (isLastElementWithoutColumnsSpecified) ? gridColumnsAvailable : genericColumns;
      let className = 'yeti-grid-column-' + span;
      let existingClasses = actionElement.getAttribute("class");
      existingClasses = (existingClasses) ? existingClasses : '';

      actionElement.setAttribute('class', `${existingClasses} ${className}`);
      gridColumnsAvailable -= span;

    }
  }



  componentWillLoad() {
    this.parseTableActionElements();
  }



  render() {

    let cssClasses = 'yeti-table-actions';

    cssClasses += (this.useGrid) ? ' yeti-grid yeti-grid-gapless yeti-grid-gutterless' : '';

    if (this.cssClass != '') {
      cssClasses += ' ' + this.cssClass;
    }

    return (
      <div class={cssClasses} id={this.htmlId}><slot /></div>
    );
  }

}
