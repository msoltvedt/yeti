import { r as registerInstance, h, g as getElement } from './index-81029423.js';

const YetiRequiredSymbol = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.alt = 'Required';
        this.cssClass = '';
    }
    render() {
        let wrapperClass = 'yeti-form-required-symbol';
        wrapperClass += (this.cssClass) ? ` ${this.cssClass}` : ``;
        return (h("span", { key: '6493e02a9ccff8dc92063aa904faf35b44c96edc', class: wrapperClass }, (this.alt) ? h("span", { class: 'yeti-a11y-hidden' }, this.alt) : ''));
    }
    get el() { return getElement(this); }
};

export { YetiRequiredSymbol as yeti_required_symbol };

//# sourceMappingURL=yeti-required-symbol.entry.js.map