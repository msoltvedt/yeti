import{r as t,h as e,g as s}from"./p-1e2113d3.js";import{u as i}from"./p-4ae56677.js";const a=class{constructor(e){t(this,e);this.previouslyFocusedElement=null;this.bodyInnerWrapper=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.headingId=i.generateUniqueId();this.heading="Modal Heading";this.describedBy="";this.size="";this.isActive=false}handleFocus(t){if(t){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}setBackgroundElementStyles(t){if(t){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(t){if(this.isActive&&t.keyCode==27){this.isActive=false}}handleInitialFocus(){let t=this.el.querySelector(".yeti-modal-content");let e=i.aria.focusFirstDescendant(t);if(!e){t.setAttribute("tabIndex","-1");t.focus()}}componentWillLoad(){let t=this.el.getAttribute("id");let e=this.el.querySelector("yeti-modal-content");let s=this.el.querySelector("yeti-modal-buttons");if(!e){console.error("Yeti Modal components must have a yeti-modal-content element.")}else{e.setAttribute("slot","content")}if(!s){console.error("Yeti Modal components must have a yeti-modal-buttons element.")}else{s.setAttribute("slot","buttons")}if(!t||t==""){t=i.generateUniqueId();this.el.setAttribute("id",t)}}render(){let t="yeti-modal-overlay";let s="yeti-modal";let i={role:"dialog","aria-modal":"true","aria-labelledby":this.headingId};if(this.describedBy!=""){i["aria-describedby"]=this.describedBy}t+=this.isActive?"":" yeti-modal-overlay__inert";s+=this.size==""?"":` yeti-modal-size-${this.size}`;return e("div",{class:t},e("div",{class:"yeti-modal-bumper-front",tabIndex:0}),e("div",Object.assign({class:s},i),e("div",{class:"yeti-modal-header"},e("h1",{class:"yeti-modal-header-heading",id:this.headingId},this.heading),e("button",{class:"yeti-modal-header-close yeti-button-ghost",onClick:()=>{this.isActive=false}},e("span",{class:"material-icons"},"close"))),e("div",{class:"yeti-modal-content"},e("slot",{name:"content"}),e("div",{class:"yeti-modal-content-fade"})),e("div",{class:"yeti-modal-actions"},e("div",{class:"yeti-modal-actions-buttons"},e("slot",{name:"buttons"})))),e("div",{class:"yeti-modal-bumper-back",tabIndex:0}))}componentDidRender(){if(this.shouldStealFocus){this.previouslyFocusedElement=document.activeElement;this.handleInitialFocus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}this.shouldStealFocus=false;this.shouldReturnFocus=false}componentDidLoad(){let t=this.el.querySelector(".yeti-modal-bumper-front");let e=this.el.querySelector(".yeti-modal-bumper-back");t.addEventListener("focus",(()=>{i.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"))}));e.addEventListener("focus",(()=>{i.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"))}))}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_modal};
//# sourceMappingURL=p-395ac452.entry.js.map