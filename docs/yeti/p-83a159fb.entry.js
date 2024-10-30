import{r as e,c as a,h as t,g as s}from"./p-0d1be970.js";import{u as i}from"./p-943baa85.js";const n=class{constructor(t){e(this,t);this.panelExpanded=a(this,"panelExpanded",7);this.panelClosed=a(this,"panelClosed",7);this.hasSubheader=false;this.heading="Heading";this.isExpandable=false;this.isExpanded=true;this.headerId=i.generateUniqueId();this.contentId=i.generateUniqueId();this.wrapperClass="";this.iLoveJSX=false}watchIsExpandedHandler(e,a){console.log(`Panel isExpanded changed from ${a} to ${e}`)}handleHeaderClick(){if(this.isExpandable){this.isExpanded=!this.isExpanded}}componentWillLoad(){let e=this.el.querySelector('[slot="subheader"]');if(e){this.hasSubheader=true}}render(){let e="yeti-panel";e+=this.wrapperClass?` ${this.wrapperClass}`:"";e+=this.isExpandable?" yeti-panel-expandable":"";e+=this.isExpandable&&this.isExpanded?" yeti-panel__expanded":"";return t("div",{key:"695656ea5803e001c518c07bf8cf14531bdfe12e",class:e},this.isExpandable?t("button",{id:this.headerId,class:"yeti-panel-header",onClick:()=>{this.handleHeaderClick()},"aria-expanded":this.isExpanded,"aria-controls":this.contentId},t("div",{class:"yeti-panel-header-contents"},this.isExpanded?t("yeti-icon",{iconCode:"expand_less",alt:"",iconClass:"yeti-panel-header-caret"}):t("yeti-icon",{iconCode:"expand_more",alt:"",iconClass:"yeti-panel-header-caret"}),t("div",{class:"yeti-panel-header-actual"},this.heading),t("slot",{name:"subheader"}))):t("div",{id:this.headerId,class:"yeti-panel-header"},t("div",{class:"yeti-panel-header-contents"},t("div",{class:"yeti-panel-header-actual"},this.heading),t("slot",{name:"subheader"}))),t("div",{key:"8c0ec8438bdd8981a4b3c28c64b624e3c692ae24",id:this.contentId,class:"yeti-panel-content",role:"region","aria-labelledby":this.headerId},t("slot",{key:"a085817ab6e9854ee46e0bd403528826c75da194"})))}get el(){return s(this)}static get watchers(){return{isExpanded:["watchIsExpandedHandler"]}}};export{n as yeti_panel};
//# sourceMappingURL=p-83a159fb.entry.js.map