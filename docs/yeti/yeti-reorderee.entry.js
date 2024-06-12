import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';

const YetiReorderee = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.reorderRequested = createEvent(this, "reorderRequested", 7);
        this.assignedId = '';
        this.position = -1;
        this.reorderees = -1;
        this.wrapperClass = '';
        this.upTrigger = '';
        this.downTrigger = '';
        this.iLoveJSX = false;
    }
    handleUpTrigger(ev) {
        this.reorderRequested.emit({
            "assignedId": this.assignedId,
            "position": this.position,
            "isUp": true,
            "isDisabled": (this.position == 0)
        });
        ev.stopImmediatePropagation();
        ev.preventDefault();
    }
    handleDownTrigger(ev) {
        this.reorderRequested.emit({
            "assignedId": this.assignedId,
            "position": this.position,
            "isUp": false,
            "isDisabled": ((this.position + 1) >= this.reorderees)
        });
        ev.stopImmediatePropagation();
        ev.preventDefault();
    }
    render() {
        let wrapperClass = "yeti-reorderee";
        if (this.wrapperClass != '') {
            wrapperClass += ` ${this.wrapperClass}`;
        }
        return (h("li", { key: 'f2c3143068a40fc9b8990f71bd16a7259a3b03ff', class: wrapperClass }, h("slot", { key: '8fadb78a13fc4c3ac7dbcdb4d519b71877c9ebf7' })));
    }
    componentDidRender() {
        // Set disabled state for edge case triggers
        let upTrigger = this.el.querySelector(`#${this.upTrigger}`);
        let downTrigger = this.el.querySelector(`#${this.downTrigger}`);
        if (upTrigger) {
            if (this.position == 0) {
                upTrigger.setAttribute("disabled", "");
                upTrigger.classList.add("yeti-reorderee__disabled");
            }
            else {
                upTrigger.removeAttribute("disabled");
                upTrigger.classList.remove("yeti-reorderee__disabled");
            }
        }
        if (downTrigger) {
            if ((this.position + 1) >= this.reorderees) {
                downTrigger.setAttribute("disabled", "");
                downTrigger.classList.add("yeti-reorderee__disabled");
            }
            else {
                downTrigger.removeAttribute("disabled");
                downTrigger.classList.remove("yeti-reorderee__disabled");
            }
        }
    }
    componentDidLoad() {
        // Register click handlers on up and down triggers
        let upTrigger = this.el.querySelector(`#${this.upTrigger}`);
        let downTrigger = this.el.querySelector(`#${this.downTrigger}`);
        if (upTrigger) {
            upTrigger.addEventListener("click", (ev) => { this.handleUpTrigger(ev); });
        }
        if (downTrigger) {
            downTrigger.addEventListener("click", (ev) => { this.handleDownTrigger(ev); });
        }
    }
    get el() { return getElement(this); }
};

export { YetiReorderee as yeti_reorderee };

//# sourceMappingURL=yeti-reorderee.entry.js.map