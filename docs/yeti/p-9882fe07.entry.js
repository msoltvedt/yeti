import{r as e,c as i,h as s,g as t}from"./p-0d1be970.js";const d=class{constructor(s){e(this,s);this.reorderRequested=i(this,"reorderRequested",7);this.assignedId="";this.position=-1;this.reorderees=-1;this.wrapperClass="";this.upTrigger="";this.downTrigger="";this.iLoveJSX=false}handleUpTrigger(e){this.reorderRequested.emit({assignedId:this.assignedId,position:this.position,isUp:true,isDisabled:this.position==0});e.stopImmediatePropagation();e.preventDefault()}handleDownTrigger(e){this.reorderRequested.emit({assignedId:this.assignedId,position:this.position,isUp:false,isDisabled:this.position+1>=this.reorderees});e.stopImmediatePropagation();e.preventDefault()}render(){let e="yeti-reorderee";if(this.wrapperClass!=""){e+=` ${this.wrapperClass}`}return s("li",{key:"c47a2ca540e17f3c7cb3c734fb52ea6061cf7575",class:e},s("slot",{key:"d7920592e000bf1fc0d55b26df864f581daead38"}))}componentDidRender(){let e=this.el.querySelector(`#${this.upTrigger}`);let i=this.el.querySelector(`#${this.downTrigger}`);if(e){if(this.position==0){e.setAttribute("disabled","");e.classList.add("yeti-reorderee__disabled")}else{e.removeAttribute("disabled");e.classList.remove("yeti-reorderee__disabled")}}if(i){if(this.position+1>=this.reorderees){i.setAttribute("disabled","");i.classList.add("yeti-reorderee__disabled")}else{i.removeAttribute("disabled");i.classList.remove("yeti-reorderee__disabled")}}}componentDidLoad(){let e=this.el.querySelector(`#${this.upTrigger}`);let i=this.el.querySelector(`#${this.downTrigger}`);if(e){e.addEventListener("click",(e=>{this.handleUpTrigger(e)}))}if(i){i.addEventListener("click",(e=>{this.handleDownTrigger(e)}))}}get el(){return t(this)}};export{d as yeti_reorderee};
//# sourceMappingURL=p-9882fe07.entry.js.map