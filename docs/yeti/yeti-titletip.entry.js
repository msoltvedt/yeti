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
            h("div", { key: '193a498ae46b0a54fec4870bd18995b18465a1c1', class: wrapperClass }, h("div", { key: '6b2994d02461a53d5ed2a56a84f2b1b9736b7989' }, h("slot", { key: 'e8077bb02d34e3ae71fd592abb9ecda74dab7108' })), h("div", { key: '7f078d5fcd781b9763765594dd44ddbda20207c9', class: tipClass }, h("div", { key: '250af0d6fb26eb509cc7c0b4fe84d9aa97bbac36', class: "yeti-titletip-content", id: this.tipId }, this.text)))
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