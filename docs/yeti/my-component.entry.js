import { r as registerInstance, h } from './index-757389e7.js';
import { f as format } from './utils-9a04204c.js';

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
    return h("div", { class: 'testCascade' }, "Hi, World! I'm ", this.getText());
  }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map