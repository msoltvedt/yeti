import{r as i,h as t,g as e}from"./p-d221c54b.js";import{u as s}from"./p-8bca4ff8.js";const l=class{constructor(t){i(this,t);this.previouslyFocusedElement=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.slottedContent=null;this.isModal=false;this.isActive=false}handleFocus(i){if(i){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}setBackgroundElementStyles(i){if(i){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(i){if(this.isActive){i.preventDefault()}}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=s.generateUniqueId();this.el.setAttribute("id",i)}}componentWillRender(){let i=this.el.innerHTML.trim();if(i!=""&&i!="\x3c!----\x3e"){this.slottedContent=i}else{this.slottedContent=null}console.log("componentWillRender ending",this.slottedContent)}render(){let i="yeti-modal-overlay yeti-modal-overlay-light";let e=t("div",{class:"yeti-loading",tabindex:"-1"},t("div",{class:"yeti-loading-icon"},t("svg",{class:"yeti-loading-icon-svg",viewBox:"0 0 100 100","aria-hidden":"true"},t("circle",{class:"yeti-loading-icon-svg-circle",cx:"50%",cy:"50%",r:"44"}))),t("div",{class:"yeti-loading-label"},"Loading..."),this.slottedContent==null||this.slottedContent!="\x3c!----\x3e"?t("div",null,"WTF"):t("div",{class:"yeti-loading-content"},t("slot",null)));i+=this.isActive?"":" yeti-modal-overlay__inert";return this.isModal?t("div",{class:i},t("div",{class:"yeti-modal yeti-modal-size-xs"},e)):e}componentDidRender(){if(this.shouldStealFocus){let i=this.el.getElementsByClassName("yeti-loading")[0];this.previouslyFocusedElement=document.activeElement;i.focus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}this.shouldStealFocus=false;this.shouldReturnFocus=false}get el(){return e(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{l as yeti_loading};
//# sourceMappingURL=p-af5f2bdf.entry.js.map