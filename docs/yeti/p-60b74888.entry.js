import{r as e,h as r,g as t}from"./p-e8f90371.js";import{u as o}from"./p-943baa85.js";const s=class{constructor(r){e(this,r);this.wrapperClass="";this.iLoveJSX=false}render(){let e="yeti-reorderer";if(this.wrapperClass!=""){e+=` ${this.wrapperClass}`}return r("ul",{key:"3226aa7c09d9773f1e9d5b9d53b2c196a97e06c4",class:e},r("slot",{key:"758bb60f7692395adb136e861da4b1bbb49a1bcb"}))}componentWillLoad(){let e=this.el.querySelectorAll("yeti-reorderee");let r=this.el.id?this.el.id:o.generateUniqueId();console.log(r);if(typeof e=="undefined"||!e.length||e.length<1){console.warn("yeti-reorderer should contain at least one yeti-reorderee element.");return}for(let t=0;t<e.length;t++){e[t].assignedId=`${r}_reorderee_${t}`;console.log(e[t].assignedId,e[t])}}get el(){return t(this)}};export{s as yeti_reorderer};
//# sourceMappingURL=p-60b74888.entry.js.map