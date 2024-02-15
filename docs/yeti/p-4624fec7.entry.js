import{r as i,h as t,g as s}from"./p-d221c54b.js";import{u as e}from"./p-8bca4ff8.js";const l=class{constructor(t){i(this,t);this.previouslyFocusedElement=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.isModal=false;this.isActive=false}handleFocus(i){if(i){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}setBackgroundElementStyles(i){if(i){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(i){if(this.isActive){i.preventDefault()}}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=e.generateUniqueId();this.el.setAttribute("id",i)}}render(){let i="yeti-modal-overlay yeti-modal-overlay-light";let s=t("div",{class:"yeti-loading",tabindex:"-1"},t("div",{class:"yeti-loading-icon"},t("svg",{class:"yeti-loading-icon-svg",viewBox:"0 0 100 100","aria-hidden":"true"},t("circle",{class:"yeti-loading-icon-svg-circle",cx:"50%",cy:"50%",r:"44"}))),t("div",{class:"yeti-loading-label"},"Loading..."),t("div",{class:"yeti-loading-content"},t("slot",null)));i+=this.isActive?"":" yeti-modal-overlay__inert";return this.isModal?t("div",{class:i},t("div",{class:"yeti-modal yeti-modal-size-xs"},s)):s}componentDidRender(){if(this.shouldStealFocus){let i=this.el.getElementsByClassName("yeti-loading")[0];this.previouslyFocusedElement=document.activeElement;i.focus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}this.shouldStealFocus=false;this.shouldReturnFocus=false}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{l as yeti_loading};
//# sourceMappingURL=p-4624fec7.entry.js.map