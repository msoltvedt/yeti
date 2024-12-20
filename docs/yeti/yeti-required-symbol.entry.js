import { r as registerInstance, h, g as getElement } from './index-a229effc.js';

const YetiRequiredSymbol = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.alt = 'Required';
        this.cssClass = '';
    }
    render() {
        let wrapperClass = 'yeti-form-required-symbol';
        wrapperClass += (this.cssClass) ? ` ${this.cssClass}` : ``;
        return (h("span", { key: '7ef61ea1ff0fee0987af116e8a3d041336fb5070', class: wrapperClass }, (this.alt) ? h("span", { class: 'yeti-a11y-hidden' }, this.alt) : ''));
    }
    get el() { return getElement(this); }
};

export { YetiRequiredSymbol as yeti_required_symbol };

//# sourceMappingURL=yeti-required-symbol.entry.js.map