import{r as e,h as t,g as i}from"./p-e8f90371.js";import{u as s}from"./p-943baa85.js";const n=class{constructor(t){e(this,t);this.isExpanded=false;this.wrapperId=""}componentWillLoad(){let e=this.el.id;let t;let i;let n=document.createElement("div.yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=s.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.closest(":is(div, main, article)");i=t.closest(":is(div, main, article, section, body");if(!t){console.warn("yeti-page-contents requires a containing div, main, or article element.");return}i.insertBefore(n,t)}render(){return t("div",{key:"5170de48ebe0f50dee4f1e532072516d2d127de6",class:"yeti-page_contents-wrapper",id:this.wrapperId},"Page Contents Under Construction")}get el(){return i(this)}};export{n as yeti_page_contents};
//# sourceMappingURL=p-e654f05f.entry.js.map