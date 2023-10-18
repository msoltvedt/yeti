import{r as t,h as i}from"./p-5c17298e.js";import{u as e}from"./p-4ae56677.js";const s=class{constructor(i){t(this,i);this.tipId=e.generateUniqueId();this.inputId=e.generateUniqueId();this.inputName=this.inputId;this.type="text";this.fieldClass="";this.inputMaxlength=0;this.label=undefined;this.tip="";this.required=false;this.errorMessage="Error: please correct this field.";this.isValid=true;this.defaultValue="";this.autovalidate=true;this.isDirty=false}validateLabel(t){const i=typeof t!=="string"||t==="";if(i){throw new Error("yeti-field must have a non-empty label attribute")}}handleReadyToVerifySlow(t){let i=t.target;if(this.autovalidate==false){return}if(this.required){if(i.value==""){this.errorMessage=`${this.label} field is required.`;this.isValid=false;return}}else if(i.nodeName.toLowerCase()=="yeti-date-picker"){if(!i.isValid){this.errorMessage="Enter the date in mm/dd/yyyy format.";this.isValid=false;return}}this.isValid=true}render(){let t="yeti-form-field";this.validateLabel(this.label);if(this.fieldClass!=""){t="yeti-form-field "+this.fieldClass}return i("div",{class:t},i("label",{htmlFor:this.inputId,class:"yeti-form-label"},this.label,this.required?" (required)":null),this.type=="date"?i("yeti-date-picker",{"input-id":this.inputId,"input-name":this.inputName,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":this.tipId}):i("yeti-input",Object.assign({"input-id":this.inputId,"input-class":!this.isValid?"yeti-input__error":null,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":this.tipId},this.inputMaxlength!=0?{"input-maxlength":this.inputMaxlength}:{})),this.tip!=""?i("span",{class:"yeti-form-tip","aria-live":"polite",id:this.tipId},!this.isValid?this.errorMessage:this.tip?this.tip:null):"")}static get watchers(){return{label:["validateLabel"]}}};export{s as yeti_field};
//# sourceMappingURL=p-b7df571a.entry.js.map