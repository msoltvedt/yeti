import { r as registerInstance, h, g as getElement } from './index-aa7ae84e.js';
import { u as utils } from './utils-4523b86b.js';

const YetiTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wrapperCSS = '';
        this.tooltipCSS = '';
        this.text = "I'm a helpful tooltip.";
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
        if (this.clickToOpen) {
            this.isClickedOpen = !this.isClickedOpen;
            e.stopImmediatePropagation();
            e.preventDefault();
            this.scrollTooltipIntoView();
            return false;
        }
    }
    handleTriggerKeyUp(e) {
        if (this.clickToOpen && e.key == "Enter") {
            this.handleTriggerClick(e);
        }
    }
    handleCloseTooltipClick(e) {
        this.isClickedOpen = false;
        e.stopImmediatePropagation();
        e.preventDefault();
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
        this.tipId = (this.tipId != "") ? this.tipId : `${componentId}_tip`;
        this.slotId = (this.slotId != "") ? this.slotId : `${componentId}_slot`;
    }
    render() {
        let wrapperCSS = 'yeti-tooltip-wrapper';
        let tipClass = 'yeti-tooltip';
        wrapperCSS += (this.wrapperCSS != '') ? ` ${this.wrapperCSS}` : '';
        tipClass += (this.tooltipCSS != '') ? ` ${this.tooltipCSS}` : '';
        tipClass += (this.isClickedOpen) ? ' yeti-tooltip__clicked_open' : '';
        tipClass += (this.forceOpen) ? ' yeti-tooltip__forced_open' : '';
        wrapperCSS += (this.clickToOpen) ? ' yeti-tooltip-wrapper-is_click_to_open' : '';
        wrapperCSS += (this.blockAnchor) ? ' yeti-tooltip-wrapper-has_block_anchor' : '';
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
            h("div", { class: wrapperCSS }, h("div", Object.assign({ class: "yeti-tooltip-trigger", onClick: (e) => this.handleTriggerClick(e), onKeyUp: (e) => this.handleTriggerKeyUp(e) }, ((this.clickToOpen) ? { "tabindex": 0 } : {})), h("slot", null)), h("div", { class: tipClass }, h("div", { class: "yeti-tooltip-content", id: this.tipId }, this.text), (this.clickToOpen && this.isClickedOpen) ?
                h("button", { class: "yeti-tooltip-close", onClick: (e) => { this.handleCloseTooltipClick(e); } }, h("yeti-icon", { iconCode: "close", iconCSS: 'yeti-color-white yeti-typo-size-5' }))
                :
                    null))
        ]);
    }
    componentDidRender() {
        let slot = this.el.querySelector(".yeti-tooltip-trigger").firstElementChild;
        //slot.setAttribute("tabindex", "0");
        slot.setAttribute("aria-describedby", this.tipId);
    }
    get el() { return getElement(this); }
};

export { YetiTooltip as yeti_tooltip };

//# sourceMappingURL=yeti-tooltip.entry.js.map