import{r as e,c as t,h as r,g as s}from"./p-0d1be970.js";import{u as o}from"./p-943baa85.js";const i=class{constructor(r){e(this,r);this.reorderCompleted=t(this,"reorderCompleted",7);this.wrapperClass="";this.iLoveJSX=false}handleReorderRequested(e){let t=this.el.querySelector(`#${e.detail.assignedId}`);let r=e.detail.position;let s=t.querySelector(".yeti-reorderee");let o=s.getBoundingClientRect();let i=e.detail.isUp;let n=i?r-1:r+1;let a=this.el.querySelector(`[position='${n}']`);let l=a.querySelector(".yeti-reorderee");let d=l.getBoundingClientRect();let f=i?d.y-o.y:d.height+(d.y-o.y-o.height);let h=i?o.height+(o.y-d.y-d.height):o.y-d.y;let m=this;if(e.detail.isDisabled){return}s.addEventListener("transitionend",c);s.style.setProperty("transition","transform 300ms");l.style.setProperty("transition","transform 300ms");s.style.setProperty("transform",`translateY(${f}px)`);l.style.setProperty("transform",`translateY(${h}px)`);function c(){let e=i?"beforebegin":"afterend";a.insertAdjacentElement(e,t);s.style.removeProperty("transition");l.style.removeProperty("transition");s.style.removeProperty("transform");l.style.removeProperty("transform");t.attributes["position"].value=n;a.attributes["position"].value=r;s.removeEventListener("transitionend",c);m.reorderCompleted.emit()}}componentWillLoad(){let e=this.el.querySelectorAll("yeti-reorderee");let t=this.el.id?this.el.id:o.generateUniqueId();if(typeof e=="undefined"||!e.length||e.length<1){console.warn("yeti-reorderer should contain at least one yeti-reorderee element.");return}for(let r=0;r<e.length;r++){e[r].assignedId=e[r].id=`${t}_reorderee_${r}`;e[r].position=r;e[r].reorderees=e.length}}render(){let e="yeti-reorderer";if(this.wrapperClass!=""){e+=` ${this.wrapperClass}`}return r("ul",{key:"8320dea17915222387e788e3b6dd7aa93c4ad6bc",class:e},r("slot",{key:"f0d568f19e473240b5aaa444f3e3435fa7cf7332"}))}get el(){return s(this)}};export{i as yeti_reorderer};
//# sourceMappingURL=p-fd8e8624.entry.js.map