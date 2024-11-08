import{r as t,c as i,h as e,g as s}from"./p-0d1be970.js";import{u as o}from"./p-943baa85.js";const h=class{constructor(e){t(this,e);this.readyToVerifySlow=i(this,"readyToVerifySlow",7);this.readyToVerifyFast=i(this,"readyToVerifyFast",7);this.wrapperCss="";this.required=false;this.menuAlignment="";this.isValid=undefined;this.value="";this.placeholder="- Select -";this.options=[];this.isTouched=false;this.iLoveJSX=false;this.isOpen=false;this.cursorPosition=-1;this.showClear=true;this.inputId="";this.inputName="";this.inputDescribedBy="";this.isLookup=false;this.isFilterable=false;this.selectionType="manual"}handleValueChange(){this.updateOptions()}handleSelectionTypeChange(){this.selectionType=this.selectionType=="automatic"?this.selectionType:"manual"}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeFlyout()}}handleClick(t){this.isTouched=true;this.toggleFlyout();t.preventDefault()}handleButtonClick(t){t.preventDefault()}handleKeydown(t){let i=t.key.toString().toLowerCase();switch(i){case"tab":{if(!t.shiftKey){if(this.el.querySelectorAll(".yeti-combobox-input:focus").length==0||this.value==""){this.closeFlyout()}}else{if(this.el.querySelectorAll(".yeti-combobox-input:focus").length>0){this.closeFlyout()}}break}case"arrowdown":{if(this.isOpen){this.cursorPosition=(this.cursorPosition+1)%this.options.length;t.preventDefault()}else{this.cursorPosition=t.altKey?this.cursorPosition:0;this.openFlyout();t.preventDefault()}break}case"arrowup":{if(this.isOpen){this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length;t.preventDefault()}else{this.cursorPosition=this.options.length-1;this.openFlyout();t.preventDefault()}break}case"escape":{if(this.isOpen){this.closeFlyout();t.preventDefault()}break}case"enter":{t.preventDefault();let i=t.target;if(i.classList.contains("yeti-combobox-clear")){i.click();break}else{if(this.cursorPosition>=0&&this.isOpen){this.handleOptionClick(this.cursorPosition)}if(this.selectionType=="automatic"){for(let t of this.options){if(t.selected){this.value=t.label;break}}}this.closeFlyout()}break}default:{if(i.length==1&&i.match(/[a-zA-Z0-9]/)){this.openFlyout()}}}}handleClearSelections(t){let i=this.el.querySelector(".yeti-combobox-input");for(let t of this.options){t.selected=false}this.value="";i.focus();t.stopPropagation();this.readyToVerifySlow.emit();this.readyToVerifyFast.emit()}handleInputChange(t){this.value=t.target.value}updateOptions(){let t=false;for(let i of this.options){i.selected=i.label.toLowerCase()==this.value.toLowerCase();if(this.isFilterable&&i.label.toLowerCase().indexOf(this.value.toLowerCase())<0){i.isVisible=false}else{i.isVisible=true}if(this.selectionType=="automatic"){if(!t&&this.value!=""&&i.label.toLowerCase().indexOf(this.value.toLowerCase())>=0){i.selected=true;t=true}else{i.selected=false}}}}openFlyout(){this.isOpen=true}closeFlyout(){this.isOpen=false;this.isTouched=true;this.readyToVerifySlow.emit()}toggleFlyout(){if(this.isOpen){this.closeFlyout()}else{this.openFlyout()}}handleFieldBlur(t){this.isTouched=true;if(this.selectionType=="automatic"){for(let t of this.options){if(t.selected){this.value=t.label;break}}}this.readyToVerifySlow.emit(t)}parseOptionElements(t){for(let i=0;i<t.length;i++){let e=t.item(i);if(e.tagName.toLowerCase()=="yeti-combobox-option"){let t;if(e.hasAttribute("id")){t=e.getAttribute("id")}else{t=`${this.el.getAttribute("id")}_option${i}`}this.options.push({selected:e.hasAttribute("selected")||e.innerHTML==this.value,label:e.innerHTML,isVisible:true,id:t});if(e.hasAttribute("selected")){this.value=e.innerHTML}}}for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}getPlaceholderDisplay(){return this.value!=""?this.value:this.placeholder}handleOptionClick(t){let i=this.options[t];let e=this.el.querySelector(".yeti-combobox-input");for(let i=0;i<this.options.length;i++){this.options[i].selected=t==i}this.value=i.label;this.closeFlyout();e.focus();this.readyToVerifyFast.emit()}componentWillLoad(){let t=this.el.children;this.componentId=this.el.getAttribute("id");if(!this.componentId||this.componentId==""){this.componentId=o.generateUniqueId();this.el.setAttribute("id",this.componentId)}this.inputId=this.inputId!=""?this.inputId:this.componentId+"_input";this.buttonId=this.componentId+"_button";this.dropdownId=this.componentId+"_dropdown";this.inputName=this.inputName!=""?this.inputName:this.inputId;if(t.length>0){this.parseOptionElements(t)}this.selectionType=this.selectionType=="automatic"?this.selectionType:"manual"}render(){let t="yeti-combobox-wrapper";let i="yeti-combobox-dropdown";let s=this.isOpen&&this.cursorPosition!=-1?`${this.componentId}_option${this.cursorPosition}`:``;t+=this.wrapperCss==""?"":` ${this.wrapperCss}`;if(this.isValid==false){t+=" yeti-combobox__error"}i+=this.isOpen?" yeti-combobox-dropdown__open":"";if(this.menuAlignment=="right"){i+=" yeti-combobox-dropdown-align-right"}return[e("div",{key:"792e02e5e276d6b508410025ebd30741f0f74cde",class:t},e("div",{key:"03a6ef40140a7caca947fc84a660a3be47cb36e4",class:"yeti-combobox",onClick:t=>this.handleClick(t)},e("input",Object.assign({key:"cc42e947f127f3908c71d24dd3767a17fd7694a8",type:"text",class:"yeti-combobox-input",value:this.value,name:this.inputName,onFocus:()=>{this.isTouched=true},onBlur:t=>{this.handleFieldBlur(t)},onInput:t=>this.handleInputChange(t),role:"combobox",autocomplete:"off","aria-autocomplete":"none","aria-controls":this.dropdownId,"aria-expanded":this.isOpen,id:this.inputId},this.inputDescribedBy!=""?{"aria-describedby":this.inputDescribedBy}:{},s!=""?{"aria-activedescendant":s}:{})),this.showClear&&this.value!=""?e("button",{class:"yeti-combobox-clear",title:"Clear all selections",onClick:t=>{this.handleClearSelections(t);t.preventDefault()}},e("span",{class:"material-icons yeti-combobox-clear-icon","aria-hidden":"true"},"clear")):"",e("button",{key:"1035bf9688f7a68ad0852f575f8987e7d06f7224",class:"yeti-combobox-button",tabIndex:-1,"aria-controls":this.dropdownId,"aria-expanded":this.isOpen,id:this.buttonId,onClick:t=>{this.handleButtonClick(t)}},!this.isLookup?e("yeti-icon",{iconCode:this.isOpen?"expand_less":"expand_more",alt:this.isOpen?"close":"open"}):e("yeti-icon",{iconCode:"search",alt:this.isOpen?"lookup, close":"lookup, open"}))),e("div",{key:"116a5d4e0a4e64219c26d362e23c44ce8c0ca982",class:i},e("ul",{key:"d688ac6514e132be1ee0a9ea541b13faedd2054c",class:"yeti-combobox-options",id:this.dropdownId,role:"listbox"},this.options.map(((t,i)=>{let s=this.cursorPosition==i?"yeti-combobox-option yeti-combobox-option__hover":"yeti-combobox-option";s+=t.selected?" yeti-combobox-option__selected":"";if(!t.isVisible){return""}return e("li",{id:t.id,key:t.id,role:"option","aria-selected":`${t.selected}`,class:s,onClick:t=>{this.handleOptionClick(i);t.preventDefault()}},e("span",{class:"yeti-combobox-option-label"},t.label),e("span",{class:"yeti-combobox-option-checkmark","aria-hidden":"true"},t.selected?e("yeti-icon",{iconCode:"checkmark"}):""))})))))]}componentDidRender(){if(this.isOpen){let t=this.el.querySelector(".yeti-combobox-dropdown");let i=this.el.querySelector(".yeti-combobox-option__hover");let e=i?i:t;e.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return s(this)}static get watchers(){return{value:["handleValueChange"],selectionType:["handleSelectionTypeChange"]}}};export{h as yeti_combobox};
//# sourceMappingURL=p-cb6b50ed.entry.js.map