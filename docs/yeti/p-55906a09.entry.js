import{r as t,h as e,g as i}from"./p-0d1be970.js";import{u as s}from"./p-943baa85.js";const a=class{constructor(e){t(this,e);this.justClickedClosed=false;this.wrapperClass="";this.titletipClass="";this.text="I'm a helpful titletip.";this.position="above";this.clickToOpen=false;this.slotId="";this.tipId="";this.blockAnchor=false;this.forceOpen=false;this.iLoveJSX=false;this.isClickedOpen=false}handleSlotHover(){if(!this.clickToOpen){this.scrollTitletipIntoView()}}handleSlotFocus(){if(!this.clickToOpen){this.scrollTitletipIntoView()}}scrollTitletipIntoView(){let t=this.el.querySelector(".yeti-titletip");t.scrollIntoView({behavior:"smooth",block:"nearest"})}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=s.generateUniqueId();this.el.setAttribute("id",t)}this.tipId=this.tipId!=""?this.tipId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`}render(){let t="yeti-titletip-wrapper";let i="yeti-titletip";t+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";i+=this.titletipClass!=""?` ${this.titletipClass}`:"";switch(this.position){case"right":i+=" yeti-titletip-right";break;case"below":i+=" yeti-titletip-below";break;case"left":i+=" yeti-titletip-left";break;case"below-left":i+=" yeti-titletip-below-left";break;case"below-right":i+=" yeti-titletip-below-right";break;case"above-left":i+=" yeti-titletip-above-left";break;case"above-right":i+=" yeti-titletip-above-right";break}return[e("div",{key:"4ceb111cdef763ed979d4b5736fa9a2ca4311620",class:t},e("div",{key:"5e1b6ef3cacfc08279a6d6c7161a0604b8c5c207"},e("slot",{key:"ef56699a69893487ca6ef06fe643453cafbe8df7"})),e("div",{key:"da5474122d1a9d2fba3df16e231636356b47eed2",class:i},e("div",{key:"aa87d2eb615032e6d4cf01ca73e9ba32bd10ce93",class:"yeti-titletip-content",id:this.tipId},this.text)))]}componentDidRender(){let t=this.el.querySelector(".yeti-titletip-trigger").firstElementChild;let e=this.el.querySelector(".yeti-titletip-trigger");t.setAttribute("aria-describedby",this.tipId);if(this.justClickedClosed&&e){this.justClickedClosed=false;e.focus()}}get el(){return i(this)}};export{a as yeti_titletip};
//# sourceMappingURL=p-55906a09.entry.js.map