import{r as e,h as t,g as i}from"./p-39d3f65a.js";import{u as s}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.openIndex=0;this.sections=0;this.sectionElements=null;this.isWizard=false;this.iLoveJSX=false}handleOpenIndexChange(e){this.openSection(e)}handleAccordionActionClicked(e){switch(e.detail.actionType){case"previous":{if(e.detail.sectionIndex>0){this.openSection(parseInt(e.detail.sectionIndex)-1)}break}case"next":{if(e.detail.sectionIndex<this.sections-1&&e.detail.sectionStatus!="error"){this.openSection(parseInt(e.detail.sectionIndex)+1)}break}}}handleAccordionSectionHeaderClick(e){let t=e.detail.section;if(!t.isOpenable){this.openSection(this.openIndex);return}else{if(t.isOpen){t.isOpen=false}else{this.openSection(e.detail.sectionIndex)}}}openSection(e=0){this.sectionElements.forEach(((t,i)=>{let s=t;let a=s.querySelector(".yeti-accordion-section-heading");let n=s.getAttribute("status");if(i==e){s.setAttribute("is-openable","true");s.setAttribute("status",n=="undefined"?"reachable":n);s.setAttribute("is-open","true");this.openIndex=i;setTimeout((()=>{a===null||a===void 0?void 0:a.focus()}),100)}else{s.setAttribute("is-open","false")}}));this.openIndex=e}componentWillLoad(){this.sectionElements=this.el.querySelectorAll("yeti-accordion-section");this.sections=this.sectionElements.length;if(!this.el.hasAttribute("id")){this.el.setAttribute("id",s.generateUniqueId())}if(!this.sectionElements||this.sectionElements.length<2){console.error("Yeti Accordion must have at least two yeti-accordion-section elements.");return}this.sectionElements.forEach(((e,t)=>{let i=e;i.setAttribute("is-open",`${t==this.openIndex}`);i.setAttribute("index",`${t}`);i.setAttribute("of",`${this.sectionElements.length}`);i.setAttribute("is-openable",`${i.hasAttribute("is-openable")?i.getAttribute("is-openable"):t<=this.openIndex}`);i.setAttribute("status",`${i.hasAttribute("status")?i.getAttribute("status"):t==this.openIndex?"reachable":"undefined"}`);i.setAttribute("is-in-wizard",`${this.isWizard}`)}))}render(){return t("div",{key:"ba54dbe1a126b3e0dd6d25ba1e8b8c7eb0261ff3",class:"yeti-accordion"},t("slot",{key:"7dfb90274896e26aa598310ea8b0387e96e8e178"}))}get el(){return i(this)}static get watchers(){return{openIndex:["handleOpenIndexChange"]}}};export{a as yeti_accordion};
//# sourceMappingURL=p-417c9b42.entry.js.map