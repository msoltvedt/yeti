import{r as t,h as s,g as i}from"./p-f504dd71.js";import{u as e}from"./p-5f7a1b51.js";const o=class{constructor(s){t(this,s),this.cssClass="",this.htmlId="",this.useGrid=!1}parseTableActionElements(){let t,s=this.el.querySelectorAll("yeti-table-action:not([grid-columns]), yeti-table-pagination:not([grid-columns])"),i=this.el.querySelectorAll("[grid-columns]"),e=16;i.forEach((t=>{let s=parseInt(t.getAttribute("grid-columns")),i=isNaN(s)?1:s,o="yeti-grid-column-"+i,l=t.getAttribute("class");l=l||"",t.setAttribute("class",`${l} ${o}`),e-=i})),e<s.length&&console.warn("Table actions must use a total of no more than 16 columns."),t=Math.floor(e/s.length);for(let i=0;i<s.length;i++){let o=s[i],l=i+1==s.length?e:t,a="yeti-grid-column-"+l,n=o.getAttribute("class");n=n||"",o.setAttribute("class",`${n} ${a}`),e-=l}}componentWillLoad(){let t=this.el.getAttribute("id"),s=this.el.parentElement,i=s&&s.getAttribute("id")?s.getAttribute("id"):e.generateUniqueId();t&&""!=t||(t=`${i}_actionsComponent`,this.el.setAttribute("id",t)),this.htmlId=""!=this.htmlId?this.htmlId:`${i}_actions`,this.parseTableActionElements()}render(){let t="yeti-table-actions";return t+=this.useGrid?" yeti-grid yeti-grid-gapless yeti-grid-gutterless":"",""!=this.cssClass&&(t+=" "+this.cssClass),s("div",{class:t,id:this.htmlId},s("slot",null))}get el(){return i(this)}};export{o as yeti_table_actions}