import{r as i,h as e,g as s}from"./p-0d1be970.js";import{u as t}from"./p-943baa85.js";const o=class{constructor(e){i(this,e);this.openIndex=0;this.sections=0;this.sectionElements=null;this.isWizard=false;this.iLoveJSX=false}handleAccordionActionClicked(i){switch(i.detail.actionType){case"previous":{if(i.detail.sectionIndex>0){this.openSection(parseInt(i.detail.sectionIndex)-1)}break}case"next":{if(i.detail.sectionIndex<this.sections-1&&i.detail.sectionStatus!="error"){this.openSection(parseInt(i.detail.sectionIndex)+1)}break}}}handleAccordionSectionHeaderClick(i){let e=i.detail.section;if(!e.isOpenable){this.openSection(this.openIndex);return}else{if(e.isOpen){e.isOpen=false}else{this.openSection(i.detail.sectionIndex)}}}openSection(i=0){this.sectionElements.forEach(((e,s)=>{let t=e;let o=t.querySelector(".yeti-accordion-section-heading");if(s==i){t.setAttribute("is-open","true");this.openIndex=s;setTimeout((()=>{o===null||o===void 0?void 0:o.focus()}),100)}else{t.setAttribute("is-open","false")}}));this.openIndex=i}componentWillLoad(){this.sectionElements=this.el.querySelectorAll("yeti-accordion-section");this.sections=this.sectionElements.length;if(!this.el.hasAttribute("id")){this.el.setAttribute("id",t.generateUniqueId())}if(!this.sectionElements||this.sectionElements.length<2){console.error("Yeti Accordion must have at least two yeti-accordion-section elements.");return}this.sectionElements.forEach(((i,e)=>{let s=i;s.setAttribute("is-open",`${e==this.openIndex}`);s.setAttribute("index",`${e}`);s.setAttribute("of",`${this.sectionElements.length}`);s.setAttribute("is-openable",`${s.hasAttribute("is-openable")?s.getAttribute("is-openable"):e<=this.openIndex}`);s.setAttribute("status",`${s.hasAttribute("status")?s.getAttribute("status"):e==this.openIndex?"reachable":"undefined"}`);s.setAttribute("is-in-wizard",`${this.isWizard}`)}))}render(){return e("div",{key:"8c92781c12e31fc56a282c571eea1f095ca3d581",class:"yeti-accordion"},e("slot",{key:"59456a4088566b3d76e26315cf15162d6f9bda92"}))}get el(){return s(this)}};export{o as yeti_accordion};
//# sourceMappingURL=p-9ca12aea.entry.js.map