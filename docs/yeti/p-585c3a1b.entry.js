import{r as i,h as t}from"./p-e8f90371.js";import{u as e}from"./p-943baa85.js";const s=class{constructor(t){i(this,t);this.tipId=e.generateUniqueId();this.inputId=e.generateUniqueId();this.inputName=this.inputId;this.type="text";this.fieldClass="";this.inputMaxlength=0;this.label=undefined;this.tip="";this.required=false;this.errorMessage="Error: please correct this field.";this.isValid=true;this.defaultValue="";this.autovalidate=true;this.isInline=false;this.isDirty=false}validateLabel(i){const t=typeof i!=="string"||i==="";if(t){throw new Error("yeti-field must have a non-empty label attribute")}}handleReadyToVerifySlow(i){let t=i.target;if(this.autovalidate==false){return}if(this.required){if(t.value==""){this.errorMessage=`${this.label} field is required.`;this.isValid=false;return}}else if(t.nodeName.toLowerCase()=="yeti-date-picker"){if(!t.isValid){this.errorMessage="Enter the date in mm/dd/yyyy format.";this.isValid=false;return}}this.isValid=true}render(){let i="yeti-form-field";if(this.isInline){i+=" yeti-form-field-inline"}this.validateLabel(this.label);if(this.fieldClass!=""){i="yeti-form-field "+this.fieldClass}return t("div",{key:"7e145b78e69916db72e12e7cc1946f71181f3546",class:i},t("label",{key:"b1eb2e07865a2f404a931275243605904cf9f028",htmlFor:this.inputId,class:"yeti-form-label"},this.label,this.required?" (required)":null),this.type=="date"?t("yeti-date-picker",{"input-id":this.inputId,"input-name":this.inputName,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":this.tipId}):t("yeti-input",Object.assign({"input-id":this.inputId,"input-class":!this.isValid?"yeti-input__error":null,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":this.tipId},this.inputMaxlength!=0?{"input-maxlength":this.inputMaxlength}:{})),this.tip!=""||this.errorMessage!=""&&!this.isValid?t("span",{class:"yeti-form-tip","aria-live":"polite",id:this.tipId},!this.isValid?this.errorMessage:this.tip?this.tip:null):"")}static get watchers(){return{label:["validateLabel"]}}};export{s as yeti_field};
//# sourceMappingURL=p-585c3a1b.entry.js.map