import{r as e,h as t,g as s}from"./p-e8f90371.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.hasOpened=false;this.headingId=i.generateUniqueId();this.isSideSheet=false;this.heading="Modal Heading";this.describedBy="";this.size="";this.modalClass="";this.isScrollable=true;this.isActive=false;this.showClose=true;this.isAnimating=false;this.isOpening=false;this.isClosing=false}handleFocus(e){if(!this.isSideSheet){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}else{if(e){this.setBackgroundElementStyles(true);this.isAnimating=true}else{this.isAnimating=true}}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive&&e.keyCode==27&&this.showClose){this.isActive=false}}handleTransitionEnd(e){if(!e.propertyName||e.propertyName!="transform"){return}if(this.isOpening){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus();this.isOpening=false;this.hasOpened=true}else if(this.isClosing){this.setBackgroundElementStyles(false);if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}this.isClosing=false}this.isAnimating=false}handleInitialFocus(){let e=this.el.querySelector(".yeti-modal-content");let t=i.aria.focusFirstDescendant(e);if(!t){e.setAttribute("tabIndex","-1");e.focus()}}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");let a=this.el.querySelector("yeti-modal-header-action");if(!t){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{t.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(a){a.setAttribute("slot","header_action")}if(!e||e==""){e=i.generateUniqueId();this.el.setAttribute("id",e)}if(this.isActive){this.setBackgroundElementStyles(true)}}render(){let e=this.isSideSheet?"yeti-modal_ss-overlay":"yeti-modal-overlay";let s=`yeti-modal${this.isSideSheet?" yeti-modal_ss":""}`;let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}e+=this.isActive||this.isAnimating?"":" yeti-modal-overlay__inert";e+=this.isOpening?" yeti-modal__opening":"";e+=this.hasOpened?" yeti-modal__open":"";e+=this.isClosing?" yeti-modal__closing":"";s+=this.size==""?"":` yeti-modal-size-${this.size}`;s+=this.modalClass!=""?` ${this.modalClass}`:"";s+=this.isScrollable?"":" yeti-modal__unscrollable";return t("div",{key:"5452bf42b9a57380d6cc897c32f518ea2c175c8d",class:e},t("div",{key:"f6e0e2fbc773be993e702b997195d2ea44a0923b",class:"yeti-modal-bumper-front",tabIndex:0}),t("div",Object.assign({key:"e6f4480e57ef5919e56ebf01777cbf08896c71df",class:s},i),t("div",{key:"7ca627fa4a9f1afc0d78be972f9c9b9f22329ffe",class:"yeti-modal-header"},t("h1",{key:"d3da001ddb7f997eec68e29b4b0877644ab5f3a8",class:"yeti-modal-header-heading",id:this.headingId},this.heading),t("div",{key:"f4ba903cc2a22dbef334905c8ba762b4c713149c",class:"yeti-modal-header-action"},t("slot",{key:"1b5d80535c8d22aa400a32084816129872fa71c6",name:"header_action"})),this.showClose?t("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},t("span",{class:"material-icons"},"close")):null),t("div",{key:"cc2cfb5bfdfc08957e65766f44238165956c6aa3",class:"yeti-modal-content"},t("slot",{key:"c6ea34901a189c7816ece7ee1fd2e78dbd44f7b0",name:"content"}),t("div",{key:"0c66ec0e02351512ffc0f872c005f70fae83fd31",class:"yeti-modal-content-fade"})),t("div",{key:"09bbee8652cce1746d8d00472d9dc7293aa084fb",class:"yeti-modal-actions"},t("div",{key:"326d7632de29f1170b41c4bbd8008bb1daa65e27",class:"yeti-modal-actions-buttons"},t("slot",{key:"645a26c0220af4d5017cef1e73edd8902c355178",name:"buttons"})))),t("div",{key:"9fce8765b4e8aff54e2b1c95307e1ed455c08b72",class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}if(this.isAnimating){if(this.isActive){setTimeout((()=>{this.isOpening=true;this.isClosing=false}),1)}else{setTimeout((()=>{this.isOpening=false;this.hasOpened=false;this.isClosing=true}),1)}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let e=this.el.querySelector(".yeti-modal-bumper-front");let t=this.el.querySelector(".yeti-modal-bumper-back");e.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));t.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-dbeaddea.entry.js.map