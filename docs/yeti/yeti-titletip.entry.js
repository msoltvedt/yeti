import { r as registerInstance, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTitleTip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.justClickedClosed = false;
        this.wrapperClass = '';
        this.titletipClass = '';
        this.text = "I'm a helpful titletip.";
        this.position = "above";
        this.clickToOpen = false;
        this.slotId = "";
        this.tipId = "";
        this.blockAnchor = false;
        this.forceOpen = false;
        this.iLoveJSX = false;
        this.isClickedOpen = false;
    }
    handleSlotHover() {
        if (!this.clickToOpen) {
            this.scrollTitletipIntoView();
        }
    }
    handleSlotFocus() {
        if (!this.clickToOpen) {
            this.scrollTitletipIntoView();
        }
    }
    scrollTitletipIntoView() {
        let actual = this.el.querySelector(".yeti-titletip");
        actual.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
    componentWillLoad() {
        // Set up ids
        let componentId = this.el.getAttribute("id");
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        this.tipId = (this.tipId != "") ? this.tipId : `${componentId}_tip`;
        this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
    }
    render() {
        let wrapperClass = 'yeti-titletip-wrapper';
        let tipClass = 'yeti-titletip';
        wrapperClass += (this.wrapperClass != '') ? ` ${this.wrapperClass}` : '';
        tipClass += (this.titletipClass != '') ? ` ${this.titletipClass}` : '';
        switch (this.position) {
            case "right":
                tipClass += " yeti-titletip-right";
                break;
            case "below":
                tipClass += " yeti-titletip-below";
                break;
            case "left":
                tipClass += " yeti-titletip-left";
                break;
            case "below-left":
                tipClass += " yeti-titletip-below-left";
                break;
            case "below-right":
                tipClass += " yeti-titletip-below-right";
                break;
            case "above-left":
                tipClass += " yeti-titletip-above-left";
                break;
            case "above-right":
                tipClass += " yeti-titletip-above-right";
                break;
        }
        return ([
            h("div", { key: '1f2e00399ad3dc9f58d8564fc87b2c3ad76a77e7', class: wrapperClass }, h("div", { key: '6c2d755c8ab561a4e4a22bad30aff397e9ab6f50' }, h("slot", { key: 'c0ed4474930d6207d194ee817aa2de2ae9c34815' })), h("div", { key: '65e611741ebdaadc484fa236be3a12c9798bfa5f', class: tipClass }, h("div", { key: 'bb4bb75bf9c5b31c4bc09b9c61b544c5397d09ca', class: "yeti-titletip-content", id: this.tipId }, this.text)))
        ]);
    }
    componentDidRender() {
        let slot = this.el.querySelector(".yeti-titletip-trigger").firstElementChild;
        let trigger = this.el.querySelector(".yeti-titletip-trigger");
        //slot.setAttribute("tabindex", "0");
        slot.setAttribute("aria-describedby", this.tipId);
        if (this.justClickedClosed && trigger) {
            // The user just clicked the tooltip closed. Restore focus to the trigger.
            this.justClickedClosed = false;
            trigger.focus();
        }
    }
    get el() { return getElement(this); }
};

export { YetiTitleTip as yeti_titletip };

//# sourceMappingURL=yeti-titletip.entry.js.map