import{r as i,c as t,h as s,g as e}from"./p-e8f90371.js";import{u as a}from"./p-943baa85.js";const c=class{constructor(s){i(this,s);this.notificationActionClick=t(this,"notificationActionClick",7);this.wrapperClass="";this.notificationType="";this.isLowContrast=false;this.showCloseButton=true;this.iconCode="";this.iconAltText="";this.textTitle="Mmmm Toast!";this.actionLabel="";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isVisible=true}handleCloseClick(i){this.isVisible=false;i.stopImmediatePropagation();i.preventDefault()}handleActionClick(i){this.notificationActionClick.emit();i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=a.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i=this.iconAltText;let t=this.iconCode;let e="yeti-notification";e+=this.wrapperClass!==""?` ${this.wrapperClass}`:``;switch(this.notificationType){case"error":e+=" yeti-notification-error";i=i!=""?i:"Error";t=t!=""?t:"error";break;case"info":e+=" yeti-notification-info";i=i!=""?i:"Information";t=t!=""?t:"info";break;case"success":e+=" yeti-notification-success";i=i!=""?i:"Success";t=t!=""?t:"check_circle";break;case"warning":e+=" yeti-notification-warning";i=i!=""?i:"Warning";t=t!=""?t:"error";break;case"warningAlt":e+=" yeti-notification-warning_alt";i=i!=""?i:"Warning";t=t!=""?t:"warning";break;case"":default:i=i!=""?i:"Error";t=t!=""?t:"error";break}e+=this.isLowContrast?" yeti-notification-low_contrast":"";e+=this.isVisible?"":" yeti-notification__hidden";return s("div",{key:"f91c19ff38ef53838d84e775feb97f29ef89b852",class:e,id:this.notificationId,role:"status"},s("div",{key:"4daf10fe6335454566b7174906e949dd29e4564b",class:"yeti-notification-icon"},s("span",{key:"4f7a3b7e5aa01efbbc04342190cba5d90c356298",class:"material-icons","aria-hidden":"true"},t),s("span",{key:"0f46caed6aa539fd5b1b0b50a1f48067285e84bd",class:"yeti-a11y-hidden"},i)),s("div",{key:"4643f8b8be5fe9e553603c1811db06e41a572363",class:"yeti-notification-content"},this.textTitle!=""?s("div",{class:"yeti-notification-content-title"},this.textTitle):"",s("div",{key:"59c40769f9ec8f2d8f3b9434f403dc200cf351c3",class:"yeti-notification-content-subtitle"},s("slot",{key:"f4b743e58f2c0cececa5850e8c4aea3b96cc83af"}))),this.actionLabel!=""?s("button",{class:"yeti-notification-action",onClick:i=>this.handleActionClick(i)},this.actionLabel):"",this.showCloseButton?s("button",{class:"yeti-notification-close",onClick:i=>this.handleCloseClick(i)},s("span",{class:"material-icons"},"close")):"")}get el(){return e(this)}};export{c as yeti_notification};
//# sourceMappingURL=p-f2f0ca6c.entry.js.map