import{r as t,c as s,h as i,g as e}from"./p-39d3f65a.js";import{u as a}from"./p-943baa85.js";const c=class{constructor(i){t(this,i);this.toastActionClick=s(this,"toastActionClick",7);this.actualClass="";this.toastType="";this.isHighContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.size="";this.actionLabel="";this.slotId="";this.toastId="";this.closesSelfAfter=0;this.iLoveJSX=false;this.isClosed=false}handleCloseClick(t){t.stopImmediatePropagation();t.preventDefault();this.isClosed=true}handleActionClick(t){this.toastActionClick.emit();t.stopImmediatePropagation();t.preventDefault()}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=a.generateUniqueId();this.el.setAttribute("id",t)}this.toastId=this.toastId!=""?this.toastId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`;if(this.closesSelfAfter>0){setTimeout((()=>{this.isClosed=true}),this.closesSelfAfter)}}render(){let t=this.iconAltText;let s=this.iconCode;let e="yeti-toast-wrapper";let a="yeti-toast";a+=this.size=="full"?" yeti-toast_full":"";a+=this.actualClass!==""?` ${this.actualClass}`:``;e+=this.isClosed?" yeti-toast-wrapper__closed":"";switch(this.toastType){case"error":a+=" yeti-toast-error";t=t!=""?t:"Error";s=s!=""?s:"error";break;case"success":a+=" yeti-toast-success";t=t!=""?t:"Success";s=s!=""?s:"check_circle";break;case"warning":a+=" yeti-toast-warning";t=t!=""?t:"Warning";s=s!=""?s:"warning";break;case"":case"info":default:a+=" yeti-toast-info";t=t!=""?t:"Information";s=s!=""?s:"info";break}a+=this.isHighContrast?" yeti-toast-high_contrast":"";return i("div",{key:"a562bcfcaa7a1e606b93e6461d605908fffe58d6",class:e},i("div",{key:"a9f3ef123eab4d0bdc0f3a0c82ddfd3b982bb036",class:a,id:this.toastId,role:"status"},i("div",{key:"963137c87c2f828c8f0571c8f95dca624bab03c7",class:"yeti-toast-icon"},i("span",{key:"774c8ee078c6b119698f39ad75d72d2be6d5d38c",class:"material-icons","aria-hidden":"true"},s),i("span",{key:"63495b32a80fb8bcc525c8fb80aef10f4b8f0633",class:"yeti-a11y-hidden"},t)),i("div",{key:"58714fd57b98bcc5dfd3f1bd8c37c6a5eba51945",class:"yeti-toast-content"},i("div",{key:"1f6a3f599969c8cab27523bc54657dddb72c2f14",class:"yeti-toast-content-text"},this.textTitle!=""?i("div",{class:"yeti-toast-content-text-title"},this.textTitle):"",i("div",{key:"f2318de2195d67868e405265e8100a83b5f9eabf",class:"yeti-toast-content-text-copy"},i("slot",{key:"697d2d2168cf5e598324cd92365992759faa6260"}))),this.actionLabel!=""?i("button",{class:"yeti-toast-action yeti-button yeti-button-tertiary yeti-button-size-xs",onClick:t=>this.handleActionClick(t)},this.actionLabel):""),this.showCloseButton?i("button",{class:"yeti-toast-close",onClick:t=>this.handleCloseClick(t)},i("span",{class:"material-icons"},"close")):""))}get el(){return e(this)}};export{c as yeti_toast};
//# sourceMappingURL=p-b53d888c.entry.js.map