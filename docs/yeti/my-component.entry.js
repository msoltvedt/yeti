import { r as registerInstance, h } from './index-4c7d3552.js';
import { f as format } from './utils-d2005b2d.js';

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
