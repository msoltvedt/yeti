import{r as t,c as s,h as i,g as e}from"./p-39d3f65a.js";import{u as a}from"./p-943baa85.js";const c=class{constructor(i){t(this,i);this.toastActionClick=s(this,"toastActionClick",7);this.actualClass="";this.toastType="";this.isHighContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.size="";this.actionLabel="";this.slotId="";this.toastId="";this.closesSelfAfter=0;this.iLoveJSX=false;this.isVisible=true;this.isClosing=true}handleCloseClick(t){this.isVisible=false;t.stopImmediatePropagation();t.preventDefault()}handleActionClick(t){this.toastActionClick.emit();t.stopImmediatePropagation();t.preventDefault()}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=a.generateUniqueId();this.el.setAttribute("id",t)}this.toastId=this.toastId!=""?this.toastId:`${t}_tip`;this.slotId=this.slotId!=""?this.slotId:`${t}_slot`;if(this.closesSelfAfter>0){setTimeout((()=>{this.isVisible=false}),this.closesSelfAfter)}}render(){let t=this.iconAltText;let s=this.iconCode;let e="yeti-toast-wrapper";let a="yeti-toast";a+=this.size=="full"?" yeti-toast_full":"";a+=this.actualClass!==""?` ${this.actualClass}`:``;switch(this.toastType){case"error":a+=" yeti-toast-error";t=t!=""?t:"Error";s=s!=""?s:"error";break;case"info":a+=" yeti-toast-info";t=t!=""?t:"Information";s=s!=""?s:"info";break;case"success":a+=" yeti-toast-success";t=t!=""?t:"Success";s=s!=""?s:"check_circle";break;case"warning":a+=" yeti-toast-warning";t=t!=""?t:"Warning";s=s!=""?s:"error";break;case"warningAlt":a+=" yeti-toast-warning_alt";t=t!=""?t:"Warning";s=s!=""?s:"warning";break;case"":default:t=t!=""?t:"Error";s=s!=""?s:"error";break}a+=this.isHighContrast?" yeti-toast-high_contrast":"";a+=this.isVisible?"":" yeti-toast__hidden";return i("div",{key:"d8ea82324c5e582642ba4d259ae450010f1553df",class:e},i("div",{key:"a2fc43bba09466518d1aa34c198fbfeb54565fa7",class:a,id:this.toastId,role:"status"},i("div",{key:"ef2be2d520114877a781df4d4f7d8f1b3739be4d",class:"yeti-toast-icon"},i("span",{key:"51b94d945fa2f398b8874a5f945f083cc8a7799c",class:"material-icons","aria-hidden":"true"},s),i("span",{key:"3090188a0ffa925468611b13dc5df8b8259844c8",class:"yeti-a11y-hidden"},t)),i("div",{key:"b70c459ec94d7ba5bac52c704fd07acc9e1aedb2",class:"yeti-toast-content"},i("div",{key:"fefac67067ba462e405e8c04769887b4290bc671",class:"yeti-toast-content-text"},this.textTitle!=""?i("div",{class:"yeti-toast-content-text-title"},this.textTitle):"",i("div",{key:"e8c4375169d6311f8c866388d9663375f88bc2d3",class:"yeti-toast-content-text-copy"},i("slot",{key:"3e0699bc335185185d2e1bf63e573d7b628d97cd"}))),this.actionLabel!=""?i("button",{class:"yeti-toast-action yeti-button yeti-button-tertiary yeti-button-size-xs",onClick:t=>this.handleActionClick(t)},this.actionLabel):""),this.showCloseButton?i("button",{class:"yeti-toast-close",onClick:t=>this.handleCloseClick(t)},i("span",{class:"material-icons"},"close")):""))}get el(){return e(this)}};export{c as yeti_toast};
//# sourceMappingURL=p-b01986ba.entry.js.map