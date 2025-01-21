import{r as t,c as i,h as e,g as s}from"./p-39d3f65a.js";import{u as c}from"./p-943baa85.js";const o=class{constructor(e){t(this,e);this.accordionActionClick=i(this,"accordionActionClick",7);this.accordionSectionHeaderClick=i(this,"accordionSectionHeaderClick",7);this.heading="Heading";this.isNumbered=true;this.index=0;this.of=1;this.isOpen=this.index==0;this.isOpenable=this.index==0;this.isInWizard=false;this.hasActions=false;this.status="undefined";this.headingId=c.generateUniqueId();this.sectionId=c.generateUniqueId();this.iLoveJSX=false}handleSectionClick(t){t.preventDefault();t.stopImmediatePropagation();this.accordionSectionHeaderClick.emit({originalEvent:t,section:this.el,sectionIndex:this.index,sectionStatus:this.status,isOpen:this.isOpen})}handleActionClick(t,i){t.preventDefault();t.stopPropagation();this.accordionActionClick.emit({originalEvent:t,section:this.el,sectionIndex:this.index,sectionStatus:this.status,actionType:i})}renderStatusIcon(){switch(this.status){case"success":{return e("yeti-icon",{iconCode:"check_circle",alt:"complete",iconClass:"yeti-accordion-section-status_icon yeti-accordion-section-status_icon-success"})}case"error":{return e("yeti-icon",{iconCode:"error",alt:"error",iconClass:"yeti-accordion-section-status_icon yeti-accordion-section-status_icon-error"})}default:return""}}renderActions(){if(this.hasActions){return e("slot",{name:"actions"})}else{let t=[];if(this.index!=0){t.push(e("li",null,e("button",{class:"yeti-button yeti-button-secondary yeti-button-size-s",onClick:t=>{this.handleActionClick(t,"previous")}},e("yeti-icon",{iconCode:"navigate_before",alt:"",iconClass:"yeti-accordion-action-button-icon"}),"Previous")))}if(this.index<this.of-1){t.push(e("li",null,e("button",Object.assign({class:"yeti-button yeti-button-primary yeti-button-size-s",onClick:t=>{this.handleActionClick(t,"next")}},this.isInWizard&&this.status!="success"?{disabled:true,tabIndex:-1}:{}),"Next",e("yeti-icon",{iconCode:"navigate_next",alt:"",iconClass:"yeti-accordion-action-button-icon"}))))}t.push(e("li",null,e("button",{class:"yeti-button yeti-button-ghost yeti-button-size-s",onClick:t=>{this.handleActionClick(t,"cancel")}},"Cancel")));return e("ul",{class:"yeti-button-group"},t)}}componentWillLoad(){let t=this.el.querySelector('[slot="actions"]');if(t){let i=t.querySelectorAll("[accordion-action]");this.hasActions=true;i.forEach((t=>{t.addEventListener("click",(i=>{this.handleActionClick(i,t.getAttribute("accordion-action"))}))}))}}render(){let t="yeti-accordion-section";t+=this.isOpenable?" yeti-accordion-section-openable":"";t+=this.isOpen?" yeti-accordion-section__open":"";return e("div",{key:"5680074c8bfc65411e9fee21d29f7340c8d3ec98",class:t},e("button",Object.assign({key:"7e0b2b8cd7a1afddeb39817948fcd5ae63447f6a",id:this.headingId,class:"yeti-accordion-section-heading",onClick:t=>{this.handleSectionClick(t)},"aria-expanded":`${this.isOpen}`,"aria-controls":this.sectionId},!this.isOpenable?{disabled:true,tabIndex:-1}:{}),e("div",{key:"463845d8ebf86390ace161b7c3deead745a6fda0",class:"yeti-accordion-section-heading-contents"},this.isOpen?e("yeti-icon",{iconCode:"expand_less",alt:"",iconClass:"yeti-accordion-section-heading-caret"}):e("yeti-icon",{iconCode:"expand_more",alt:"",iconClass:"yeti-accordion-section-heading-caret"}),e("div",{key:"b24e634391095c0437445984b05a132bb250d1f2",class:"yeti-accordion-section-heading-actual"},this.isNumbered?this.index+1:""," ",this.heading),this.renderStatusIcon())),e("div",{key:"c40d0d2e1eda5f8ef22e773cfa3f0ff990d758b0",id:this.sectionId,class:"yeti-accordion-section-content",role:"region","aria-labelledby":this.headingId},e("slot",{key:"bb0ff06df0517f9b5f55b0d64b9654fb65d7372b",name:"content"})),e("div",{key:"a2d48f740499ba78b0649bf3e13e1cea888db644",class:"yeti-accordion-section-actions"},this.renderActions()))}get el(){return s(this)}};export{o as yeti_accordion_section};
//# sourceMappingURL=p-87523185.entry.js.map