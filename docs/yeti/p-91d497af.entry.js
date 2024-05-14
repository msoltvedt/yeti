import{r as t,h as i,g as e}from"./p-e8f90371.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){t(this,i);this.tipId=s.generateUniqueId();this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.type="text";this.fieldClass="";this.inputMaxlength=0;this.label=undefined;this.tip="";this.required=false;this.errorMessage="Error: please correct this field.";this.isValid=true;this.defaultValue="";this.autovalidate=true;this.isInline=false;this.isDirty=false}validateLabel(t){const i=typeof t!=="string"||t==="";if(i){throw new Error("yeti-field must have a non-empty label attribute")}}handleReadyToVerifySlow(t){let i=t.target;if(this.autovalidate==false){return}if(this.required){if(i.value==""){this.errorMessage=`${this.label} field is required.`;this.isValid=false;return}}else if(i.nodeName.toLowerCase()=="yeti-date-picker"){if(!i.isValid){this.errorMessage="Enter the date in mm/dd/yyyy format.";this.isValid=false;return}}this.isValid=true}componentWillLoad(){console.log(this.el)}render(){let t="yeti-form-field";if(this.isInline){t+=" yeti-form-field-inline"}this.validateLabel(this.label);if(this.fieldClass!=""){t="yeti-form-field "+this.fieldClass}return i("div",{key:"750c707ead24f9d9c4af9fae26fb1e53db11c4e6",class:t},i("label",{key:"d2a13f243666af8e179b76dd41b8a1f847867a18",htmlFor:this.inputId,class:"yeti-form-label"},this.label,this.required?" (required)":null),this.type!="slot"?this.type=="date"?i("yeti-date-picker",{"input-id":this.inputId,"input-name":this.inputName,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":this.tipId}):i("yeti-input",Object.assign({"input-id":this.inputId,"input-class":!this.isValid?"yeti-input__error":null,value:this.defaultValue,required:this.required,"is-valid":this.isValid,"described-by":this.tipId},this.inputMaxlength!=0?{"input-maxlength":this.inputMaxlength}:{})):i("slot",null),this.tip!=""||this.errorMessage!=""&&!this.isValid?i("span",{class:"yeti-form-tip","aria-live":"polite",id:this.tipId},!this.isValid?this.errorMessage:this.tip?this.tip:null):"")}get el(){return e(this)}static get watchers(){return{label:["validateLabel"]}}};export{h as yeti_field};
//# sourceMappingURL=p-91d497af.entry.js.map