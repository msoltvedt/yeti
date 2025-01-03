import { r as registerInstance, h, g as getElement } from './index-81029423.js';

const YetiRequiredKey = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.allFieldsRequired = true;
        this.cssClass = '';
    }
    render() {
        let wrapperClass = 'yeti-form-required-key';
        wrapperClass += (this.cssClass) ? ` ${this.cssClass}` : ``;
        return (h("div", { key: '43ae53d0e5fe92017ccbc20f35f19ca09525608a', class: wrapperClass }, (!this.allFieldsRequired) ?
            [
                h("yeti-required-symbol", null),
                h("span", { class: "yeti-form-required-key-label" }, "Indicates required field")
            ]
            :
                h("span", { class: "yeti-form-required-key-label" }, "All fields required")));
    }
    get el() { return getElement(this); }
};

export { YetiRequiredKey as yeti_required_key };

//# sourceMappingURL=yeti-required-key.entry.js.map