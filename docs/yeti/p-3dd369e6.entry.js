import{r as t,h as e,g as i}from"./p-39d3f65a.js";import{u as s}from"./p-943baa85.js";const l=class{constructor(e){t(this,e);this.justClickedClosed=false;this.wrapperClass="";this.titletipClass="";this.text="I'm a helpful titletip.";this.position="above";this.clickToOpen=false;this.slotId="";this.tipId="";this.blockAnchor=false;this.forceOpen=false;this.iLoveJSX=false;this.isClickedOpen=false}handleSlotHover(){if(!this.clickToOpen){this.scrollTitletipIntoView()}}handleSlotFocus(){if(!this.clickToOpen){this.scrollTitletipIntoView()}}scrollTitletipIntoView(){let t=this.el.querySelector(".yeti-titletip");t.scrollIntoView({behavior:"smooth",block:"nearest"})}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=s.generateUniqueId();this.el.setAttribute("id",t)}this.tipId=this.tipId!=""?this.tipId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`}render(){let t="yeti-titletip-wrapper";let i="yeti-titletip";t+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";i+=this.titletipClass!=""?` ${this.titletipClass}`:"";switch(this.position){case"right":i+=" yeti-titletip-right";break;case"below":i+=" yeti-titletip-below";break;case"left":i+=" yeti-titletip-left";break;case"below-left":i+=" yeti-titletip-below-left";break;case"below-right":i+=" yeti-titletip-below-right";break;case"above-left":i+=" yeti-titletip-above-left";break;case"above-right":i+=" yeti-titletip-above-right";break}return[e("div",{key:"1c3f4530ead690f070309c68b9ad6ad45c0746d7",class:t},e("div",{key:"316be68d611c6c1600b72153a59b84fce9721d17"},e("slot",{key:"02e9963203edba0a18d0c765bd33e3a8d091bd45"})),e("div",{key:"62434bb1baf150b0ea47bf0e0327248818efe9a9",class:i},e("div",{key:"156cdb1cb3ab321480714b8d9a953122d187e048",class:"yeti-titletip-content",id:this.tipId},this.text)))]}componentDidRender(){let t=this.el.querySelector(".yeti-titletip-trigger").firstElementChild;let e=this.el.querySelector(".yeti-titletip-trigger");t.setAttribute("aria-describedby",this.tipId);if(this.justClickedClosed&&e){this.justClickedClosed=false;e.focus()}}get el(){return i(this)}};export{l as yeti_titletip};
//# sourceMappingURL=p-3dd369e6.entry.js.map