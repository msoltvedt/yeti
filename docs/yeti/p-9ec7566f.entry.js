import{r as t,h as i}from"./p-ebb5ab4f.js";import{u as s}from"./p-ca9b8900.js";const e=class{constructor(i){t(this,i),this.inputId=s.generateUniqueId(),this.label=void 0,this.tip=void 0,this.required=!1,this.errorMessage="Error: please correct this field.",this.value="",this.isValid=!0,this.inputValue="",this.isDirty=!1}validateLabel(t){if("string"!=typeof t||""===t)throw new Error("yeti-field must have a non-empty label attribute")}handleInputValueChanged(t){let i=t.target.querySelector("input");this.inputValue=i.value}handleFieldFocus(t){t.target.classList.add("focused")}handleFieldBlur(t){this.isDirty=!0,t.target.classList.remove("focused"),this.value=t.target.value}handleInputChange(t){alert("Input changed!"),this.inputValue=t.target.value}render(){return this.validateLabel(this.label),i("div",{class:"yeti-form-field"},i("label",{htmlFor:this.inputId,class:"yeti-form-label"},this.label,this.required?" (required)":null),i("yeti-input",{"input-id":this.inputId,"input-class":this.isValid?null:"yeti-input__error","input-value":this.inputValue}),this.tip||!this.isValid?i("span",{class:"yeti-form-tip"},this.isValid?this.tip?this.tip:null:this.errorMessage):null)}static get watchers(){return{label:["validateLabel"]}}};export{e as yeti_field}