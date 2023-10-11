import{r as i,c as t,h as s,g as e}from"./p-5c17298e.js";import{u as h}from"./p-4ae56677.js";const a=class{constructor(s){i(this,s);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.readyToVerifyFast=t(this,"readyToVerifyFast",7);this.searchFieldClear=t(this,"searchFieldClear",7);this.inputClass="";this.inputId=h.generateUniqueId();this.inputName=this.inputId;this.required=false;this.type="text";this.isValid=undefined;this.value="";this.describedBy="";this.description="";this.placeholder="";this.isTouched=false}handleKeyUp(i){this.isTouched=true;this.value=i.target.value;this.readyToVerifyFast.emit(i)}handleClearClick(i){this.value="";this.el.querySelector(".yeti-input").focus();i.preventDefault();this.searchFieldClear.emit(i);return false}handleFieldBlur(i){i.stopImmediatePropagation();this.isTouched=true;this.value=i.target.value;this.readyToVerifySlow.emit(i)}render(){let i="yeti-input";let t=this.value!=""?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){i+=" "+this.inputClass}if(this.isValid==false){i+=" yeti-input__error"}return s("div",{class:"yeti-input-wrapper"},s("input",Object.assign({type:this.type,class:i,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:i=>this.handleKeyUp(i),onBlur:i=>this.handleFieldBlur(i),"aria-invalid":!this.isValid},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{})),s("button",{class:t,onClick:i=>this.handleClearClick(i)},s("span",{class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),s("span",{class:"yeti-a11y-hidden"},"clear")))}get el(){return e(this)}};export{a as yeti_input};
//# sourceMappingURL=p-b9a097b7.entry.js.map