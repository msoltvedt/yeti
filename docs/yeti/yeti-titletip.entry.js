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
            h("div", { key: '02a67e7e3edfdd94e8a6ca71049c89fffab0ffc6', class: wrapperClass }, h("div", { key: '518fb65333c8905a2566ed981f345e4581e896e0' }, h("slot", { key: '00d1b8808822925fabd56c689c3c7ee60660f626' })), h("div", { key: 'a1fe58740dfd0bd83af42970aa64ad1cc9150a26', class: tipClass }, h("div", { key: '96348e80a82c81c0378011d425e586f29a5e2b7f', class: "yeti-titletip-content", id: this.tipId }, this.text)))
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