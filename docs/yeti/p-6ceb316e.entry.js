import{r as i,c as t,h as s,g as e}from"./p-0d1be970.js";import{u as a}from"./p-943baa85.js";const n=class{constructor(s){i(this,s);this.notificationActionClick=t(this,"notificationActionClick",7);this.wrapperClass="";this.notificationType="";this.isLowContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.size="";this.actionLabel="";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isVisible=true}handleCloseClick(i){this.isVisible=false;i.stopImmediatePropagation();i.preventDefault()}handleActionClick(i){this.notificationActionClick.emit();i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=a.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i=this.iconAltText;let t=this.iconCode;let e="yeti-notification";e+=this.size=="full"?" yeti-notification_full":"";e+=this.wrapperClass!==""?` ${this.wrapperClass}`:``;switch(this.notificationType){case"error":e+=" yeti-notification-error";i=i!=""?i:"Error";t=t!=""?t:"error";break;case"info":e+=" yeti-notification-info";i=i!=""?i:"Information";t=t!=""?t:"info";break;case"success":e+=" yeti-notification-success";i=i!=""?i:"Success";t=t!=""?t:"check_circle";break;case"warning":e+=" yeti-notification-warning";i=i!=""?i:"Warning";t=t!=""?t:"error";break;case"warningAlt":e+=" yeti-notification-warning_alt";i=i!=""?i:"Warning";t=t!=""?t:"warning";break;case"":default:i=i!=""?i:"Error";t=t!=""?t:"error";break}e+=this.isLowContrast?" yeti-notification-low_contrast":"";e+=this.isVisible?"":" yeti-notification__hidden";return s("div",{key:"e31645174f7827cf0a34573ba316e9b6492be61f",class:e,id:this.notificationId,role:"status"},s("div",{key:"fa341d3a904ab3ab80cbb960e9d048151a7ec2aa",class:"yeti-notification-icon"},s("span",{key:"b1efdc069b55242cb26e94e60693fcda6214f0db",class:"material-icons","aria-hidden":"true"},t),s("span",{key:"6a39bd955edba49cb3bb10abbfc190d0e92a65e2",class:"yeti-a11y-hidden"},i)),s("div",{key:"16e502795aa0b76f84f31671dd291778cd59b082",class:"yeti-notification-content"},this.textTitle!=""?s("div",{class:"yeti-notification-content-title"},this.textTitle):"",s("div",{key:"3596d260757e818955db08f27653eb3da91177b0",class:"yeti-notification-content-subtitle"},s("slot",{key:"dcd78def06f7bff26e7fbb02bc096b7e8e4a8b27"}))),this.actionLabel!=""?s("button",{class:"yeti-notification-action",onClick:i=>this.handleActionClick(i)},this.actionLabel):"",this.showCloseButton?s("button",{class:"yeti-notification-close",onClick:i=>this.handleCloseClick(i)},s("span",{class:"material-icons"},"close")):"")}get el(){return e(this)}};export{n as yeti_notification};
//# sourceMappingURL=p-6ceb316e.entry.js.map