import{r as e,c as t,h as a,g as s}from"./p-0d1be970.js";import{u as i}from"./p-943baa85.js";const l=class{constructor(a){e(this,a);this.panelExpanded=t(this,"panelExpanded",7);this.panelCollapsed=t(this,"panelCollapsed",7);this.hasSubheader=false;this.heading="Heading";this.isExpandable=false;this.isExpanded=true;this.headerId=i.generateUniqueId();this.contentId=i.generateUniqueId();this.wrapperClass="";this.iLoveJSX=false}watchIsExpandedHandler(e){if(e){this.panelExpanded.emit({yetiPanel:this.el})}else{this.panelCollapsed.emit({yetiPanel:this.el})}}handleHeaderClick(){if(this.isExpandable){this.isExpanded=!this.isExpanded}}componentWillLoad(){let e=this.el.querySelector('[slot="subheader"]');if(e){this.hasSubheader=true}}render(){let e="yeti-panel";e+=this.wrapperClass?` ${this.wrapperClass}`:"";e+=this.isExpandable?" yeti-panel-expandable":"";e+=this.isExpandable&&this.isExpanded?" yeti-panel__expanded":"";return a("div",{key:"f0781e1ad9d61757ca0954b1dee74418095339fd",class:e},this.isExpandable?a("button",{id:this.headerId,class:"yeti-panel-header",onClick:()=>{this.handleHeaderClick()},"aria-expanded":this.isExpanded,"aria-controls":this.contentId},a("div",{class:"yeti-panel-header-contents"},this.isExpanded?a("yeti-icon",{iconCode:"expand_less",alt:"",iconClass:"yeti-panel-header-caret"}):a("yeti-icon",{iconCode:"expand_more",alt:"",iconClass:"yeti-panel-header-caret"}),a("div",{class:"yeti-panel-header-actual"},this.heading),a("slot",{name:"subheader"}))):a("div",{id:this.headerId,class:"yeti-panel-header"},a("div",{class:"yeti-panel-header-contents"},a("div",{class:"yeti-panel-header-actual"},this.heading),a("slot",{name:"subheader"}))),a("div",{key:"50c72bd2a0f3bf311e7f85e34ad50ab1a79e718c",id:this.contentId,class:"yeti-panel-content",role:"region","aria-labelledby":this.headerId},a("slot",{key:"ea883250c31445d12f1eafe74cde769030f5058d"})))}get el(){return s(this)}static get watchers(){return{isExpanded:["watchIsExpandedHandler"]}}};export{l as yeti_panel};
//# sourceMappingURL=p-5c428450.entry.js.map