import{r as t,h as e,g as i}from"./p-0d1be970.js";import{u as s}from"./p-943baa85.js";const l=class{constructor(e){t(this,e);this.justClickedClosed=false;this.wrapperClass="";this.titletipClass="";this.text="I'm a helpful titletip.";this.position="above";this.clickToOpen=false;this.slotId="";this.tipId="";this.blockAnchor=false;this.forceOpen=false;this.iLoveJSX=false;this.isClickedOpen=false}handleSlotHover(){if(!this.clickToOpen){this.scrollTitletipIntoView()}}handleSlotFocus(){if(!this.clickToOpen){this.scrollTitletipIntoView()}}scrollTitletipIntoView(){let t=this.el.querySelector(".yeti-titletip");t.scrollIntoView({behavior:"smooth",block:"nearest"})}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=s.generateUniqueId();this.el.setAttribute("id",t)}this.tipId=this.tipId!=""?this.tipId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`}render(){let t="yeti-titletip-wrapper";let i="yeti-titletip";t+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";i+=this.titletipClass!=""?` ${this.titletipClass}`:"";switch(this.position){case"right":i+=" yeti-titletip-right";break;case"below":i+=" yeti-titletip-below";break;case"left":i+=" yeti-titletip-left";break;case"below-left":i+=" yeti-titletip-below-left";break;case"below-right":i+=" yeti-titletip-below-right";break;case"above-left":i+=" yeti-titletip-above-left";break;case"above-right":i+=" yeti-titletip-above-right";break}return[e("div",{key:"0c0353f2869c8e6b82e5f57365e33f626530388c",class:t},e("div",{key:"dda217478c0147dd3c3a115980ef069a87e681bb"},e("slot",{key:"3f1abd885499099c099132950e1318ce2961686f"})),e("div",{key:"ce095f310d475f0abd2efcd3feb1a6d55f48b5a9",class:i},e("div",{key:"e42d1dca3db6bc87373a8f79fab0556df324f1ac",class:"yeti-titletip-content",id:this.tipId},this.text)))]}componentDidRender(){let t=this.el.querySelector(".yeti-titletip-trigger").firstElementChild;let e=this.el.querySelector(".yeti-titletip-trigger");t.setAttribute("aria-describedby",this.tipId);if(this.justClickedClosed&&e){this.justClickedClosed=false;e.focus()}}get el(){return i(this)}};export{l as yeti_titletip};
//# sourceMappingURL=p-2c718d08.entry.js.map