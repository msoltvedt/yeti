import{r as i,h as t,g as s}from"./p-d221c54b.js";import{u as n}from"./p-8bca4ff8.js";const a=class{constructor(t){i(this,t);this.wrapperCSS="";this.notificationType="";this.isLowContrast=false;this.iconAltText="";this.textTitle="Mmmm Toast!";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isVisible=true}handleCloseClick(i){this.isVisible=false;i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=n.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i="yeti-notification";i+=this.wrapperCSS!==""?` ${this.wrapperCSS}`:``;switch(this.notificationType){case"error":i+=" yeti-notification-error";break;case"info":i+=" yeti-notification-info";break;case"success":i+=" yeti-notification-success";break;case"warning":i+=" yeti-notification-warning";break;case"warningAlt":i+=" yeti-notification-warning_alt";break}console.log(i);i+=this.isLowContrast?" yeti-notification-low_contrast":"";return t("div",{class:i,id:this.notificationId,role:"status"},t("div",{class:"yeti-notification-icon"},t("span",{class:"material-icons","aria-hidden":"true"},"error"),t("span",{class:"yeti-a11y-hidden"},"Error")),t("div",{class:"yeti-notification-content"},t("div",{class:"yeti-notification-content-title"},this.textTitle),t("div",{class:"yeti-notification-content-subtitle"},t("slot",null))),t("button",{class:"yeti-notification-close"},t("span",{class:"material-icons"},"close")))}get el(){return s(this)}};export{a as yeti_notification};
//# sourceMappingURL=p-c2e9c554.entry.js.map