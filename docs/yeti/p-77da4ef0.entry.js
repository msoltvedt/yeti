import{r as i,c as t,h as s,g as e}from"./p-e8f90371.js";import{u as a}from"./p-943baa85.js";const n=class{constructor(s){i(this,s);this.notificationActionClick=t(this,"notificationActionClick",7);this.wrapperClass="";this.notificationType="";this.isLowContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.actionLabel="";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isVisible=true}handleCloseClick(i){this.isVisible=false;i.stopImmediatePropagation();i.preventDefault()}handleActionClick(i){this.notificationActionClick.emit();i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=a.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i=this.iconAltText;let t=this.iconCode;let e="yeti-notification";e+=this.wrapperClass!==""?` ${this.wrapperClass}`:``;switch(this.notificationType){case"error":e+=" yeti-notification-error";i=i!=""?i:"Error";t=t!=""?t:"error";break;case"info":e+=" yeti-notification-info";i=i!=""?i:"Information";t=t!=""?t:"info";break;case"success":e+=" yeti-notification-success";i=i!=""?i:"Success";t=t!=""?t:"check_circle";break;case"warning":e+=" yeti-notification-warning";i=i!=""?i:"Warning";t=t!=""?t:"error";break;case"warningAlt":e+=" yeti-notification-warning_alt";i=i!=""?i:"Warning";t=t!=""?t:"warning";break;case"":default:i=i!=""?i:"Error";t=t!=""?t:"error";break}e+=this.isLowContrast?" yeti-notification-low_contrast":"";e+=this.isVisible?"":" yeti-notification__hidden";return s("div",{key:"7a50505e755d36ffe39ff9355dc53b6d5c01c67b",class:e,id:this.notificationId,role:"status"},s("div",{key:"4cb9431a9b2dd585d436a1672b9818683b049bda",class:"yeti-notification-icon"},s("span",{key:"2a7c32d114a1466e968641c3dba3b95a5e8ee088",class:"material-icons","aria-hidden":"true"},t),s("span",{key:"ca844548d798607ea696bbe948890509e9b97758",class:"yeti-a11y-hidden"},i)),s("div",{key:"bb5777a4085ff7640f81769e7458a1c6a910c791",class:"yeti-notification-content"},this.textTitle!=""?s("div",{class:"yeti-notification-content-title"},this.textTitle):"",s("div",{key:"9047be3d8d61a34d9b752659fe64cc1fa1e57b68",class:"yeti-notification-content-subtitle"},s("slot",{key:"017204d0a51943159269a86fc3281bdf7f110692"}))),this.actionLabel!=""?s("button",{class:"yeti-notification-action",onClick:i=>this.handleActionClick(i)},this.actionLabel):"",this.showCloseButton?s("button",{class:"yeti-notification-close",onClick:i=>this.handleCloseClick(i)},s("span",{class:"material-icons"},"close")):"")}get el(){return e(this)}};export{n as yeti_notification};
//# sourceMappingURL=p-77da4ef0.entry.js.map