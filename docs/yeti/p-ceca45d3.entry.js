import{r as t,c as s,h as e,g as a}from"./p-6a2741b6.js";import{u as i}from"./p-9480a9a7.js";const l=class{constructor(e){t(this,e),this.readyToVerifySlow=s(this,"readyToVerifySlow",7),this.readyToVerifyFast=s(this,"readyToVerifyFast",7),this.inputValueChanged=s(this,"inputValueChanged",7),this.tableClass="",this.tableId=i.generateUniqueId(),this.contents={head:{rows:[{cells:[{value:"Data"}]}]},body:{rows:[{cells:[{value:"This table has no data."}]}]}},this.contentsActual=void 0,this.isValid=!0,this.inputValue="",this.isTouched=!1}handleKeyUp(t){this.isTouched=!0,this.inputValue=t.target.value,this.readyToVerifyFast.emit(t)}watchContentsHandler(t,s){console.log("The old value of contents is: ",s),console.log("The new value of contents is: ",t),this.contentsActual=t,console.log(typeof this.contentsActual)}handleValueChange(t){this.inputValueChanged.emit(t)}handleFieldBlur(t){this.isTouched=!0,this.inputValue=t.target.value,this.readyToVerifySlow.emit(t)}componentWillLoad(){console.log("Component will load!"),this.watchContentsHandler(this.contents,this.contents)}render(){let t="yeti-table";return console.log("In render, data was",this.contentsActual,typeof this.contentsActual),console.log("Is this.contentsActual valid JSON?",i.isValidJSON(this.contentsActual)),""!=this.tableClass&&(t+=" "+this.tableClass),0==this.isValid&&(t+=" yeti-input__error"),e("table",{class:t},e("thead",{class:"yeti-table-head"},e("tr",{class:"yeti-table-head-row"},e("th",{class:"yeti-table-heading"},"No Data"))),e("tbody",{class:"yeti-table-body"},e("tr",{class:"yeti-table-body-row"},e("td",{class:"yeti-table-cell"},"No Data"))))}get el(){return a(this)}static get watchers(){return{contents:["watchContentsHandler"],inputValue:["handleValueChange"]}}};export{l as yeti_table}