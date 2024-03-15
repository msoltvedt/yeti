import { r as registerInstance, h, g as getElement } from './index-2baeb834.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.iconCode = 'check_circle';
        this.iconStyle = '';
        this.iconCSS = '';
        this.iconId = utils.generateUniqueId();
        this.alt = "";
        this.focusable = false;
        this.iLoveJSX = false;
    }
    render() {
        let iconCSS = 'material-icons';
        let styleModifier = '';
        switch (this.iconStyle) {
            case 'outlined':
                styleModifier = '-outlined';
            case '':
            default: {
                break;
            }
        }
        iconCSS += styleModifier;
        iconCSS += (this.iconCSS != '') ? ` ${this.iconCSS}` : '';
        return (
        // <span class="yeti-icon-wrapper" {...((this.focusable) ? {"tabindex": 0} : {})}>
        [
            h("span", Object.assign({ key: '5119b2b19b0c17928854b4811ec321ce40cfeeb3', class: iconCSS }, ((this.focusable) ? { "tabindex": "0" } : {}), ((this.alt != "") ? { "aria-hidden": true } : {})), this.iconCode),
            (this.alt != "") ? h("span", { class: "yeti-a11y-hidden" }, this.alt) : ""
        ]
        //</span>
        );
    }
    get el() { return getElement(this); }
};

export { YetiIcon as yeti_icon };

//# sourceMappingURL=yeti-icon.entry.js.map