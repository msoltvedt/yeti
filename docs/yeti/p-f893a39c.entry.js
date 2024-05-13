import{r as e,c as i,h as s,g as t}from"./p-e8f90371.js";const d=class{constructor(s){e(this,s);this.reorderRequested=i(this,"reorderRequested",7);this.assignedId="";this.position=-1;this.reorderees=-1;this.wrapperClass="";this.upTrigger="";this.downTrigger="";this.iLoveJSX=false}handleUpTrigger(e){this.reorderRequested.emit({assignedId:this.assignedId,position:this.position,isUp:true,isDisabled:this.position==0});e.stopImmediatePropagation();e.preventDefault()}handleDownTrigger(e){this.reorderRequested.emit({assignedId:this.assignedId,position:this.position,isUp:false,isDisabled:this.position+1>=this.reorderees});e.stopImmediatePropagation();e.preventDefault()}render(){let e="yeti-reorderee";if(this.wrapperClass!=""){e+=` ${this.wrapperClass}`}return s("li",{key:"6bf7e898e9f39c2053d3acec999bdd901f765644",class:e},s("slot",{key:"b328b18729b5b902d7ffdf72b3da0e3c13e8bddf"}))}componentDidRender(){let e=this.el.querySelector(`#${this.upTrigger}`);let i=this.el.querySelector(`#${this.downTrigger}`);if(e){if(this.position==0){e.setAttribute("disabled","");e.classList.add("yeti-reorderee__disabled")}else{e.removeAttribute("disabled");e.classList.remove("yeti-reorderee__disabled")}}if(i){if(this.position+1>=this.reorderees){i.setAttribute("disabled","");i.classList.add("yeti-reorderee__disabled")}else{i.removeAttribute("disabled");i.classList.remove("yeti-reorderee__disabled")}}}componentDidLoad(){let e=this.el.querySelector(`#${this.upTrigger}`);let i=this.el.querySelector(`#${this.downTrigger}`);if(e){e.addEventListener("click",(e=>{this.handleUpTrigger(e)}))}if(i){i.addEventListener("click",(e=>{this.handleDownTrigger(e)}))}}get el(){return t(this)}};export{d as yeti_reorderee};
//# sourceMappingURL=p-f893a39c.entry.js.map