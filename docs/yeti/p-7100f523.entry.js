import{r as t,c as s,h as i,g as e}from"./p-39d3f65a.js";import{u as a}from"./p-943baa85.js";const c=class{constructor(i){t(this,i);this.toastActionClick=s(this,"toastActionClick",7);this.actualClass="";this.toastType="";this.isHighContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.size="";this.actionLabel="";this.slotId="";this.toastId="";this.closesSelfAfter=0;this.iLoveJSX=false;this.isVisible=true;this.isClosed=false}handleCloseClick(t){this.isVisible=false;t.stopImmediatePropagation();t.preventDefault();this.isClosed=true}handleActionClick(t){this.toastActionClick.emit();t.stopImmediatePropagation();t.preventDefault()}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=a.generateUniqueId();this.el.setAttribute("id",t)}this.toastId=this.toastId!=""?this.toastId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`;if(this.closesSelfAfter>0){setTimeout((()=>{this.isVisible=false}),this.closesSelfAfter)}}render(){let t=this.iconAltText;let s=this.iconCode;let e="yeti-toast";e+=this.size=="full"?" yeti-toast_full":"";e+=this.actualClass!==""?` ${this.actualClass}`:``;e+=this.isClosed?" yeti-toast__closed":"";switch(this.toastType){case"error":e+=" yeti-toast-error";t=t!=""?t:"Error";s=s!=""?s:"error";break;case"info":e+=" yeti-toast-info";t=t!=""?t:"Information";s=s!=""?s:"info";break;case"success":e+=" yeti-toast-success";t=t!=""?t:"Success";s=s!=""?s:"check_circle";break;case"warning":e+=" yeti-toast-warning";t=t!=""?t:"Warning";s=s!=""?s:"error";break;case"warningAlt":e+=" yeti-toast-warning_alt";t=t!=""?t:"Warning";s=s!=""?s:"warning";break;case"":default:t=t!=""?t:"Error";s=s!=""?s:"error";break}e+=this.isHighContrast?" yeti-toast-high_contrast":"";return i("div",{key:"c6414651e4328a706f10a670b20baa073664617d",class:e,id:this.toastId,role:"status"},i("div",{key:"cf980b3e42895ac0d555f3b33cb5b50f2b231f67",class:"yeti-toast-icon"},i("span",{key:"6aa36ca40b10c4e58f3b0a8fb40db1bd753b26e2",class:"material-icons","aria-hidden":"true"},s),i("span",{key:"5d1f1ada95c9c4ee2e23c458cbd8a9668d376ca1",class:"yeti-a11y-hidden"},t)),i("div",{key:"2c8ff03dedc7ac6dc962401e61cde33b7bd7d919",class:"yeti-toast-content"},i("div",{key:"fa4c4ece04b93c21ec17f987bb4d904799177d1f",class:"yeti-toast-content-text"},this.textTitle!=""?i("div",{class:"yeti-toast-content-text-title"},this.textTitle):"",i("div",{key:"101e81cf9896c0304a730473356e6d0610842678",class:"yeti-toast-content-text-copy"},i("slot",{key:"129dd81d362c393e7b18473c1946232fc3710eff"}))),this.actionLabel!=""?i("button",{class:"yeti-toast-action yeti-button yeti-button-tertiary yeti-button-size-xs",onClick:t=>this.handleActionClick(t)},this.actionLabel):""),this.showCloseButton?i("button",{class:"yeti-toast-close",onClick:t=>this.handleCloseClick(t)},i("span",{class:"material-icons"},"close")):"")}get el(){return e(this)}};export{c as yeti_toast};
//# sourceMappingURL=p-7100f523.entry.js.map