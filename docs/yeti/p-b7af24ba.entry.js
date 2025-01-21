import{r as i,c as t,h as s,g as e}from"./p-39d3f65a.js";import{u as a}from"./p-943baa85.js";const n=class{constructor(s){i(this,s);this.notificationActionClick=t(this,"notificationActionClick",7);this.wrapperClass="";this.notificationType="";this.isLowContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.size="";this.actionLabel="";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isVisible=true}handleCloseClick(i){this.isVisible=false;i.stopImmediatePropagation();i.preventDefault()}handleActionClick(i){this.notificationActionClick.emit();i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=a.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i=this.iconAltText;let t=this.iconCode;let e="yeti-notification";e+=this.size=="full"?" yeti-notification_full":"";e+=this.wrapperClass!==""?` ${this.wrapperClass}`:``;switch(this.notificationType){case"error":e+=" yeti-notification-error";i=i!=""?i:"Error";t=t!=""?t:"error";break;case"info":e+=" yeti-notification-info";i=i!=""?i:"Information";t=t!=""?t:"info";break;case"success":e+=" yeti-notification-success";i=i!=""?i:"Success";t=t!=""?t:"check_circle";break;case"warning":e+=" yeti-notification-warning";i=i!=""?i:"Warning";t=t!=""?t:"error";break;case"warningAlt":e+=" yeti-notification-warning_alt";i=i!=""?i:"Warning";t=t!=""?t:"warning";break;case"":default:i=i!=""?i:"Error";t=t!=""?t:"error";break}e+=this.isLowContrast?" yeti-notification-low_contrast":"";e+=this.isVisible?"":" yeti-notification__hidden";return s("div",{key:"e7162285acc9df0239a9ec06ece910b82f974d69",class:e,id:this.notificationId,role:"status"},s("div",{key:"27ff69a289e9e4e8f7f2e0215721a1368bf5ffe8",class:"yeti-notification-icon"},s("span",{key:"aab883da4ed2144b40f93ad4b461b24ad221e5e9",class:"material-icons","aria-hidden":"true"},t),s("span",{key:"ad28d11ba09ebb2b4445fcbf7ad6ab78ea60b54e",class:"yeti-a11y-hidden"},i)),s("div",{key:"b589f85ffe0f3b8c2f3d2af342f5d221805b506b",class:"yeti-notification-content"},this.textTitle!=""?s("div",{class:"yeti-notification-content-title"},this.textTitle):"",s("div",{key:"100677169693f0c5e677cbba76729eec23ec22b4",class:"yeti-notification-content-subtitle"},s("slot",{key:"7661e2f43a8125c785c5e368770e9ac047e58677"}))),this.actionLabel!=""?s("button",{class:"yeti-notification-action",onClick:i=>this.handleActionClick(i)},this.actionLabel):"",this.showCloseButton?s("button",{class:"yeti-notification-close",onClick:i=>this.handleCloseClick(i)},s("span",{class:"material-icons"},"close")):"")}get el(){return e(this)}};export{n as yeti_notification};
//# sourceMappingURL=p-b7af24ba.entry.js.map