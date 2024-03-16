import{r as t,c as i,h as e,g as s}from"./p-e8f90371.js";import{u as o}from"./p-943baa85.js";const h=class{constructor(e){t(this,e);this.readyToVerifySlow=i(this,"readyToVerifySlow",7);this.readyToVerifyFast=i(this,"readyToVerifyFast",7);this.wrapperCss="";this.required=false;this.menuAlignment="";this.isValid=undefined;this.value="";this.placeholder="- Select -";this.options=[];this.isTouched=false;this.iLoveJSX=false;this.isOpen=false;this.cursorPosition=-1;this.showClear=true}handleValueChange(){this.updateOptions()}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeFlyout()}}handleClick(t){console.log("Component clicked!");this.isTouched=true;this.toggleFlyout();t.preventDefault()}handleButtonClick(t){t.preventDefault();console.log("Button clicked!")}handleKeydown(t){let i=t.key.toString().toLowerCase();switch(i){case"tab":{if(!t.shiftKey){if(this.el.querySelectorAll(".yeti-combobox-input:focus").length==0||this.value==""){this.closeFlyout()}}else{if(this.el.querySelectorAll(".yeti-combobox-input:focus").length>0){this.closeFlyout()}}break}case"arrowdown":{if(this.isOpen){this.cursorPosition=(this.cursorPosition+1)%this.options.length;t.preventDefault()}else{this.cursorPosition=t.altKey?this.cursorPosition:0;this.openFlyout();t.preventDefault()}break}case"arrowup":{if(this.isOpen){this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length;t.preventDefault()}else{this.cursorPosition=this.options.length-1;this.openFlyout();t.preventDefault()}break}case"escape":{if(this.isOpen){this.closeFlyout();t.preventDefault()}break}case"enter":{t.preventDefault();let i=t.target;if(i.classList.contains("yeti-combobox-puck")){i.click();break}else{if(this.cursorPosition>=0&&this.isOpen){this.handleOptionClick(this.cursorPosition)}this.closeFlyout()}break}default:{if(i.length==1&&i.match(/[a-zA-Z0-9]/)){this.openFlyout()}}}}handleClearSelections(t){let i=this.el.querySelector(".yeti-combobox-input");for(let t of this.options){t.selected=false}this.value="";i.focus();t.stopPropagation();this.readyToVerifySlow.emit();this.readyToVerifyFast.emit()}handleInputChange(t){this.value=t.target.value}updateOptions(){for(let t of this.options){t.selected=t.label.toLowerCase()==this.value.toLowerCase()}}openFlyout(){this.isOpen=true}closeFlyout(){this.isOpen=false;this.isTouched=true;this.readyToVerifySlow.emit()}toggleFlyout(){if(this.isOpen){this.closeFlyout()}else{this.openFlyout()}}handleFieldBlur(t){this.isTouched=true;this.readyToVerifySlow.emit(t)}parseOptionElements(t){for(let i=0;i<t.length;i++){let e=t.item(i);if(e.tagName.toLowerCase()=="yeti-combobox-option"){let t;if(e.hasAttribute("id")){t=e.getAttribute("id")}else{t=`${this.el.getAttribute("id")}_option${i}`}this.options.push({selected:e.hasAttribute("selected"),label:e.innerHTML,id:t});if(e.hasAttribute("selected")){this.value=e.innerHTML}}}for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}getPlaceholderDisplay(){return this.value!=""?this.value:this.placeholder}handleOptionClick(t){let i=this.options[t];let e=this.el.querySelector(".yeti-combobox-input");for(let i=0;i<this.options.length;i++){this.options[i].selected=t==i}this.value=i.label;this.closeFlyout();e.focus();this.readyToVerifyFast.emit()}componentWillLoad(){let t=this.el.children;this.componentId=this.el.getAttribute("id");if(!this.componentId||this.componentId==""){this.componentId=o.generateUniqueId();this.el.setAttribute("id",this.componentId)}this.inputId=this.componentId+"_input";this.buttonId=this.componentId+"_button";this.dropdownId=this.componentId+"_dropdown";if(t.length>0){this.parseOptionElements(t)}}render(){let t="yeti-combobox-wrapper";let i="yeti-combobox-dropdown";t+=this.wrapperCss==""?"":` ${this.wrapperCss}`;if(this.isValid==false){t+=" yeti-combobox__error"}i+=this.isOpen?" yeti-combobox-dropdown__open":"";if(this.menuAlignment=="right"){i+=" yeti-combobox-dropdown-align-right"}return[e("div",{key:"dfbbd0f9844d13b570ecf4318603024ce8005572",class:t},e("div",{key:"c1dd823e257fe0b57766625c8ac7ca4731ec8d8e",class:"yeti-combobox",onClick:t=>this.handleClick(t)},e("input",{key:"25a449f7cad4ab2516fda4d36febe16fac322d6d",type:"text",class:"yeti-combobox-input",title:this.value,value:this.value,onFocus:()=>{this.isTouched=true},onBlur:()=>{},onInput:t=>this.handleInputChange(t),role:"combobox","aria-autocomplete":"none","aria-controls":this.dropdownId,"aria-expanded":this.isOpen,id:this.inputId}),this.showClear&&this.value!=""?e("button",{class:"yeti-combobox-clear",title:"Clear all selections",onClick:t=>{this.handleClearSelections(t);t.preventDefault()}},e("span",{class:"material-icons yeti-combobox-clear-icon"},"clear")):"",e("button",{key:"b06f9d2cb1ae141a7b1870a031ddc3f9697e0606",class:"yeti-combobox-button",tabIndex:-1,"aria-controls":this.dropdownId,"aria-expanded":this.isOpen,id:this.buttonId,onClick:t=>{this.handleButtonClick(t)}},e("yeti-icon",{key:"7a272a484cae6fd2d1dcf5c7ee9c483f0a5892fc",iconCode:this.isOpen?"expand_less":"expand_more",alt:this.isOpen?"close":"open"}))),e("div",{key:"44a0aef04d7b74d83728916314c2b15964e6969e",class:i,"aria-hidden":"true"},e("ul",{key:"00f6b5a0f6d0061273ce5c2cfde9ba2b9b8dbc00",class:"yeti-combobox-options",id:this.dropdownId,role:"listbox"},this.options.map(((t,i)=>{let s=this.cursorPosition==i?"yeti-combobox-option yeti-combobox-option__hover":"yeti-combobox-option";s+=t.selected?" yeti-combobox-option__selected":"";return e("li",{id:t.id,key:t.id,role:"option","aria-selected":t.selected},e("button",{class:s,tabIndex:-1,onClick:t=>{this.handleOptionClick(i);t.preventDefault()}},e("span",{class:"yeti-combobox-option-label"},t.label),e("span",{class:"yeti-combobox-option-checkmark"},t.selected?e("yeti-icon",{iconCode:"checkmark",alt:"selected"}):"")))})))))]}componentDidRender(){if(this.isOpen){let t=this.el.querySelector(".yeti-combobox-dropdown");let i=this.el.querySelector(".yeti-combobox-option__hover");let e=i?i:t;e.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return s(this)}static get watchers(){return{value:["handleValueChange"]}}};export{h as yeti_combobox};
//# sourceMappingURL=p-2e731660.entry.js.map