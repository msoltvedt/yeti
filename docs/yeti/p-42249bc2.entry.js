import{r as t,h as i,g as e}from"./p-39d3f65a.js";import{u as s}from"./p-943baa85.js";const r=class{constructor(i){t(this,i);this.tipId=s.generateUniqueId();this.errorId=s.generateUniqueId();this.hasSlottedField=false;this.hasSlottedRequired=false;this.hasSlottedLabel=false;this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.type="text";this.inputMaxlength=0;this.label="";this.tip="";this.tipPosition="below";this.required=false;this.indicateRequired=false;this.errorMessage="Error: please correct this field.";this.isValid=true;this.defaultValue="";this.autovalidate=true;this.isInline=false;this.wrapperClass="";this.inputClass="";this.inputWrapperClass="";this.isDirty=false}updateSlottedContentForErrorState(t){if(!this.hasSlottedField){return}let i=this.el.querySelector(`#${this.inputId}`);if(i){if(t){i.classList.add("yeti-input__error")}else{i.classList.remove("yeti-input__error")}}}handleReadyToVerifySlow(t){let i=t.target;if(this.autovalidate==false){return}if(this.required){if(i.value==""){this.errorMessage=this.errorMessage!=""?this.errorMessage:`${this.label} field is required.`;this.isValid=false;return}}else if(i.nodeName.toLowerCase()=="yeti-date-picker"){if(!i.isValid){this.errorMessage="Enter the date in mm/dd/yyyy format.";this.isValid=false;return}}this.isValid=true}componentWillLoad(){let t=this.el.querySelector('[slot="element"]');let i=this.el.querySelector('[slot="required"]');let e=this.el.querySelector('[slot="label"]');let s=this.tip!=""?`${this.tipId} `:``;s+=this.errorMessage!=""&&!this.isValid?`${this.errorId}`:``;if(i){this.hasSlottedRequired=true}if(e){this.hasSlottedLabel=true}if(t){this.hasSlottedField=true;this.autovalidate=false;if(t.id){this.inputId=t.id}else{t.id=this.inputId}if(t.hasAttribute("name")){this.inputName=t.getAttribute("name")}else{t.setAttribute("name",this.inputName)}if(s!=""){t.setAttribute("aria-describedby",s)}if(!this.isValid){t.classList.add("yeti-input__error")}}}renderRequiredIndicator(){if(!this.required){return null}if(this.required&&this.indicateRequired){if(this.hasSlottedRequired){return i("slot",{name:"required"})}else{return i("span",{class:"yeti-form-label-required-wrapper"},i("yeti-required-symbol",null))}}}render(){let t="yeti-form-field";t+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";let e=`yeti-form-tip`;e+=this.tipPosition=="above"?` yeti-form-tip-above`:``;let s=this.tip!=""?`${this.tipId} `:``;s+=this.errorMessage!=""&&!this.isValid?`${this.errorId}`:``;if(this.isInline){t+=" yeti-form-field-inline"}return i("div",{key:"b6f62b5da6caf56421572fe4547067cdd7a51e8e",class:t},i("label",{key:"9e91b7b798d0059c0e2ee13d9b9afcfd45a44b9f",htmlFor:this.inputId,class:"yeti-form-label"},this.hasSlottedLabel?i("slot",{name:"label"}):`${this.label}`,this.indicateRequired?this.hasSlottedRequired?i("slot",{name:"required"}):i("yeti-required-symbol",null):null),!this.hasSlottedField?this.type=="date"?i("yeti-date-picker",{"input-id":this.inputId,"input-name":this.inputName,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":s}):i("yeti-input",Object.assign({inputId:this.inputId,value:this.defaultValue,required:this.required,isValid:this.isValid,describedBy:s,inputName:this.inputName},this.inputClass!=""?{"input-class":this.inputClass}:{},this.inputWrapperClass!=""?{"wrapper-class":this.inputWrapperClass}:{},this.inputMaxlength!=0?{"input-maxlength":this.inputMaxlength}:{})):i("slot",{name:"element"}),this.tip!=""?i("span",{class:e,"aria-live":"polite",id:this.tipId},this.tip):"",this.errorMessage!=""&&!this.isValid?i("span",{class:"yeti-form-field-error","aria-live":"polite",id:this.errorId},this.errorMessage):"")}get el(){return e(this)}static get watchers(){return{isValid:["updateSlottedContentForErrorState"]}}};export{r as yeti_field};
//# sourceMappingURL=p-42249bc2.entry.js.map