import{r as e,h as t,g as s}from"./p-e8f90371.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.hasOpened=false;this.headingId=i.generateUniqueId();this.isSideSheet=false;this.heading="Modal Heading";this.describedBy="";this.size="";this.modalClass="";this.isScrollable=true;this.isActive=false;this.showClose=true;this.isAnimating=false;this.isOpening=false;this.isClosing=false}handleFocus(e){if(!this.isSideSheet){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}else{if(e){this.setBackgroundElementStyles(true);this.isAnimating=true}else{this.isAnimating=true}}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive&&e.keyCode==27&&this.showClose){this.isActive=false}}handleTransitionEnd(e){if(!e.propertyName||e.propertyName!="transform"){return}if(this.isOpening){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus();this.isOpening=false;this.hasOpened=true}else if(this.isClosing){this.setBackgroundElementStyles(false);if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}this.isClosing=false}this.isAnimating=false}handleInitialFocus(){let e=this.el.querySelector(".yeti-modal-content");let t=i.aria.focusFirstDescendant(e);if(!t){e.setAttribute("tabIndex","-1");e.focus()}}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");let a=this.el.querySelector("yeti-modal-header-action");if(!t){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{t.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(a){a.setAttribute("slot","header_action")}if(!e||e==""){e=i.generateUniqueId();this.el.setAttribute("id",e)}if(this.isActive){this.setBackgroundElementStyles(true)}}render(){let e=this.isSideSheet?"yeti-modal_ss-overlay":"yeti-modal-overlay";let s=`yeti-modal${this.isSideSheet?" yeti-modal_ss":""}`;let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}e+=this.isActive||this.isAnimating?"":" yeti-modal-overlay__inert";e+=this.isOpening?" yeti-modal__opening":"";e+=this.hasOpened?" yeti-modal__open":"";e+=this.isClosing?" yeti-modal__closing":"";s+=this.size==""?"":` yeti-modal-size-${this.size}`;s+=this.modalClass!=""?` ${this.modalClass}`:"";s+=this.isScrollable?"":" yeti-modal__unscrollable";return t("div",{key:"10d03454f501270f4a504b362596cb0441ecf7ca",class:e},t("div",{key:"cf04b51781edd084b7a72de69da470ce3ad7a745",class:"yeti-modal-bumper-front",tabIndex:0}),t("div",Object.assign({key:"2ebda62c372ea16976039ade1496364dd955c5f6",class:s},i),t("div",{key:"a60f7cc3b336da29cb22671d3336cf869f5e31a8",class:"yeti-modal-header"},t("h1",{key:"65c36bd8baef947de0e2bff124e4e8dfae9afd2c",class:"yeti-modal-header-heading",id:this.headingId},this.heading),t("div",{key:"2c775acab42a8df6d05e2d046b5541fee3197c95",class:"yeti-modal-header-action"},t("slot",{key:"6c2832ff1987b4d8137e116b5d34413c94bb2551",name:"header_action"})),this.showClose?t("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},t("span",{class:"material-icons"},"close")):null),t("div",{key:"38a27a4645c19b37942f3ece0c43b62840c25bcc",class:"yeti-modal-content"},t("div",{key:"0eb5c57773cc27815157c98542120a85f0edeff8",class:"yeti-modal-content-actual"},t("slot",{key:"047e71a13beeede0d6cbc4a588285c07e6ef75b2",name:"content"})),t("div",{key:"6c010eef78a99164ee914de0395fb74caf9ee11f",class:"yeti-modal-content-fade"})),t("div",{key:"a10fbfd852f116cef8ce1c14eb4e92c113c6acb7",class:"yeti-modal-actions"},t("div",{key:"a312a9e6b8081c2618dbce42fc8d53b2073b1459",class:"yeti-modal-actions-buttons"},t("slot",{key:"458bdfa15dbbebda1ec570d63b6592e5dfd1bf2b",name:"buttons"})))),t("div",{key:"645bf6f181eb6f66818def0d5053bd79f843b64c",class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}if(this.isAnimating){if(this.isActive){setTimeout((()=>{this.isOpening=true;this.isClosing=false}),1)}else{setTimeout((()=>{this.isOpening=false;this.hasOpened=false;this.isClosing=true}),1)}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let e=this.el.querySelector(".yeti-modal-bumper-front");let t=this.el.querySelector(".yeti-modal-bumper-back");e.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));t.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-db5b2f65.entry.js.map