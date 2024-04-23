import{r as i,c as t,h as s,g as e}from"./p-e8f90371.js";import{u as a}from"./p-943baa85.js";const c=class{constructor(s){i(this,s);this.notificationActionClick=t(this,"notificationActionClick",7);this.wrapperClass="";this.notificationType="";this.isLowContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.actionLabel="";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isVisible=true}handleCloseClick(i){this.isVisible=false;i.stopImmediatePropagation();i.preventDefault()}handleActionClick(i){this.notificationActionClick.emit();i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=a.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i=this.iconAltText;let t=this.iconCode;let e="yeti-notification";e+=this.wrapperClass!==""?` ${this.wrapperClass}`:``;switch(this.notificationType){case"error":e+=" yeti-notification-error";i=i!=""?i:"Error";t=t!=""?t:"error";break;case"info":e+=" yeti-notification-info";i=i!=""?i:"Information";t=t!=""?t:"info";break;case"success":e+=" yeti-notification-success";i=i!=""?i:"Success";t=t!=""?t:"check_circle";break;case"warning":e+=" yeti-notification-warning";i=i!=""?i:"Warning";t=t!=""?t:"error";break;case"warningAlt":e+=" yeti-notification-warning_alt";i=i!=""?i:"Warning";t=t!=""?t:"warning";break;case"":default:i=i!=""?i:"Error";t=t!=""?t:"error";break}e+=this.isLowContrast?" yeti-notification-low_contrast":"";e+=this.isVisible?"":" yeti-notification__hidden";return s("div",{key:"4dd28cab37f623d6d4dca95c0e03a7c1c3924008",class:e,id:this.notificationId,role:"status"},s("div",{key:"316d0db70b62276ea29923dfde3a7e435800d014",class:"yeti-notification-icon"},s("span",{key:"a99a1c6cf4ada17e344908c9c05252b3b9f10345",class:"material-icons","aria-hidden":"true"},t),s("span",{key:"42581c7a942f0ca8acf2503df552b496e06c30fe",class:"yeti-a11y-hidden"},i)),s("div",{key:"ff1b4952c775b605257fdc9f0ecf79a92628377a",class:"yeti-notification-content"},this.textTitle!=""?s("div",{class:"yeti-notification-content-title"},this.textTitle):"",s("div",{key:"f05c6ba813f66ef60e6c6191b2b8d5a79e18c580",class:"yeti-notification-content-subtitle"},s("slot",{key:"6050d2b44b156d05b943b3235d0a1ee925bc30cc"}))),this.actionLabel!=""?s("button",{class:"yeti-notification-action",onClick:i=>this.handleActionClick(i)},this.actionLabel):"",this.showCloseButton?s("button",{class:"yeti-notification-close",onClick:i=>this.handleCloseClick(i)},s("span",{class:"material-icons"},"close")):"")}get el(){return e(this)}};export{c as yeti_notification};
//# sourceMappingURL=p-546bdea3.entry.js.map