import{r as t,c as s,h as e,g as i}from"./p-39d3f65a.js";import{u as a}from"./p-943baa85.js";const c=class{constructor(e){t(this,e);this.toastActionClick=s(this,"toastActionClick",7);this.actualClass="";this.toastType="";this.isHighContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.size="";this.actionLabel="";this.slotId="";this.toastId="";this.closesSelfAfter=0;this.iLoveJSX=false;this.isVisible=true;this.isClosed=false}handleCloseClick(t){this.isVisible=false;t.stopImmediatePropagation();t.preventDefault();this.isClosed=true}handleActionClick(t){this.toastActionClick.emit();t.stopImmediatePropagation();t.preventDefault()}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=a.generateUniqueId();this.el.setAttribute("id",t)}this.toastId=this.toastId!=""?this.toastId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`;if(this.closesSelfAfter>0){setTimeout((()=>{this.isVisible=false}),this.closesSelfAfter)}}render(){let t=this.iconAltText;let s=this.iconCode;let i="yeti-toast-wrapper";let a="yeti-toast";a+=this.size=="full"?" yeti-toast_full":"";a+=this.actualClass!==""?` ${this.actualClass}`:``;i+=this.isClosed?" yeti-toast-wrapper__closed":"";switch(this.toastType){case"error":a+=" yeti-toast-error";t=t!=""?t:"Error";s=s!=""?s:"error";break;case"info":a+=" yeti-toast-info";t=t!=""?t:"Information";s=s!=""?s:"info";break;case"success":a+=" yeti-toast-success";t=t!=""?t:"Success";s=s!=""?s:"check_circle";break;case"warning":a+=" yeti-toast-warning";t=t!=""?t:"Warning";s=s!=""?s:"error";break;case"warningAlt":a+=" yeti-toast-warning_alt";t=t!=""?t:"Warning";s=s!=""?s:"warning";break;case"":default:t=t!=""?t:"Error";s=s!=""?s:"error";break}a+=this.isHighContrast?" yeti-toast-high_contrast":"";a+=this.isVisible?"":" yeti-toast__hidden";return e("div",{key:"ebc10983ced1e31a5f789f75b47c8720a76996f1",class:i},e("div",{key:"695a23fe48537d99e221e9f3ed565bda54db37bc",class:a,id:this.toastId,role:"status"},e("div",{key:"d039e076ad70c5fe88e4f7d8d4195fee9639d758",class:"yeti-toast-icon"},e("span",{key:"8745102183a89c26ec0dead0bc7d6cad455cc5fc",class:"material-icons","aria-hidden":"true"},s),e("span",{key:"6f62a9ca6a87202a64682d39778c9422fc689cba",class:"yeti-a11y-hidden"},t)),e("div",{key:"546c4931598061ef82bde829e692502a10bc0dab",class:"yeti-toast-content"},e("div",{key:"942c01f06ca64a05d8d05dc544712cec4711adde",class:"yeti-toast-content-text"},this.textTitle!=""?e("div",{class:"yeti-toast-content-text-title"},this.textTitle):"",e("div",{key:"3dc38b890b4cdcce2cadd42dd09d57f043e5db6d",class:"yeti-toast-content-text-copy"},e("slot",{key:"386b9ba78693c08ac5d55919b00b62819dbaabb8"}))),this.actionLabel!=""?e("button",{class:"yeti-toast-action yeti-button yeti-button-tertiary yeti-button-size-xs",onClick:t=>this.handleActionClick(t)},this.actionLabel):""),this.showCloseButton?e("button",{class:"yeti-toast-close",onClick:t=>this.handleCloseClick(t)},e("span",{class:"material-icons"},"close")):""))}get el(){return i(this)}};export{c as yeti_toast};
//# sourceMappingURL=p-bd26aac9.entry.js.map