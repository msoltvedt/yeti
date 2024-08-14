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
        return (h("span", { key: '90ff83d0fae8e3ae3bf7b79ef70115878da3820f', class: wrapperClass }, (this.alt) ? h("span", { class: 'yeti-a11y-hidden' }, this.alt) : ''));
    }
    get el() { return getElement(this); }
};

export { YetiRequiredSymbol as yeti_required_symbol };

//# sourceMappingURL=yeti-required-symbol.entry.js.map