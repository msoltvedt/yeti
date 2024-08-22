import { r as registerInstance, h, g as getElement } from './index-a229effc.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.justClickedClosed = false;
        this.wrapperClass = '';
        this.tooltipClass = '';
        this.text = "I'm a helpful tooltip.";
        this.position = "above";
        this.clickToOpen = false;
        this.slotId = "";
        this.tipId = "";
        this.blockAnchor = false;
        this.forceOpen = false;
        this.iLoveJSX = false;
        this.isClickedOpen = false;
        this.hasRichContent = false;
    }
    handleSlotHover() {
        if (!this.clickToOpen) {
            this.scrollTooltipIntoView();
        }
    }
    handleSlotFocus() {
        if (!this.clickToOpen) {
            this.scrollTooltipIntoView();
        }
    }
    handleDeFocusingClick() {
        this.isClickedOpen = false;
    }
    handleClick(e) {
        e.stopImmediatePropagation(); // Intercept the click event before it gets to the body-level handler
    }
    handleTriggerClick(e) {
        if (this.clickToOpen && !this.justClickedClosed) {
            e.stopImmediatePropagation();
            e.preventDefault();
            this.scrollTooltipIntoView();
            this.isClickedOpen = !this.isClickedOpen;
            return false;
        }
    }
    handleTriggerKeyPress(e) {
        if (this.clickToOpen && e.key == "Enter" && !this.justClickedClosed) {
            this.handleTriggerClick(e);
        }
    }
    handleCloseTooltipClick(e) {
        this.justClickedClosed = true;
        e.stopImmediatePropagation();
        e.preventDefault();
        this.isClickedOpen = false;
    }
    scrollTooltipIntoView() {
        let actual = this.el.querySelector(".yeti-tooltip");
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
        if (this.el.querySelector('[slot="content"]')) {
            this.hasRichContent = true;
        }
        this.tipId = (this.tipId != "") ? this.tipId : `${componentId}_tip`;
        this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
    }
    renderContent() {
        if (this.hasRichContent) {
            return h("slot", { name: "content" });
        }
        else {
            return this.text;
        }
    }
    render() {
        let wrapperClass = 'yeti-tooltip-wrapper';
        let tipClass = 'yeti-tooltip';
        wrapperClass += (this.wrapperClass != '') ? ` ${this.wrapperClass}` : '';
        tipClass += (this.tooltipClass != '') ? ` ${this.tooltipClass}` : '';
        tipClass += (this.isClickedOpen) ? ' yeti-tooltip__clicked_open' : '';
        tipClass += (this.forceOpen) ? ' yeti-tooltip__forced_open' : '';
        wrapperClass += (this.clickToOpen) ? ' yeti-tooltip-wrapper-is_click_to_open' : '';
        wrapperClass += (this.blockAnchor) ? ' yeti-tooltip-wrapper-has_block_anchor' : '';
        switch (this.position) {
            case "right":
                tipClass += " yeti-tooltip-right";
                break;
            case "below":
                tipClass += " yeti-tooltip-below";
                break;
            case "left":
                tipClass += " yeti-tooltip-left";
                break;
            case "below-left":
                tipClass += " yeti-tooltip-below-left";
                break;
            case "below-right":
                tipClass += " yeti-tooltip-below-right";
                break;
            case "above-left":
                tipClass += " yeti-tooltip-above-left";
                break;
            case "above-right":
                tipClass += " yeti-tooltip-above-right";
                break;
        }
        return ([
            h("div", { key: 'd786a779b1eae02b60fc93050865267a25e667fb', class: wrapperClass }, h("div", Object.assign({ key: 'c68736f1d100ac76941fa4abfabb44faa0483a83', class: "yeti-tooltip-trigger", onClick: (e) => this.handleTriggerClick(e), onKeyPress: (e) => this.handleTriggerKeyPress(e) }, ((this.clickToOpen) ? { "tabindex": 0 } : {})), h("slot", { key: 'c552f45becca7c1dd7228ebe90ca281c11683bcc' })), h("div", { key: '97a02ba256de2f4b901e7815ae1e8e97a2c40dd9', class: tipClass }, h("div", { key: 'aeb5f1865f22b0a42e3ebfc142be79f0ef1b12f3', class: "yeti-tooltip-content", id: this.tipId }, this.renderContent()), (this.clickToOpen && this.isClickedOpen) ?
                h("button", { class: "yeti-tooltip-close", onClick: (e) => { this.handleCloseTooltipClick(e); } }, h("yeti-icon", { iconCode: "close", iconClass: 'yeti-color-white yeti-typo-size-5' }))
                :
                    null))
        ]);
    }
    componentDidRender() {
        let slot = this.el.querySelector(".yeti-tooltip-trigger").firstElementChild;
        let trigger = this.el.querySelector(".yeti-tooltip-trigger");
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

export { YetiTooltip as yeti_tooltip };

//# sourceMappingURL=yeti-tooltip.entry.js.map