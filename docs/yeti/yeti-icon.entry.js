import { r as registerInstance, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.iconCode = 'check_circle';
        this.iconStyle = '';
        this.iconClass = '';
        this.iconId = utils.generateUniqueId();
        this.alt = "";
        this.focusable = false;
        this.iLoveJSX = false;
    }
    render() {
        let iconClass = 'material-icons';
        let styleModifier = '';
        switch (this.iconStyle) {
            case 'outlined':
                styleModifier = '-outlined';
            case '':
            default: {
                break;
            }
        }
        iconClass += styleModifier;
        iconClass += (this.iconClass != '') ? ` ${this.iconClass}` : '';
        return ([
            h("span", Object.assign({ key: '20da7bc3c4bd869c1f78c542fb366ae6ca4cf7d8', class: iconClass }, ((this.focusable) ? { "tabindex": "0" } : {}), ((this.alt != "") ? { "aria-hidden": 'true' } : {})), this.iconCode),
            (this.alt != "") ? h("span", { class: "yeti-a11y-hidden" }, this.alt) : ""
        ]);
    }
    get el() { return getElement(this); }
};

export { YetiIcon as yeti_icon };

//# sourceMappingURL=yeti-icon.entry.js.map