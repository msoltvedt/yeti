import{r as e,h as t,g as s}from"./p-e8f90371.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.hasOpened=false;this.headingId=i.generateUniqueId();this.isSideSheet=false;this.heading="Modal Heading";this.describedBy="";this.size="";this.modalClass="";this.isScrollable=true;this.isActive=false;this.showClose=true;this.isAnimating=false;this.isOpening=false;this.isClosing=false}handleFocus(e){if(!this.isSideSheet){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}else{if(e){this.setBackgroundElementStyles(true);this.isAnimating=true}else{this.isAnimating=true}}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive&&e.keyCode==27&&this.showClose){this.isActive=false}}handleTransitionEnd(e){if(!e.propertyName||e.propertyName!="transform"){return}if(this.isOpening){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus();this.isOpening=false;this.hasOpened=true}else if(this.isClosing){this.setBackgroundElementStyles(false);if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}this.isClosing=false}this.isAnimating=false}handleInitialFocus(){let e=this.el.querySelector(".yeti-modal-content");let t=i.aria.focusFirstDescendant(e);if(!t){e.setAttribute("tabIndex","-1");e.focus()}}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");let a=this.el.querySelector("yeti-modal-header-action");if(!t){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{t.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(a){a.setAttribute("slot","header_action")}if(!e||e==""){e=i.generateUniqueId();this.el.setAttribute("id",e)}if(this.isActive){this.setBackgroundElementStyles(true)}}render(){let e=this.isSideSheet?"yeti-modal_ss-overlay":"yeti-modal-overlay";let s=`yeti-modal${this.isSideSheet?" yeti-modal_ss":""}`;let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}e+=this.isActive||this.isAnimating?"":" yeti-modal-overlay__inert";e+=this.isOpening?" yeti-modal__opening":"";e+=this.hasOpened?" yeti-modal__open":"";e+=this.isClosing?" yeti-modal__closing":"";s+=this.size==""?"":` yeti-modal-size-${this.size}`;s+=this.modalClass!=""?` ${this.modalClass}`:"";s+=this.isScrollable?"":" yeti-modal__unscrollable";return t("div",{key:"69c50cf9867f8d077e0ff33ee4fb2d7809888b39",class:e},t("div",{key:"bb6314756ade9d22c376417af0a00a345489941b",class:"yeti-modal-bumper-front",tabIndex:0}),t("div",Object.assign({key:"64a53e8f87b42e7cbbee4f8466432f21d8aa34f7",class:s},i),t("div",{key:"c52d85bccfecc78abf9f037b53df825d8f305325",class:"yeti-modal-header"},t("h1",{key:"096ed1af6b4fa0755c5719e42dcd3950c4380c52",class:"yeti-modal-header-heading",id:this.headingId},this.heading),t("div",{key:"08e959c9e463c94f83515a0e2542ea624b3852fc",class:"yeti-modal-header-action"},t("slot",{key:"31f4a2ab880eb0865474036b53985ea169465168",name:"header_action"})),this.showClose?t("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},t("span",{class:"material-icons"},"close")):null),t("div",{key:"996c279b37ce021dd9b982f924737ccb2d3d5e5a",class:"yeti-modal-content"},t("slot",{key:"2526c2359bc24f61e4fd839d0fb97034afe0a1be",name:"content"}),t("div",{key:"464bb3bdcd167f379cdbd19ffb06a09bbca5c660",class:"yeti-modal-content-fade"})),t("div",{key:"eae65337885ac9f6e8f0cfe09961f4453fffb990",class:"yeti-modal-actions"},t("div",{key:"0c5c9000c0c2310c18a5fb50d5c89681d9779ae8",class:"yeti-modal-actions-buttons"},t("slot",{key:"39aac8fc841536861b3d4b974f61c6f452f9782b",name:"buttons"})))),t("div",{key:"e31e179e404e12cc6585825387e8db4855a5bc39",class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}if(this.isAnimating){if(this.isActive){setTimeout((()=>{this.isOpening=true;this.isClosing=false}),1)}else{setTimeout((()=>{this.isOpening=false;this.hasOpened=false;this.isClosing=true}),1)}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let e=this.el.querySelector(".yeti-modal-bumper-front");let t=this.el.querySelector(".yeti-modal-bumper-back");e.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));t.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-d6365f6c.entry.js.map