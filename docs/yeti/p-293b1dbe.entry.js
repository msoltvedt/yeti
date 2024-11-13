import{r as e,h as t,g as s}from"./p-0d1be970.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.hasOpened=false;this.headingId=i.generateUniqueId();this.isSideSheet=false;this.heading="Modal Heading";this.describedBy="";this.size="";this.modalClass="";this.isScrollable=true;this.isActive=false;this.showClose=true;this.isAnimating=false;this.isOpening=false;this.isClosing=false}handleFocus(e){if(!this.isSideSheet){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}else{if(e){this.setBackgroundElementStyles(true);this.isAnimating=true}else{this.isAnimating=true}}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive&&e.keyCode==27&&this.showClose){this.isActive=false}}handleTransitionEnd(e){if(!e.propertyName||e.propertyName!="transform"){return}if(this.isOpening){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus();this.isOpening=false;this.hasOpened=true}else if(this.isClosing){this.setBackgroundElementStyles(false);if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}this.isClosing=false}this.isAnimating=false}handleInitialFocus(){let e=this.el.querySelector(".yeti-modal-content");let t=i.aria.focusFirstDescendant(e);if(!t){e.setAttribute("tabIndex","-1");e.focus()}}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");let a=this.el.querySelector("yeti-modal-header-action");if(!t){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{t.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(a){a.setAttribute("slot","header_action")}if(!e||e==""){e=i.generateUniqueId();this.el.setAttribute("id",e)}if(this.isActive){this.setBackgroundElementStyles(true)}}render(){let e=this.isSideSheet?"yeti-modal_ss-overlay":"yeti-modal-overlay";let s=`yeti-modal${this.isSideSheet?" yeti-modal_ss":""}`;let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}e+=this.isActive||this.isAnimating?"":" yeti-modal-overlay__inert";e+=this.isOpening?" yeti-modal__opening":"";e+=this.hasOpened?" yeti-modal__open":"";e+=this.isClosing?" yeti-modal__closing":"";s+=this.size==""?"":` yeti-modal-size-${this.size}`;s+=this.modalClass!=""?` ${this.modalClass}`:"";s+=this.isScrollable?"":" yeti-modal__unscrollable";return t("div",{key:"ca6fbc80c5a3a474cfadedc809f52d04d801802f",class:e},t("div",{key:"1be0a63159cc33c2ca40a56bc50787effe644e93",class:"yeti-modal-bumper-front",tabIndex:0}),t("div",Object.assign({key:"84645e8289eee5cdaf40fa26f4bdf5735e0b645a",class:s},i),t("div",{key:"c62a57c999d03261329559b6afd0787e657126fe",class:"yeti-modal-header"},t("h1",{key:"505bbe7ec2c2ee498a0da12032c7c5cdee2d2682",class:"yeti-modal-header-heading",id:this.headingId},this.heading),t("div",{key:"f763cd210d104d8045c914c99c0424e40a4174f6",class:"yeti-modal-header-action"},t("slot",{key:"2065ab34307f9d39d9cf6ea95339ac72786704f3",name:"header_action"})),this.showClose?t("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},t("span",{class:"material-icons"},"close")):null),t("div",{key:"0f6f9324d79329ba41c9cd285aa7b2fa295bf0d7",class:"yeti-modal-content"},t("div",{key:"37d16cbba36209503970af716f9bcd2324ba7426",class:"yeti-modal-content-actual"},t("slot",{key:"85d63d8649c72b62d96ce8dd89104089be53814a",name:"content"})),t("div",{key:"862808327bb5fecd3ef2469885cf71e646caade8",class:"yeti-modal-content-fade"})),t("div",{key:"c43fd0242ed57f26b7bb8615fefa4a05914edfa8",class:"yeti-modal-actions"},t("div",{key:"dacdbfe3b8be3ca8e871a3dbb1a2a84fd2b37ab6",class:"yeti-modal-actions-buttons"},t("slot",{key:"6e05d842611e31a658fddf5467e603e9a8e20748",name:"buttons"})))),t("div",{key:"22e9918f7e32c17008f861c3d1dc9f90c5462fae",class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}if(this.isAnimating){if(this.isActive){setTimeout((()=>{this.isOpening=true;this.isClosing=false}),1)}else{setTimeout((()=>{this.isOpening=false;this.hasOpened=false;this.isClosing=true}),1)}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let e=this.el.querySelector(".yeti-modal-bumper-front");let t=this.el.querySelector(".yeti-modal-bumper-back");e.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));t.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-293b1dbe.entry.js.map