import{r as t,h as s,g as i}from"./p-5c17298e.js";import{u as e}from"./p-f056a80b.js";const l=class{constructor(s){t(this,s);this.cssClass="";this.htmlId="";this.useGrid=false}parseTableActionElements(){let t=this.el.querySelectorAll("yeti-table-action:not([grid-columns]), yeti-table-pagination:not([grid-columns])");let s=this.el.querySelectorAll("[grid-columns]");const i=16;let e=i;let l;s.forEach((t=>{let s=parseInt(t.getAttribute("grid-columns"));let i=isNaN(s)?1:s;let l="yeti-grid-column-"+i;let o=t.getAttribute("class");o=o?o:"";t.setAttribute("class",`${o} ${l}`);e-=i}));if(e<t.length){console.warn("Table actions must use a total of no more than 16 columns.")}l=Math.floor(e/t.length);for(let s=0;s<t.length;s++){let i=t[s];let o=s+1==t.length?true:false;let a=o?e:l;let n="yeti-grid-column-"+a;let r=i.getAttribute("class");r=r?r:"";i.setAttribute("class",`${r} ${n}`);e-=a}}componentWillLoad(){let t=this.el.getAttribute("id");let s=this.el.parentElement;let i=s&&s.getAttribute("id")?s.getAttribute("id"):e.generateUniqueId();if(!t||t==""){t=`${i}_actionsComponent`;this.el.setAttribute("id",t)}this.htmlId=this.htmlId!=""?this.htmlId:`${i}_actions`;this.parseTableActionElements()}render(){let t="yeti-table-actions";t+=this.useGrid?" yeti-grid yeti-grid-gapless yeti-grid-gutterless":"";if(this.cssClass!=""){t+=" "+this.cssClass}return s("div",{class:t,id:this.htmlId},s("slot",null))}get el(){return i(this)}};export{l as yeti_table_actions};
//# sourceMappingURL=p-f2af417c.entry.js.map