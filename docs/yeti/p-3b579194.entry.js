import{r as t,h as i,g as s}from"./p-5c17298e.js";import{u as e}from"./p-4ae56677.js";const o=class{constructor(i){t(this,i);this.iconCode="check_circle";this.iconStyle="";this.iconCSS="";this.iconId=e.generateUniqueId();this.alt="";this.focusable=false;this.iLoveJSX=false}componentDidRender(){if(this.focusable){this.el.setAttribute("tabindex","0")}}render(){let t="material-icons";let s="";switch(this.iconStyle){case"outlined":s="-outlined"}t+=s;t+=this.iconCSS!=""?` ${this.iconCSS}`:"";return[i("span",Object.assign({class:t},this.alt!=""?{"aria-hidden":true}:{}),this.iconCode),this.alt!=""?i("span",{class:"yeti-a11y-hidden"},this.alt):""]}get el(){return s(this)}};const l=class{constructor(i){t(this,i);this.wrapperCSS="";this.tooltipCSS="";this.text="I'm a helpful tooltip.";this.position="above";this.clickToOpen=false;this.slotId="";this.tipId="";this.blockAnchor=false;this.iLoveJSX=false;this.isClickedOpen=false}handleSlotHover(){if(!this.clickToOpen){this.scrollTooltipIntoView()}}handleSlotFocus(){if(!this.isClickedOpen){this.scrollTooltipIntoView()}}handleDeFocusingClick(){this.isClickedOpen=false}handleClick(t){t.stopImmediatePropagation()}handleTriggerClick(t){if(this.clickToOpen){this.isClickedOpen=!this.isClickedOpen;t.stopImmediatePropagation();t.preventDefault();this.scrollTooltipIntoView();return false}}handleCloseTooltipClick(t){this.isClickedOpen=false;t.stopImmediatePropagation();t.preventDefault()}scrollTooltipIntoView(){let t=this.el.querySelector(".yeti-tooltip");t.scrollIntoView({behavior:"smooth",block:"nearest"})}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=e.generateUniqueId();this.el.setAttribute("id",t)}this.tipId=this.tipId!=""?this.tipId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`}render(){let t="yeti-tooltip-wrapper";let s="yeti-tooltip";s+=this.isClickedOpen?" yeti-tooltip__clicked_open":"";t+=this.clickToOpen?" yeti-tooltip-wrapper-is_click_to_open":"";t+=this.blockAnchor?" yeti-tooltip-wrapper-has_block_anchor":"";switch(this.position){case"right":s+=" yeti-tooltip-right";break;case"below":s+=" yeti-tooltip-below";break;case"left":s+=" yeti-tooltip-left";break}return[i("div",{class:t},i("div",{class:"yeti-tooltip-trigger",onClick:t=>this.handleTriggerClick(t)},i("slot",null)),i("div",{class:s},i("div",{class:"yeti-tooltip-content",id:this.tipId},this.text),this.clickToOpen?i("button",{class:"yeti-tooltip-close",onClick:t=>{this.handleCloseTooltipClick(t)}},i("yeti-icon",{iconCode:"close",iconCSS:"yeti-color-white yeti-typo-size-5"})):null))]}componentDidRender(){let t=this.el.querySelector(".yeti-tooltip-trigger").firstElementChild;t.setAttribute("tabindex","0");t.setAttribute("aria-describedby",this.tipId)}get el(){return s(this)}};export{o as yeti_icon,l as yeti_tooltip};
//# sourceMappingURL=p-3b579194.entry.js.map