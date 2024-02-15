import{r as t,h as i,g as e}from"./p-d221c54b.js";import{u as s}from"./p-8bca4ff8.js";const l=class{constructor(i){t(this,i);this.previouslyFocusedElement=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.isModal=false;this.isActive=false}handleFocus(t){if(t){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}setBackgroundElementStyles(t){if(t){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(t){if(this.isActive){t.preventDefault()}}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=s.generateUniqueId();this.el.setAttribute("id",t)}}componentWillRender(){let t=this.el.innerHTML;if(t!=""){console.log("There's slotted content!",t,this.el)}else{console.log("No slotted content here.",this.el)}}render(){let t="yeti-modal-overlay yeti-modal-overlay-light";let e=i("div",{class:"yeti-loading",tabindex:"-1"},i("div",{class:"yeti-loading-icon"},i("svg",{class:"yeti-loading-icon-svg",viewBox:"0 0 100 100","aria-hidden":"true"},i("circle",{class:"yeti-loading-icon-svg-circle",cx:"50%",cy:"50%",r:"44"}))),i("div",{class:"yeti-loading-label"},"Loading..."),i("div",{class:"yeti-loading-content"},i("slot",null)));t+=this.isActive?"":" yeti-modal-overlay__inert";return this.isModal?i("div",{class:t},i("div",{class:"yeti-modal yeti-modal-size-xs"},e)):e}componentDidRender(){if(this.shouldStealFocus){let t=this.el.getElementsByClassName("yeti-loading")[0];this.previouslyFocusedElement=document.activeElement;t.focus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}this.shouldStealFocus=false;this.shouldReturnFocus=false}get el(){return e(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{l as yeti_loading};
//# sourceMappingURL=p-6b3f5c34.entry.js.map