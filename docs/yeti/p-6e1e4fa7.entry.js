import{r as t,h as e,g as s}from"./p-e8f90371.js";import{u as i}from"./p-943baa85.js";const l=class{constructor(e){t(this,e);this.cssClass="";this.htmlId="";this.useGrid=false}parseTableActionElements(){let t=this.el.querySelectorAll("yeti-table-action:not([grid-columns]), yeti-table-pagination:not([grid-columns])");let e=this.el.querySelectorAll("[grid-columns]");const s=16;let i=s;let l;e.forEach((t=>{let e=parseInt(t.getAttribute("grid-columns"));let s=isNaN(e)?1:e;let l="yeti-grid-column-"+s;let a=t.getAttribute("class");a=a?a:"";t.setAttribute("class",`${a} ${l}`);i-=s}));if(i<t.length){console.warn("Table actions must use a total of no more than 16 columns.")}l=Math.floor(i/t.length);for(let e=0;e<t.length;e++){let s=t[e];let a=e+1==t.length?true:false;let o=a?i:l;let n="yeti-grid-column-"+o;let c=s.getAttribute("class");c=c?c:"";s.setAttribute("class",`${c} ${n}`);i-=o}}componentWillLoad(){let t=this.el.getAttribute("id");let e=this.el.parentElement;let s=e&&e.getAttribute("id")?e.getAttribute("id"):i.generateUniqueId();if(!t||t==""){t=`${s}_actionsComponent`;this.el.setAttribute("id",t)}this.htmlId=this.htmlId!=""?this.htmlId:`${s}_actions`;this.parseTableActionElements()}render(){let t="yeti-table-actions";t+=this.useGrid?" yeti-grid yeti-grid-gapless yeti-grid-gutterless":"";if(this.cssClass!=""){t+=" "+this.cssClass}return e("div",{key:"78e1e774e89c179891e08bd4e2215df9df20daf3",class:t,id:this.htmlId},e("slot",{key:"ae7e7efe730bd1fd54a780d3cb5595befdf15ec3"}))}get el(){return s(this)}};export{l as yeti_table_actions};
//# sourceMappingURL=p-6e1e4fa7.entry.js.map