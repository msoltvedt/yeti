import{r as t,h as s,g as e}from"./p-0d1be970.js";import{u as i}from"./p-943baa85.js";const l=class{constructor(s){t(this,s);this.cssClass="";this.htmlId="";this.useGrid=false}parseTableActionElements(){let t=this.el.querySelectorAll("yeti-table-action:not([grid-columns]), yeti-table-pagination:not([grid-columns])");let s=this.el.querySelectorAll("[grid-columns]");const e=16;let i=e;let l;s.forEach((t=>{let s=parseInt(t.getAttribute("grid-columns"));let e=isNaN(s)?1:s;let l="yeti-grid-column-"+e;let a=t.getAttribute("class");a=a?a:"";t.setAttribute("class",`${a} ${l}`);i-=e}));if(i<t.length){console.warn("Table actions must use a total of no more than 16 columns.")}l=Math.floor(i/t.length);for(let s=0;s<t.length;s++){let e=t[s];let a=s+1==t.length?true:false;let o=a?i:l;let n="yeti-grid-column-"+o;let c=e.getAttribute("class");c=c?c:"";e.setAttribute("class",`${c} ${n}`);i-=o}}componentWillLoad(){let t=this.el.getAttribute("id");let s=this.el.parentElement;let e=s&&s.getAttribute("id")?s.getAttribute("id"):i.generateUniqueId();if(!t||t==""){t=`${e}_actionsComponent`;this.el.setAttribute("id",t)}this.htmlId=this.htmlId!=""?this.htmlId:`${e}_actions`;this.parseTableActionElements()}render(){let t="yeti-table-actions";t+=this.useGrid?" yeti-grid yeti-grid-gapless yeti-grid-gutterless":"";if(this.cssClass!=""){t+=" "+this.cssClass}return s("div",{key:"a53d0416279380b8a59352244599b5d6f19e0c1a",class:t,id:this.htmlId},s("slot",{key:"9409c6260ddc7fc47fd1444bd30e43d39b7aa889"}))}get el(){return e(this)}};export{l as yeti_table_actions};
//# sourceMappingURL=p-89bf6de6.entry.js.map