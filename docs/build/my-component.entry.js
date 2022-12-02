import { r as registerInstance, h } from './index-258cb736.js';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

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
    return h("div", { class: 'testCascade' }, "Hello, World! I'm ", this.getText());
  }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };
