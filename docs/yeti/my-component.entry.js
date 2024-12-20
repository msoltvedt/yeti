import { r as registerInstance, h } from './index-a229effc.js';
import { f as format } from './utils-90cea6cb.js';

const myComponentCss = ":host{display:block}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.first = undefined;
        this.middle = undefined;
        this.last = undefined;
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", { key: '15fa71dcfcb080e828d1c13bc9fb4011d307ef91', class: 'testCascade' }, "Hi, World! I'm ", this.getText());
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map