import{r as e,h as t,g as s}from"./p-e8f90371.js";import{u as a}from"./p-943baa85.js";const n=class{constructor(t){e(this,t);this.isExpanded=false;this.wrapperId=""}componentWillLoad(){let e=this.el.id;let t;let s;let n=document.createElement("div");n.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=a.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;s=t.parentElement;if(!t||!s){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");s.insertBefore(n,t);n.appendChild(t);n.appendChild(this.el);t.querySelectorAll("h1, h2, h3, h4, h5, h6");console.log(t)}render(){return t("div",{key:"1600a5211313feabb85ea4d4c5fd9e2abf94d8d3",class:"yeti-page_contents",id:this.wrapperId},t("h2",{key:"1cd92923ed97278e5c3ae431f1517435a678b241",class:"yeti-page_contents-heading"},"Page Contents"))}get el(){return s(this)}};export{n as yeti_page_contents};
//# sourceMappingURL=p-3da12309.entry.js.map