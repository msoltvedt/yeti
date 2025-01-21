import{r as e,h as t,g as s}from"./p-39d3f65a.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.hasOpened=false;this.headingId=i.generateUniqueId();this.isSideSheet=false;this.heading="Modal Heading";this.describedBy="";this.size="";this.modalClass="";this.isScrollable=true;this.isActive=false;this.showClose=true;this.isAnimating=false;this.isOpening=false;this.isClosing=false}handleFocus(e){if(!this.isSideSheet){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}else{if(e){this.setBackgroundElementStyles(true);this.isAnimating=true}else{this.isAnimating=true}}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive&&e.keyCode==27&&this.showClose){this.isActive=false}}handleTransitionEnd(e){if(!e.propertyName||e.propertyName!="transform"){return}if(this.isOpening){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus();this.isOpening=false;this.hasOpened=true}else if(this.isClosing){this.setBackgroundElementStyles(false);if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}this.isClosing=false}this.isAnimating=false}handleInitialFocus(){let e=this.el.querySelector(".yeti-modal-content");let t=i.aria.focusFirstDescendant(e);if(!t){e.setAttribute("tabIndex","-1");e.focus()}}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");let a=this.el.querySelector("yeti-modal-header-action");if(!t){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{t.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(a){a.setAttribute("slot","header_action")}if(!e||e==""){e=i.generateUniqueId();this.el.setAttribute("id",e)}if(this.isActive){this.setBackgroundElementStyles(true)}}render(){let e=this.isSideSheet?"yeti-modal_ss-overlay":"yeti-modal-overlay";let s=`yeti-modal${this.isSideSheet?" yeti-modal_ss":""}`;let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}e+=this.isActive||this.isAnimating?"":" yeti-modal-overlay__inert";e+=this.isOpening?" yeti-modal__opening":"";e+=this.hasOpened?" yeti-modal__open":"";e+=this.isClosing?" yeti-modal__closing":"";s+=this.size==""?"":` yeti-modal-size-${this.size}`;s+=this.modalClass!=""?` ${this.modalClass}`:"";s+=this.isScrollable?"":" yeti-modal__unscrollable";return t("div",{key:"d9edcc124d1af9ac7f710c6b2ba41ff8e0af2244",class:e},t("div",{key:"f12c6c97df19b4ee68894495234644409cf0c46b",class:"yeti-modal-bumper-front",tabIndex:0}),t("div",Object.assign({key:"ae9234f3a6ef11708ed69448ef84f2ed26f35fcd",class:s},i),t("div",{key:"bc5d9248497e4b4ec5e8b116d7bc19204aabfe1b",class:"yeti-modal-header"},t("h1",{key:"975d8eb85776c58a81c95722addf9a98798e5f93",class:"yeti-modal-header-heading",id:this.headingId},this.heading),t("div",{key:"aad778cf034a2df9bfb94bfe06a07c81e17e0bfc",class:"yeti-modal-header-action"},t("slot",{key:"c6ec245f8d26ad2a38f4c715d8dc3271bab342e3",name:"header_action"})),this.showClose?t("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},t("span",{class:"material-icons"},"close")):null),t("div",{key:"d4c298125327f96763ec7bde73a274826633b950",class:"yeti-modal-content"},t("div",{key:"5ae4352d4fc10a9a249e1d596e91942dc72d4ad9",class:"yeti-modal-content-actual"},t("slot",{key:"afdafe9c4a29272e4039340c8c56711d42211c7b",name:"content"})),t("div",{key:"b11a9284a6013e866aaf2dd2c8236ca86cce4845",class:"yeti-modal-content-fade"})),t("div",{key:"30555308c394a04f3da93d15481c41f2b2b0dc27",class:"yeti-modal-actions"},t("div",{key:"47c9171bc67efbb2c4341bbfbf659c47c7fd2011",class:"yeti-modal-actions-buttons"},t("slot",{key:"eac9ca17e6be660484424afd6a9ef963ea58afb7",name:"buttons"})))),t("div",{key:"468420838a0e99eb8f6bc0acb30477aa03c22c27",class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}if(this.isAnimating){if(this.isActive){setTimeout((()=>{this.isOpening=true;this.isClosing=false}),1)}else{setTimeout((()=>{this.isOpening=false;this.hasOpened=false;this.isClosing=true}),1)}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let e=this.el.querySelector(".yeti-modal-bumper-front");let t=this.el.querySelector(".yeti-modal-bumper-back");e.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));t.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-20a52d28.entry.js.map