import{r as i,h as t,g as s}from"./p-d221c54b.js";import{u as e}from"./p-8bca4ff8.js";const o=class{constructor(t){i(this,t);this.wrapperCSS="";this.textTitle="Mmmm Toast!";this.slotId="";this.notificationId="";this.iLoveJSX=false;this.isClickedOpen=false}handleDeFocusingClick(){this.isClickedOpen=false}handleCloseClick(i){this.isClickedOpen=false;i.stopImmediatePropagation();i.preventDefault()}componentWillLoad(){let i=this.el.getAttribute("id");if(!i||i==""){i=e.generateUniqueId();this.el.setAttribute("id",i)}this.notificationId=this.notificationId!=""?this.notificationId:`${i}_tip`;this.slotId=this.slotId!=""?this.slotId:`${i}_slot`}render(){let i="yeti-notification-wrapper-error";return[t("div",{class:i},t("div",{class:"yeti-notification-container"},t("div",{class:"yeti-flex"},t("yeti-icon",{iconCode:"error",iconCSS:"yeti-color-red yeti-typo-size-5 yeti-margin-right-2"})),t("div",{class:"yeti-notification-content-wrapper"},t("div",{class:"yeti-notification-content-title",id:this.notificationId},this.textTitle),t("div",{class:"yeti-notification-content",id:this.notificationId},t("slot",null))),t("button",{class:"yeti-notification-close",onClick:i=>{this.handleCloseClick(i)}},t("yeti-icon",{iconCode:"close",iconCSS:"yeti-color-white yeti-typo-size-4"}))))]}componentDidRender(){let i=this.el.querySelector(".yeti-notification-trigger").firstElementChild;i.setAttribute("tabindex","0");i.setAttribute("aria-describedby",this.notificationId)}get el(){return s(this)}};export{o as yeti_notification};
//# sourceMappingURL=p-65a4a54b.entry.js.map