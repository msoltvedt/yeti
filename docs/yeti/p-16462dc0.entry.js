import{r as t,h as i,g as e}from"./p-0d1be970.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){t(this,i);this.tipId=s.generateUniqueId();this.errorId=s.generateUniqueId();this.hasSlottedField=false;this.hasSlottedRequired=false;this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.type="text";this.fieldClass="";this.inputMaxlength=0;this.label=undefined;this.tip="";this.tipPosition="below";this.required=false;this.errorMessage="Error: please correct this field.";this.isValid=true;this.defaultValue="";this.autovalidate=true;this.isInline=false;this.wrapperClass="";this.isDirty=false}validateLabel(t){const i=typeof t!=="string"||t==="";if(i){throw new Error("yeti-field must have a non-empty label attribute")}}updateSlottedContentForErrorState(t){if(!this.hasSlottedField){return}let i=this.el.querySelector(`#${this.inputId}`);if(i){if(t){i.classList.add("yeti-input__error")}else{i.classList.remove("yeti-input__error")}}}handleReadyToVerifySlow(t){let i=t.target;if(this.autovalidate==false){return}if(this.required){if(i.value==""){this.errorMessage=this.errorMessage!=""?this.errorMessage:`${this.label} field is required.`;this.isValid=false;return}}else if(i.nodeName.toLowerCase()=="yeti-date-picker"){if(!i.isValid){this.errorMessage="Enter the date in mm/dd/yyyy format.";this.isValid=false;return}}this.isValid=true}componentWillLoad(){let t=this.el.querySelector('[slot="element"]');let i=this.el.querySelector('[slot="required"]');let e=this.tip!=""?`${this.tipId} `:``;e+=this.errorMessage!=""&&!this.isValid?`${this.errorId}`:``;if(i){this.hasSlottedRequired=true}if(t){this.hasSlottedField=true;this.autovalidate=false;if(t.id){this.inputId=t.id}else{t.id=this.inputId}if(t.hasAttribute("name")){this.inputName=t.getAttribute("name")}else{t.setAttribute("name",this.inputName)}if(e!=""){t.setAttribute("aria-describedby",e)}if(!this.isValid){t.classList.add("yeti-input__error")}}}render(){let t="yeti-form-field";t+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";let e=`yeti-form-tip`;e+=this.tipPosition=="above"?` yeti-form-tip-above`:``;let s=this.tip!=""?`${this.tipId} `:``;s+=this.errorMessage!=""&&!this.isValid?`${this.errorId}`:``;if(this.isInline){t+=" yeti-form-field-inline"}this.validateLabel(this.label);if(this.fieldClass!=""){t="yeti-form-field "+this.fieldClass}return i("div",{key:"3ecf764dd11b134e5ee591d44db8661ff2cf9ae2",class:t},i("label",{key:"9fb4f8d62de4d6102e23ea0abd0b194b78ca7cc5",htmlFor:this.inputId,class:"yeti-form-label"},`${this.label} `,this.required&&this.hasSlottedRequired?i("slot",{name:"required"}):null),!this.hasSlottedField?this.type=="date"?i("yeti-date-picker",{"input-id":this.inputId,"input-name":this.inputName,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":s}):i("yeti-input",Object.assign({"input-id":this.inputId,"input-class":!this.isValid?"yeti-input__error":null,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":s},this.inputMaxlength!=0?{"input-maxlength":this.inputMaxlength}:{})):i("slot",{name:"element"}),this.tip!=""?i("span",{class:e,"aria-live":"polite",id:this.tipId},this.tip):"",this.errorMessage!=""&&!this.isValid?i("span",{class:"yeti-form-field-error","aria-live":"polite",id:this.errorId},this.errorMessage):"")}get el(){return e(this)}static get watchers(){return{label:["validateLabel"],isValid:["updateSlottedContentForErrorState"]}}};export{h as yeti_field};
//# sourceMappingURL=p-16462dc0.entry.js.map