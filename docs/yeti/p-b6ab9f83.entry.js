import{r as t,h as i,g as s}from"./p-f504dd71.js";import{u as e}from"./p-5c303e9a.js";const o=class{constructor(i){t(this,i),this.wrapperCSS="",this.tooltipCSS="",this.text="I'm a helpful tooltip.",this.position="above",this.slotId=e.generateUniqueId(),this.tipId=e.generateUniqueId(),this.iLoveJSX=!1,this.isOpen=!1}render(){let t="yeti-tooltip";switch(this.position){case"right":t+=" yeti-tooltip-right";break;case"below":t+=" yeti-tooltip-below";break;case"left":t+=" yeti-tooltip-left"}return[i("div",{class:"yeti-tooltip-wrapper"},i("div",{class:t},i("div",{class:"yeti-tooltip-content",id:this.tipId},this.text)),i("div",{class:"yeti-tooltip-slot",id:this.slotId,"aria-describedby":this.tipId},i("slot",null)))]}get el(){return s(this)}};export{o as yeti_tooltip}