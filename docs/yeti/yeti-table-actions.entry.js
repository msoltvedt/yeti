import { r as registerInstance, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTableActions = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cssClass = '';
        this.htmlId = "";
        this.useGrid = false;
    }
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
        genericColumns = Math.floor(gridColumnsAvailable / actionElementsWithoutGridColumnsSpecified.length);
        // Second divvy up the remaining grid columns amongst the actions that don't have a grid-columns attribute.
        for (let i = 0; i < actionElementsWithoutGridColumnsSpecified.length; i++) {
            let actionElement = actionElementsWithoutGridColumnsSpecified[i];
            let isLastElementWithoutColumnsSpecified = ((i + 1) == actionElementsWithoutGridColumnsSpecified.length) ? true : false;
            let span = (isLastElementWithoutColumnsSpecified) ? gridColumnsAvailable : genericColumns;
            let className = 'yeti-grid-column-' + span;
            let existingClasses = actionElement.getAttribute("class");
            existingClasses = (existingClasses) ? existingClasses : '';
            actionElement.setAttribute('class', `${existingClasses} ${className}`);
            gridColumnsAvailable -= span;
        }
    }
    componentWillLoad() {
        // Set up ids and parse table action HTML elements
        // Set up ids
        let componentId = this.el.getAttribute("id");
        let parent = this.el.parentElement;
        let parentId = (parent && parent.getAttribute("id")) ? parent.getAttribute("id") : utils.generateUniqueId();
        if (!componentId || componentId == "") {
            componentId = `${parentId}_actionsComponent`;
            this.el.setAttribute("id", componentId);
        }
        this.htmlId = (this.htmlId != "") ? this.htmlId : `${parentId}_actions`;
        // Parse children 
        this.parseTableActionElements();
    }
    render() {
        let cssClasses = 'yeti-table-actions';
        cssClasses += (this.useGrid) ? ' yeti-grid yeti-grid-gapless yeti-grid-gutterless' : '';
        if (this.cssClass != '') {
            cssClasses += ' ' + this.cssClass;
        }
        return (h("div", { key: 'a8ee8792f683cd7f2cb6f6e79313e6446f08a84d', class: cssClasses, id: this.htmlId }, h("slot", { key: 'a68e0cdcaef0303ab3c78c3c2eadd48bf043b14c' })));
    }
    get el() { return getElement(this); }
};

export { YetiTableActions as yeti_table_actions };

//# sourceMappingURL=yeti-table-actions.entry.js.map