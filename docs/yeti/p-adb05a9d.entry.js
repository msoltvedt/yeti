import{r as e,h as t,g as s}from"./p-e8f90371.js";import{u as a}from"./p-943baa85.js";const i=class{constructor(t){e(this,t);this.isExpanded=false;this.wrapperId=""}componentWillLoad(){let e=this.el.id;let t;this.el.setAttribute("aria-hidden","true");if(!e){e=a.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.closest(':is("div", "main", "article")');if(t){console.log("El's parent is:",t)}else{console.log("El's an orphan. :(")}}render(){return t("div",{key:"b106caab76a5a060abdf98c1ef72ed9f3b74e4f5",class:"yeti-page_contents-wrapper",id:this.wrapperId},"Page Contents Under Construction")}get el(){return s(this)}};export{i as yeti_page_contents};
//# sourceMappingURL=p-adb05a9d.entry.js.map