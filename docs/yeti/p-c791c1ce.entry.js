import{r as t,h as i,g as e}from"./p-e8f90371.js";import{u as s}from"./p-943baa85.js";const o=class{constructor(i){t(this,i);this.iconCode="check_circle";this.iconStyle="";this.iconCSS="";this.iconId=s.generateUniqueId();this.alt="";this.focusable=false;this.iLoveJSX=false}render(){let t="material-icons";let e="";switch(this.iconStyle){case"outlined":e="-outlined"}t+=e;t+=this.iconCSS!=""?` ${this.iconCSS}`:"";return[i("span",Object.assign({key:"1c7a215060a0de18a0a0f797d41432a81f214653",class:t},this.focusable?{tabindex:"0"}:{},this.alt!=""?{"aria-hidden":true}:{}),this.iconCode),this.alt!=""?i("span",{class:"yeti-a11y-hidden"},this.alt):""]}get el(){return e(this)}};const l=class{constructor(i){t(this,i);this.wrapperCSS="";this.tooltipCSS="";this.text="I'm a helpful tooltip.";this.position="above";this.clickToOpen=false;this.slotId="";this.tipId="";this.blockAnchor=false;this.forceOpen=false;this.iLoveJSX=false;this.isClickedOpen=false}handleSlotHover(){if(!this.clickToOpen){this.scrollTooltipIntoView()}}handleSlotFocus(){if(!this.clickToOpen){this.scrollTooltipIntoView()}}handleDeFocusingClick(){this.isClickedOpen=false}handleClick(t){t.stopImmediatePropagation()}handleTriggerClick(t){if(this.clickToOpen){this.isClickedOpen=!this.isClickedOpen;t.stopImmediatePropagation();t.preventDefault();this.scrollTooltipIntoView();return false}}handleTriggerKeyUp(t){if(this.clickToOpen&&t.key=="Enter"){this.handleTriggerClick(t)}}handleCloseTooltipClick(t){this.isClickedOpen=false;t.stopImmediatePropagation();t.preventDefault()}scrollTooltipIntoView(){let t=this.el.querySelector(".yeti-tooltip");t.scrollIntoView({behavior:"smooth",block:"nearest"})}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=s.generateUniqueId();this.el.setAttribute("id",t)}this.tipId=this.tipId!=""?this.tipId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`}render(){let t="yeti-tooltip-wrapper";let e="yeti-tooltip";t+=this.wrapperCSS!=""?` ${this.wrapperCSS}`:"";e+=this.tooltipCSS!=""?` ${this.tooltipCSS}`:"";e+=this.isClickedOpen?" yeti-tooltip__clicked_open":"";e+=this.forceOpen?" yeti-tooltip__forced_open":"";t+=this.clickToOpen?" yeti-tooltip-wrapper-is_click_to_open":"";t+=this.blockAnchor?" yeti-tooltip-wrapper-has_block_anchor":"";switch(this.position){case"right":e+=" yeti-tooltip-right";break;case"below":e+=" yeti-tooltip-below";break;case"left":e+=" yeti-tooltip-left";break;case"below-left":e+=" yeti-tooltip-below-left";break;case"below-right":e+=" yeti-tooltip-below-right";break;case"above-left":e+=" yeti-tooltip-above-left";break;case"above-right":e+=" yeti-tooltip-above-right";break}return[i("div",{key:"2ca71af93339901744bba7cebaeb738aa8708ebf",class:t},i("div",Object.assign({key:"8defdfcf343986efa9d27d0ceab1aa91303d3074",class:"yeti-tooltip-trigger",onClick:t=>this.handleTriggerClick(t),onKeyUp:t=>this.handleTriggerKeyUp(t)},this.clickToOpen?{tabindex:0}:{}),i("slot",{key:"891704771472abbf8dd2a3655661b25dbdef8f60"})),i("div",{key:"3c54709dc371b26a398ab950b64708a29cb09eab",class:e},i("div",{key:"4cd7c2cf653b4499f2635e9dc4406f9ce473afc5",class:"yeti-tooltip-content",id:this.tipId},this.text),this.clickToOpen&&this.isClickedOpen?i("button",{class:"yeti-tooltip-close",onClick:t=>{this.handleCloseTooltipClick(t)}},i("yeti-icon",{iconCode:"close",iconCSS:"yeti-color-white yeti-typo-size-5"})):null))]}componentDidRender(){let t=this.el.querySelector(".yeti-tooltip-trigger").firstElementChild;t.setAttribute("aria-describedby",this.tipId)}get el(){return e(this)}};export{o as yeti_icon,l as yeti_tooltip};
//# sourceMappingURL=p-c791c1ce.entry.js.map