import{r as t,h as i,g as s}from"./p-5c17298e.js";import{u as e}from"./p-4ae56677.js";const o=class{constructor(i){t(this,i);this.wrapperCSS="";this.tooltipCSS="";this.text="I'm a helpful tooltip.";this.position="above";this.slotId="";this.tipId="";this.blockAnchor=false;this.iLoveJSX=false}handleSlotHover(){}handleSlotFocus(){this.scrollTooltipIntoView()}scrollTooltipIntoView(){let t=this.el.querySelector(".yeti-tooltip");t.scrollIntoView({behavior:"smooth",block:"nearest"})}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=e.generateUniqueId();this.el.setAttribute("id",t)}this.tipId=this.tipId!=""?this.tipId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`}render(){let t="yeti-tooltip-wrapper";let s="yeti-tooltip";t+=this.blockAnchor?" yeti-tooltip-wrapper-has_block_anchor":"";switch(this.position){case"right":s+=" yeti-tooltip-right";break;case"below":s+=" yeti-tooltip-below";break;case"left":s+=" yeti-tooltip-left";break}return[i("div",{class:t},i("div",{class:s},i("div",{class:"yeti-tooltip-content",id:this.tipId},this.text)),i("slot",null))]}componentDidRender(){let t=this.el.querySelector(".yeti-tooltip").nextElementSibling;t.setAttribute("tabindex","0");t.setAttribute("aria-describedby",this.tipId)}get el(){return s(this)}};export{o as yeti_tooltip};
//# sourceMappingURL=p-60b767a9.entry.js.map