import{r as t,h as e,g as s}from"./p-0d1be970.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(e){t(this,e);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.hasOpened=false;this.headingId=i.generateUniqueId();this.isSideSheet=false;this.heading="Modal Heading";this.describedBy="";this.size="";this.modalClass="";this.isScrollable=true;this.isActive=false;this.showClose=true;this.isAnimating=false;this.isOpening=false;this.isClosing=false}handleFocus(t){if(!this.isSideSheet){if(t){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}else{if(t){this.setBackgroundElementStyles(true);this.isAnimating=true}else{this.isAnimating=true}}}setBackgroundElementStyles(t){if(t){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(t){if(this.isActive&&t.keyCode==27&&this.showClose){this.isActive=false}}handleTransitionEnd(t){if(!t.propertyName||t.propertyName!="transform"){return}if(this.isOpening){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus();this.isOpening=false;this.hasOpened=true}else if(this.isClosing){this.setBackgroundElementStyles(false);if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}this.isClosing=false}this.isAnimating=false}handleInitialFocus(){let t=this.el.querySelector(".yeti-modal-content");let e=i.aria.focusFirstDescendant(t);if(!e){t.setAttribute("tabIndex","-1");t.focus()}}componentWillLoad(){let t=this.el.getAttribute("id");let e=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");let a=this.el.querySelector("yeti-modal-header-action");if(!e){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{e.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(a){a.setAttribute("slot","header_action")}if(!t||t==""){t=i.generateUniqueId();this.el.setAttribute("id",t)}if(this.isActive){this.setBackgroundElementStyles(true)}}render(){let t=this.isSideSheet?"yeti-modal_ss-overlay":"yeti-modal-overlay";let s=`yeti-modal${this.isSideSheet?" yeti-modal_ss":""}`;let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}t+=this.isActive||this.isAnimating?"":" yeti-modal-overlay__inert";t+=this.isOpening?" yeti-modal__opening":"";t+=this.hasOpened?" yeti-modal__open":"";t+=this.isClosing?" yeti-modal__closing":"";s+=this.size==""?"":` yeti-modal-size-${this.size}`;s+=this.modalClass!=""?` ${this.modalClass}`:"";s+=this.isScrollable?"":" yeti-modal__unscrollable";return e("div",{key:"5fa3c5c8876ae9381fcbf348e93bdba687a10fbd",class:t},e("div",{key:"6b0bfa168d8fa9c0136bb167bc0d884a34aaecc1",class:"yeti-modal-bumper-front",tabIndex:0}),e("div",Object.assign({key:"32da9a01dacbfefa3d0bce7dc7e6cf9a40b89069",class:s},i),e("div",{key:"ed1a62f27c6c8b5194dd325d78458d281da66c73",class:"yeti-modal-header"},e("h1",{key:"e9c2d7e052775baf5d0fc2b51f48899628734a77",class:"yeti-modal-header-heading",id:this.headingId},this.heading),e("div",{key:"b9d38ff20e2fd1d4890033287470d28e9989c176",class:"yeti-modal-header-action"},e("slot",{key:"fd605974cc4a8ef8d457ecda6118d6299169bb7c",name:"header_action"})),this.showClose?e("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},e("span",{class:"material-icons"},"close")):null),e("div",{key:"b1847100390cce3c9aafabd54c1a9122d9c2d701",class:"yeti-modal-content"},e("div",{key:"6c07497ed9c79500e4aa17944995a25af5873a6b",class:"yeti-modal-content-actual"},e("slot",{key:"4435065e48047cacd38f6129910d8833f6635462",name:"content"})),e("div",{key:"8be0d5fa499e19b6872fcb9cf14703bac14f2c97",class:"yeti-modal-content-fade"})),e("div",{key:"909d876a4511650d33bed76f51b8a402e7093933",class:"yeti-modal-actions"},e("div",{key:"f6e0b50d2547deecd2bcb1e928c7c27f8ef20987",class:"yeti-modal-actions-buttons"},e("slot",{key:"062cda879140af0ecfcd7b8388e5c9a4a6df56e8",name:"buttons"})))),e("div",{key:"44015d50baff89b25da289c6f5fb37e4c610fb15",class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}if(this.isAnimating){if(this.isActive){setTimeout((()=>{this.isOpening=true;this.isClosing=false}),1)}else{setTimeout((()=>{this.isOpening=false;this.hasOpened=false;this.isClosing=true}),1)}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let t=this.el.querySelector(".yeti-modal-bumper-front");let e=this.el.querySelector(".yeti-modal-bumper-back");t.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));e.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-4f2798cc.entry.js.map