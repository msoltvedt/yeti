import{r as e,h as i,g as s}from"./p-39d3f65a.js";import{u as t}from"./p-943baa85.js";const a=class{constructor(i){e(this,i);this.previouslyFocusedElement=null;this.shouldStealFocus=false;this.shouldReturnFocus=false;this.slottedContent=null;this.isInline=false;this.isModal=false;this.isActive=false}handleFocus(e){if(e){this.shouldStealFocus=true;this.setBackgroundElementStyles(true)}else{this.shouldReturnFocus=true;this.setBackgroundElementStyles(false)}}setBackgroundElementStyles(e){if(e){document.body.classList.add("yeti-modal-has_active_modal")}else{document.body.classList.remove("yeti-modal-has_active_modal")}}focusTrap(e){if(this.isActive){e.preventDefault()}}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=t.generateUniqueId();this.el.setAttribute("id",e)}let i=this.el.innerHTML.trim();if(i!=""&&i!="\x3c!----\x3e"){this.slottedContent=i}else{this.slottedContent=null}}render(){let e="yeti-modal-overlay yeti-modal-overlay-light";let s=i("div",{key:"1ac443e3792c58a44e57219d5f35ff8f1597e022",class:"yeti-loading",tabindex:"-1"},i("div",{key:"86b5073f2a1c8dd08b01956d73e6931b8369faa5",class:"yeti-loading-icon"},i("svg",{key:"eee1df29d4b61e12ae566a4d5264287c427894df",class:"yeti-loading-icon-svg",viewBox:"0 0 100 100","aria-hidden":"true"},i("circle",{key:"7ea3794d98e1b31fffcb06ecee4c64456f04519f",class:"yeti-loading-icon-svg-circle",cx:"50%",cy:"50%",r:"44"}))),i("div",{key:"8f4dafb3722bf7721a3d48e5c788ffe2f2d85209",class:"yeti-loading-label"},"Loading..."),this.slottedContent==null&&this.slottedContent!="\x3c!----\x3e"?"":i("div",{class:"yeti-loading-content"},i("slot",null)));let t=i("div",{key:"fbfdf2b4b634b02808f2325a39ab09adb33896c8",class:"yeti-loading_inline"},i("div",{key:"cb60dcc2df55b8e9465f97299ec24bf9e9f464bf",class:"yeti-loading_inline-icon"},i("svg",{key:"245148693bc3830457d335796a3c1066038d3477",class:"yeti-loading_inline-icon-svg",viewBox:"0 0 100 100"},i("circle",{key:"1ac2358d296395f28641743f44d8b699c368c1f6",class:"yeti-loading_inline-icon-svg-background",cx:"50%",cy:"50%",r:"44"}),i("circle",{key:"7c974e7e4aa9ee3255f824f08261d36ff622dd52",class:"yeti-loading_inline-icon-svg-stroke",cx:"50%",cy:"50%",r:"44"}))),i("div",{key:"4c9c1d9d7fc0bc5d571869f201ca33d6d5f20e1b",class:"yeti-loading_inline-label"},"Loading..."));e+=this.isActive?"":" yeti-modal-overlay__inert";return this.isModal?i("div",{class:e},i("div",{class:"yeti-modal yeti-modal-size-xs"},s)):this.isInline?t:s}componentDidRender(){if(this.shouldStealFocus){let e=this.el.getElementsByClassName("yeti-loading")[0];this.previouslyFocusedElement=document.activeElement;e.focus()}if(this.shouldReturnFocus){if(this.previouslyFocusedElement){this.previouslyFocusedElement.focus()}}this.shouldStealFocus=false;this.shouldReturnFocus=false}get el(){return s(this)}static get watchers(){return{isActive:["handleFocus"]}}};export{a as yeti_loading};
//# sourceMappingURL=p-78b25923.entry.js.map