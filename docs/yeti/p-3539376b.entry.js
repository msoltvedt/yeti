import{r as t,c as i,h as e,g as s}from"./p-e8f90371.js";import{u as o}from"./p-943baa85.js";const h=class{constructor(e){t(this,e);this.readyToVerifySlow=i(this,"readyToVerifySlow",7);this.readyToVerifyFast=i(this,"readyToVerifyFast",7);this.wrapperCss="";this.required=false;this.menuAlignment="";this.isValid=undefined;this.value="";this.placeholder="- Select -";this.options=[];this.isTouched=false;this.iLoveJSX=false;this.isOpen=false;this.cursorPosition=-1;this.showClear=true;this.inputId="";this.inputName="";this.inputDescribedBy=""}handleValueChange(){this.updateOptions()}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeFlyout()}}handleClick(t){this.isTouched=true;this.toggleFlyout();t.preventDefault()}handleButtonClick(t){t.preventDefault()}handleKeydown(t){let i=t.key.toString().toLowerCase();switch(i){case"tab":{if(!t.shiftKey){if(this.el.querySelectorAll(".yeti-combobox-input:focus").length==0||this.value==""){this.closeFlyout()}}else{if(this.el.querySelectorAll(".yeti-combobox-input:focus").length>0){this.closeFlyout()}}break}case"arrowdown":{if(this.isOpen){this.cursorPosition=(this.cursorPosition+1)%this.options.length;t.preventDefault()}else{this.cursorPosition=t.altKey?this.cursorPosition:0;this.openFlyout();t.preventDefault()}break}case"arrowup":{if(this.isOpen){this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length;t.preventDefault()}else{this.cursorPosition=this.options.length-1;this.openFlyout();t.preventDefault()}break}case"escape":{if(this.isOpen){this.closeFlyout();t.preventDefault()}break}case"enter":{t.preventDefault();let i=t.target;if(i.classList.contains("yeti-combobox-clear")){i.click();break}else{if(this.cursorPosition>=0&&this.isOpen){this.handleOptionClick(this.cursorPosition)}this.closeFlyout()}break}default:{if(i.length==1&&i.match(/[a-zA-Z0-9]/)){this.openFlyout()}}}}handleClearSelections(t){let i=this.el.querySelector(".yeti-combobox-input");for(let t of this.options){t.selected=false}this.value="";i.focus();t.stopPropagation();this.readyToVerifySlow.emit();this.readyToVerifyFast.emit()}handleInputChange(t){this.value=t.target.value}updateOptions(){for(let t of this.options){t.selected=t.label.toLowerCase()==this.value.toLowerCase()}}openFlyout(){this.isOpen=true}closeFlyout(){this.isOpen=false;this.isTouched=true;this.readyToVerifySlow.emit()}toggleFlyout(){if(this.isOpen){this.closeFlyout()}else{this.openFlyout()}}handleFieldBlur(t){this.isTouched=true;this.readyToVerifySlow.emit(t)}parseOptionElements(t){for(let i=0;i<t.length;i++){let e=t.item(i);if(e.tagName.toLowerCase()=="yeti-combobox-option"){let t;if(e.hasAttribute("id")){t=e.getAttribute("id")}else{t=`${this.el.getAttribute("id")}_option${i}`}this.options.push({selected:e.hasAttribute("selected")||e.innerHTML==this.value,label:e.innerHTML,id:t});if(e.hasAttribute("selected")){this.value=e.innerHTML}}}for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}getPlaceholderDisplay(){return this.value!=""?this.value:this.placeholder}handleOptionClick(t){let i=this.options[t];let e=this.el.querySelector(".yeti-combobox-input");for(let i=0;i<this.options.length;i++){this.options[i].selected=t==i}this.value=i.label;this.closeFlyout();e.focus();this.readyToVerifyFast.emit()}componentWillLoad(){let t=this.el.children;this.componentId=this.el.getAttribute("id");if(!this.componentId||this.componentId==""){this.componentId=o.generateUniqueId();this.el.setAttribute("id",this.componentId)}this.inputId=this.inputId!=""?this.inputId:this.componentId+"_input";this.buttonId=this.componentId+"_button";this.dropdownId=this.componentId+"_dropdown";this.inputName=this.inputName!=""?this.inputName:this.inputId;if(t.length>0){this.parseOptionElements(t)}}render(){let t="yeti-combobox-wrapper";let i="yeti-combobox-dropdown";let s=this.isOpen&&this.cursorPosition!=-1?`${this.componentId}_option${this.cursorPosition}`:``;t+=this.wrapperCss==""?"":` ${this.wrapperCss}`;if(this.isValid==false){t+=" yeti-combobox__error"}i+=this.isOpen?" yeti-combobox-dropdown__open":"";if(this.menuAlignment=="right"){i+=" yeti-combobox-dropdown-align-right"}return[e("div",{key:"e0a6aa240051a807b16b864c39032f4076c991b8",class:t},e("div",{key:"29430a6b835d8ccb7ec828a4da3b9628fac28e77",class:"yeti-combobox",onClick:t=>this.handleClick(t)},e("input",Object.assign({key:"86a30a225e7409d3509ffcd5534adbdcf8a5d4e9",type:"text",class:"yeti-combobox-input",value:this.value,name:this.inputName,onFocus:()=>{this.isTouched=true},onBlur:()=>{},onInput:t=>this.handleInputChange(t),role:"combobox",autocomplete:"off","aria-autocomplete":"none","aria-controls":this.dropdownId,"aria-expanded":this.isOpen,id:this.inputId},this.inputDescribedBy!=""?{"aria-describedby":this.inputDescribedBy}:{},s!=""?{"aria-activedescendant":s}:{})),this.showClear&&this.value!=""?e("button",{class:"yeti-combobox-clear",title:"Clear all selections",onClick:t=>{this.handleClearSelections(t);t.preventDefault()}},e("span",{class:"material-icons yeti-combobox-clear-icon","aria-hidden":"true"},"clear")):"",e("button",{key:"13c27a9f0895db036119a9d81625b0b7c75d2fdb",class:"yeti-combobox-button",tabIndex:-1,"aria-controls":this.dropdownId,"aria-expanded":this.isOpen,id:this.buttonId,onClick:t=>{this.handleButtonClick(t)}},e("yeti-icon",{key:"a56ad1ac46f72c4c1ea5dc518f36618a4da2891b",iconCode:this.isOpen?"expand_less":"expand_more",alt:this.isOpen?"close":"open"}))),e("div",{key:"497b1c12829ae6e1c340c55e18d21aa1d5dfa3c0",class:i},e("ul",{key:"0ff4385bb155e1e2052be169d560ce0c8ae74bb1",class:"yeti-combobox-options",id:this.dropdownId,role:"listbox"},this.options.map(((t,i)=>{let s=this.cursorPosition==i?"yeti-combobox-option yeti-combobox-option__hover":"yeti-combobox-option";s+=t.selected?" yeti-combobox-option__selected":"";return e("li",{id:t.id,key:t.id,role:"option","aria-selected":`${t.selected}`,class:s,onClick:t=>{this.handleOptionClick(i);t.preventDefault()}},e("span",{class:"yeti-combobox-option-label"},t.label),e("span",{class:"yeti-combobox-option-checkmark","aria-hidden":"true"},t.selected?e("yeti-icon",{iconCode:"checkmark"}):""))})))))]}componentDidRender(){if(this.isOpen){let t=this.el.querySelector(".yeti-combobox-dropdown");let i=this.el.querySelector(".yeti-combobox-option__hover");let e=i?i:t;e.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return s(this)}static get watchers(){return{value:["handleValueChange"]}}};export{h as yeti_combobox};
//# sourceMappingURL=p-3539376b.entry.js.map