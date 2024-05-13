import{r as e,c as t,h as i,g as a}from"./p-e8f90371.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.keepFocusOnButton=false;this.pickerHeading=s.generateUniqueId();this.inputClass="";this.inputId="";this.inputName="";this.required=false;this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.showErrorTooltip=false;this.tooltipText="Enter the date in mm/dd/yyyy format.";this.isTouched=false;this.cursorDate=new Date;this.iLoveJSX=false;this.isPickerVisible=false;this.pickerJustOpened=false}watchInputValue(){let e=/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;if(this.value.match(e)==null){this.isValid=false}else{this.isValid=this.value==""&&this.required&&this.isTouched?false:true;this.cursorDate=this.value==""?new Date:new Date(this.value)}if(this.isTouched){this.readyToVerifySlow.emit()}}clickHandler(e){let t=e.target;if(t.classList.contains("yeti-input")){this.isPickerVisible=false}}handleDefocusingClick(){if(this.isPickerVisible&&!this.pickerJustOpened){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}this.pickerJustOpened=false}listenForTabOut(e){if(e.key=="Tab"&&e.target.classList.contains("yeti-date-calendar-day")&&!e.shiftKey){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-picker-action-button-first")&&e.shiftKey){this.isPickerVisible=false;this.isTouched=true}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&!e.shiftKey){this.isTouched=true;this.watchInputValue()}}handleFieldBlur(e){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}handlePotentialEnterKeyPress(e){if(e.key=="Enter"){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}}handleIconClick(e){this.isTouched=true;this.isPickerVisible=!this.isPickerVisible;this.pickerJustOpened=true;e.preventDefault()}handleSelectDate(e){let t=e.target;let i=parseInt(t.attributes.getNamedItem("data-date").value);let a=this.cursorDate;let s=this.el.querySelector(".yeti-date-button");e.preventDefault();a.setDate(i);this.value=this.convertDateToInputValueString(a);this.isPickerVisible=false;if(s){s.focus()}}handleCalendarKeydown(e){switch(e.key){case"Home":{e.preventDefault();this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"End":{e.preventDefault();this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"PageUp":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowRight":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowUp":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-7);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowDown":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+7);this.iLoveJSX=!this.iLoveJSX;break}case"Escape":{let e=this.el.querySelector(".yeti-date-button");this.isPickerVisible=false;if(e){e.focus()}break}case"Tab":{break}case" ":case"Enter":{this.handleSelectDate(e);break}}}getFirstDayOfWeek(e){return e.getDate()-e.getDay()}getLastDayOfWeek(e){return e.getDate()+6-e.getDay()}getAnalogousDateInTargetMonthsGrid(e,t){let i=new Date(e.getFullYear(),e.getMonth(),1);let a=i.getDay();let s=Math.floor((a+e.getDate())/7);let h=e.getDay();let d;let r;let c;t.setDate(1);c=new Date(e.getFullYear(),e.getMonth(),0).getDate();r=s*7+h+1-t.getDay();r+=r<1?7:0;while(r>c){r-=7}d=new Date(t);d.setDate(r);return d}getSelectedDateInThisMonth(e){if(this.value==""){return-1}else{let t=new Date(this.value);if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}}getTodayInThisMonth(e){let t=new Date;if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(e){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(e)}getIconButtonLabel(){return this.value==""?"Choose date":`Change date, ${this.value}`}renderMonthTBody(e){let t=new Date(e.getFullYear(),e.getMonth(),1);let a=t.getDay();let s=new Date(e.getFullYear(),1,29).getMonth()==1;let h=0;let d=[];let r=this.getSelectedDateInThisMonth(e);let c=this.getTodayInThisMonth(e);switch(e.getMonth()){case 3:case 5:case 8:case 10:h=30;break;case 1:h=s?29:28;break;default:h=31}for(let e=0,t=0,s=1;e<6;e++){let l=[];for(let e=0;e<7;e++,t++){if(t<a){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{if(t-a>=h){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{let e="yeti-date-calendar-day";let t=this.cursorDate.getDate()==s?0:-1;e+=c==s&&!(r==s)?" yeti-date-calendar-day-today":"";e+=r==s?" yeti-date-calendar-day-selected":"";l.push(i("td",{"data-date":s,class:e,tabindex:t,onClick:e=>{this.handleSelectDate(e)}},s))}s++}}d.push(i("tr",{"data-week-of-month":e},l))}return d}renderInput(e="yeti-input yeti-date-field"){return i("input",Object.assign({type:"text",class:e,id:this.inputId,name:this.inputName,value:this.value,onBlur:e=>this.handleFieldBlur(e),onKeyPress:e=>this.handlePotentialEnterKeyPress(e),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},this.labelledBy!=""?{"aria-labelledBy":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}))}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=s.generateUniqueId();this.el.setAttribute("id",e)}this.inputId=this.inputId!=""?this.inputId:`${e}_input`;this.inputName=this.inputId;this.pickerHeading=`${e}_pickerHeading`;this.watchInputValue()}render(){let e="yeti-input yeti-date-field";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"5be8f041a7a952902c4477f52173fa181f5e5e60",class:"yeti-date"},this.showErrorTooltip&&this.isValid==false?i("yeti-tooltip",{text:this.tooltipText,position:"below",forceOpen:true},this.renderInput(e)):this.renderInput(e),i("button",{key:"a62e680869fa1a26d89f02f25b966c3c58dab263",class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:e=>{this.handleIconClick(e)}},i("span",{key:"996ef599a17711b4dc963b57bb3c1232c2e2d671",class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{key:"7788e0a18a366018bca1648a17a560ba15995ba5",class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{key:"bbb624af9f819756cee166c69d7b879e56fde9fc",class:"yeti-date-picker-header"},i("h2",{key:"8135ab3c3b29426320e0929f60d595b29529a11e",class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{key:"8e6dd82e7e0fd6a77745f94b28fedabb9e930b74",class:"yeti-date-picker-actions"},i("li",{key:"dfc7d336621141369670ea80100a5432c53d7079",class:"yeti-date-picker-action"},i("button",{key:"1642535dd2a1c9f76ee8175d2d030dcbcc122621",class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:e=>{this.cursorDatePreviousYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"9caacbdba9e4ca561790585a91bf1fe7e2ea5597",class:"yeti-a11y-hidden"},"Previous year"),i("span",{key:"9d8acf2a660e05a4667ac0776d940bdc5ebb0372",class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{key:"aef26ccd7c8c6229a0a95eb86929f533a0cff604",class:"yeti-date-picker-action"},i("button",{key:"d8482c161b98a81d9c4fd2d35d9b5617ffffea72",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDatePreviousMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"6ae37c64bb1479c46d6a4d71333e5bbb7319ef07",class:"yeti-a11y-hidden"},"Previous month"),i("span",{key:"60863fe30f641f4ba5a017fa21fcd5a30b5f97b2",class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{key:"a0e4e1f9e23a03b557ea0732dae6411bd1008068",class:"yeti-date-picker-action"},i("button",{key:"b1fa7aa949d8b92c5808a7affd3c0d4e6b87f4e8",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"1ca9d821350a8ff75f8be8cdcb3a373fd9d62af5",class:"yeti-a11y-hidden"},"Next month"),i("span",{key:"5a6332f085780e460a02594726556297fb312f5c",class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{key:"9faab0404b80ddad1b9fed65325ee716be5ca314",class:"yeti-date-picker-action"},i("button",{key:"7acbc517b06797a3892977ae80b58064c75bd35b",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"e1114731848be622fa6d69ded5c4bc99ec93d54b",class:"yeti-a11y-hidden"},"Next year"),i("span",{key:"eb99b2ba97e2467e5c659903a63d69766698842e",class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{key:"464cd30ff344b610ebd3e8ea3b22cce5ffc89449",class:"yeti-date-calendar",role:"grid","aria-labeledby":this.pickerHeading,onKeyDown:e=>{this.handleCalendarKeydown(e)}},i("thead",{key:"c287c39fbd12e292516de6b4f3e295c1c730ef85"},i("tr",{key:"6709b5a03488aa01eb8ba9b2e8564bb6862573da"},i("th",{key:"3121b25ee949ed1cec2c754c2d47e36c99a89eb8",class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{key:"28d137c6aaf88c7554956eb1852fbfdf731d07d7",class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{key:"a048731db854ce9a4ce870d7d5d9297445e73632",class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{key:"6306448e1ff3b9b669207400279005639b06db5e",class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{key:"276269fa9a7556496d8ed157d32b6c8efad03f8a",class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{key:"b31f08f76af4591898483a17ef5c5a4631436888",class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{key:"a11582e2ac884ad3370260463f146276a52c5f4a",class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}componentDidRender(){if(this.isPickerVisible){let e=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');let t=this.el.querySelector(".yeti-date-picker");if(e&&!this.keepFocusOnButton){e.scrollIntoView({behavior:"smooth",block:"nearest"});e.focus()}if(this.keepFocusOnButton){this.keepFocusOnButton=false}t.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};const d=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.readyToVerifyFast=t(this,"readyToVerifyFast",7);this.searchFieldClear=t(this,"searchFieldClear",7);this.inputClass="";this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.maxlength=0;this.required=false;this.type="text";this.isValid=undefined;this.value="";this.labeledBy="";this.describedBy="";this.description="";this.placeholder="";this.isTouched=false}handleKeyUp(e){this.isTouched=true;this.value=e.target.value;this.readyToVerifyFast.emit(e)}handleClearClick(e){this.value="";this.el.querySelector(".yeti-input").focus();e.preventDefault();this.searchFieldClear.emit(e);return false}handleFieldBlur(e){e.stopImmediatePropagation();this.isTouched=true;this.value=e.target.value;this.readyToVerifySlow.emit(e)}render(){let e="yeti-input";let t=this.value!=""?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"ffe1e4a8deddd20545be217f7b055250545b928c",class:"yeti-input-wrapper"},i("input",Object.assign({key:"826974427450de5770d4924aa6b47dd320b809eb",type:this.type,class:e,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:e=>this.handleKeyUp(e),onBlur:e=>this.handleFieldBlur(e),"aria-invalid":!this.isValid},this.labeledBy!=""?{"aria-labelledby":this.labeledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{},this.maxlength!=0?{maxlength:this.maxlength}:{})),i("button",{key:"27e94b16f0a6aff5550c49b7381235323cc6df70",class:t,onClick:e=>this.handleClearClick(e)},i("span",{key:"7105ac923053e01f99387703b88e47e9b808c8f8",class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),i("span",{key:"b66b508613d9e959c696b28809400e03ae4eaff6",class:"yeti-a11y-hidden"},"Clear search input")))}get el(){return a(this)}};export{h as yeti_date_picker,d as yeti_input};
//# sourceMappingURL=p-57f66f3e.entry.js.map