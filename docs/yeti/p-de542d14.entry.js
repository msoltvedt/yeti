import{r as e,h as i,g as a}from"./p-0d1be970.js";import{u as s}from"./p-943baa85.js";const t=class{constructor(i){e(this,i);this.previouslyFocusedElement=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.slottedContent=null;this.isInline=false;this.isModal=false;this.isActive=false}handleFocus(e){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive){e.preventDefault()}}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=s.generateUniqueId();this.el.setAttribute("id",e)}let i=this.el.innerHTML.trim();if(i!=""&&i!="\x3c!----\x3e"){this.slottedContent=i}else{this.slottedContent=null}}render(){let e="yeti-modal-overlay yeti-modal-overlay-light";let a=i("div",{key:"aad215913ffd98383997224994e52214ab4c0a3f",class:"yeti-loading",tabindex:"-1"},i("div",{key:"83b6ab67a51814b7669929119aba8cdaa601aaf2",class:"yeti-loading-icon"},i("svg",{key:"e9ccc44e44b7524d64f094424237d4145dc2b9a6",class:"yeti-loading-icon-svg",viewBox:"0 0 100 100","aria-hidden":"true"},i("circle",{key:"a1db62695564da53995f0c49f1ad57fb237f7dc1",class:"yeti-loading-icon-svg-circle",cx:"50%",cy:"50%",r:"44"}))),i("div",{key:"5b29c14b9bb9b1960e9311943ac0e0ce710e6743",class:"yeti-loading-label"},"Loading..."),this.slottedContent==null&&this.slottedContent!="\x3c!----\x3e"?"":i("div",{class:"yeti-loading-content"},i("slot",null)));let s=i("div",{key:"15a397a7a3d561c3f54d9e36b084136748e1c2d4",class:"yeti-loading_inline"},i("div",{key:"99facdbc2c9abecb24e401924b28ff1423975aec",class:"yeti-loading_inline-icon"},i("svg",{key:"75c8f12cb767b9c4c5ab19d0d7eb6ee7c31ba796",class:"yeti-loading_inline-icon-svg",viewBox:"0 0 100 100"},i("circle",{key:"7053212fb172ee5118d738257bfe837d7868c75d",class:"yeti-loading_inline-icon-svg-background",cx:"50%",cy:"50%",r:"44"}),i("circle",{key:"3a1d7da3cbdd7db3fb72566020fd6cad974b7f96",class:"yeti-loading_inline-icon-svg-stroke",cx:"50%",cy:"50%",r:"44"}))),i("div",{key:"8cb0a5789b798ed7c31c10cd9b0fc9e15063a51c",class:"yeti-loading_inline-label"},"Loading..."));e+=this.isActive?"":" yeti-modal-overlay__inert";return this.isModal?i("div",{class:e},i("div",{class:"yeti-modal yeti-modal-size-xs"},a)):this.isInline?s:a}componentDidRender(){if(this.shouldStealFocus){let e=this.el.getElementsByClassName("yeti-loading")[0];this.previouslyFocusedElement=document.activeElement;e.focus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}this.shouldStealFocus=false;this.shouldReturnFocus=false}get el(){return a(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{t as yeti_loading};
//# sourceMappingURL=p-de542d14.entry.js.map