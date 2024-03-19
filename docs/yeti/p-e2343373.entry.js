import{r as e,c as t,h as i,g as a}from"./p-e8f90371.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.keepFocusOnButton=false;this.pickerHeading=s.generateUniqueId();this.inputClass="";this.inputId="";this.inputName="";this.required=false;this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.showErrorTooltip=false;this.tooltipText="Enter the date in mm/dd/yyyy format.";this.isTouched=false;this.cursorDate=new Date;this.iLoveJSX=false;this.isPickerVisible=false;this.pickerJustOpened=false}watchInputValue(){let e=/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;if(this.value.match(e)==null){this.isValid=false}else{this.isValid=this.value==""&&this.required&&this.isTouched?false:true;this.cursorDate=this.value==""?new Date:new Date(this.value)}if(this.isTouched){this.readyToVerifySlow.emit()}}clickHandler(e){let t=e.target;if(t.classList.contains("yeti-input")){this.isPickerVisible=false}}handleDefocusingClick(){if(this.isPickerVisible&&!this.pickerJustOpened){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}this.pickerJustOpened=false}listenForTabOut(e){if(e.key=="Tab"&&e.target.classList.contains("yeti-date-calendar-day")&&!e.shiftKey){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-picker-action-button-first")&&e.shiftKey){this.isPickerVisible=false;this.isTouched=true}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&!e.shiftKey){this.isTouched=true;this.watchInputValue()}}handleFieldBlur(e){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}handlePotentialEnterKeyPress(e){if(e.key=="Enter"){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}}handleIconClick(e){this.isTouched=true;this.isPickerVisible=!this.isPickerVisible;this.pickerJustOpened=true;e.preventDefault()}handleSelectDate(e){let t=e.target;let i=parseInt(t.attributes.getNamedItem("data-date").value);let a=this.cursorDate;let s=this.el.querySelector(".yeti-date-button");e.preventDefault();a.setDate(i);this.value=this.convertDateToInputValueString(a);this.isPickerVisible=false;if(s){s.focus()}}handleCalendarKeydown(e){switch(e.key){case"Home":{e.preventDefault();this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"End":{e.preventDefault();this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"PageUp":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowRight":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowUp":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-7);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowDown":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+7);this.iLoveJSX=!this.iLoveJSX;break}case"Escape":{let e=this.el.querySelector(".yeti-date-button");this.isPickerVisible=false;if(e){e.focus()}break}case"Tab":{break}case" ":case"Enter":{this.handleSelectDate(e);break}}}getFirstDayOfWeek(e){return e.getDate()-e.getDay()}getLastDayOfWeek(e){return e.getDate()+6-e.getDay()}getAnalogousDateInTargetMonthsGrid(e,t){let i=new Date(e.getFullYear(),e.getMonth(),1);let a=i.getDay();let s=Math.floor((a+e.getDate())/7);let h=e.getDay();let d;let r;let c;t.setDate(1);c=new Date(e.getFullYear(),e.getMonth(),0).getDate();r=s*7+h+1-t.getDay();r+=r<1?7:0;while(r>c){r-=7}d=new Date(t);d.setDate(r);return d}getSelectedDateInThisMonth(e){if(this.value==""){return-1}else{let t=new Date(this.value);if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}}getTodayInThisMonth(e){let t=new Date;if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(e){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(e)}getIconButtonLabel(){return this.value==""?"Choose date":`Change date, ${this.value}`}renderMonthTBody(e){let t=new Date(e.getFullYear(),e.getMonth(),1);let a=t.getDay();let s=new Date(e.getFullYear(),1,29).getMonth()==1;let h=0;let d=[];let r=this.getSelectedDateInThisMonth(e);let c=this.getTodayInThisMonth(e);switch(e.getMonth()){case 3:case 5:case 8:case 10:h=30;break;case 1:h=s?29:28;break;default:h=31}for(let e=0,t=0,s=1;e<6;e++){let l=[];for(let e=0;e<7;e++,t++){if(t<a){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{if(t-a>=h){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{let e="yeti-date-calendar-day";let t=this.cursorDate.getDate()==s?0:-1;e+=c==s&&!(r==s)?" yeti-date-calendar-day-today":"";e+=r==s?" yeti-date-calendar-day-selected":"";l.push(i("td",{"data-date":s,class:e,tabindex:t,onClick:e=>{this.handleSelectDate(e)}},s))}s++}}d.push(i("tr",{"data-week-of-month":e},l))}return d}renderInput(e="yeti-input yeti-date-field"){return i("input",Object.assign({type:"text",class:e,id:this.inputId,name:this.inputName,value:this.value,onBlur:e=>this.handleFieldBlur(e),onKeyPress:e=>this.handlePotentialEnterKeyPress(e),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},this.labelledBy!=""?{"aria-labelledBy":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}))}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=s.generateUniqueId();this.el.setAttribute("id",e)}this.inputId=this.inputId!=""?this.inputId:`${e}_input`;this.inputName=this.inputId;this.pickerHeading=`${e}_pickerHeading`;this.watchInputValue()}render(){let e="yeti-input yeti-date-field";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"5755cac917ab72296eccc1801d7c7302c82ff5ad",class:"yeti-date"},this.showErrorTooltip&&this.isValid==false?i("yeti-tooltip",{text:this.tooltipText,position:"below",forceOpen:true},this.renderInput(e)):this.renderInput(e),i("button",{key:"e48777442783d413e377d290a8ed3f79a32067b9",class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:e=>{this.handleIconClick(e)}},i("span",{key:"13f91ccb36ecc449dda3fe5ca842972c0a27e721",class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{key:"b07052053b39cbb4f1b8198893692957e873a1d7",class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{key:"9f74a2d9ccef1926211850ad1ae2af6bf28f3fe2",class:"yeti-date-picker-header"},i("h2",{key:"372c1397d8742b8c073475e415f51a93d218eb70",class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{key:"95b5991063461f7d6a3d3cd384e99a71165d57e5",class:"yeti-date-picker-actions"},i("li",{key:"1dd5d5baaa2eb4291f31f8abbfb66d6b9ee77c33",class:"yeti-date-picker-action"},i("button",{key:"97312f608f924a5067d0aaf686fb50655393b687",class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:e=>{this.cursorDatePreviousYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"d74acf4ad0b7db25d69c426a333ae7ae46afe8b9",class:"yeti-a11y-hidden"},"Previous year"),i("span",{key:"26c28a82ce08b3ed9264f5553f27c4c1fa5fece5",class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{key:"f5e75d177e8b3bd565281ef5395c63816f8b6aa2",class:"yeti-date-picker-action"},i("button",{key:"ba94e4a63fc9c494c0ed46378bc78deafe3e0317",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDatePreviousMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"fc37feba29be457504831dfe254884fa0a003873",class:"yeti-a11y-hidden"},"Previous month"),i("span",{key:"2c64033ead6edb8c55a9281e681492505a1ea6e8",class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{key:"dc313be00efc6553c65e185232ed93072bb61740",class:"yeti-date-picker-action"},i("button",{key:"7f62352abf4a756a053038fe85ac7b84d91bcc58",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"07ed2564b2cd2548b63d0753c74ff59c064b4e9d",class:"yeti-a11y-hidden"},"Next month"),i("span",{key:"03aa1872c77d6ae2620a7f553b36fbe1651a8cb4",class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{key:"212efbdb662534c2b64854e61015f682619a68e8",class:"yeti-date-picker-action"},i("button",{key:"0ff5b4c248d8be4521b338bd786e0263d37da371",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"09b525841a7a2d1800c4fd09c32c45495e538eb5",class:"yeti-a11y-hidden"},"Next year"),i("span",{key:"84b4ea757069de8461bdf1d3d4a47d3c10aa4ccc",class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{key:"e9c5d7f71e4cad060beb6de99904b01472c4e698",class:"yeti-date-calendar",role:"grid","aria-labeledby":this.pickerHeading,onKeyDown:e=>{this.handleCalendarKeydown(e)}},i("thead",{key:"5f277ab03372c9456a958e9d2f9e3fc9af1ff1b9"},i("tr",{key:"2e6f8b9d4bc9faa5b51ebd725bec8c5b5e4617b1"},i("th",{key:"6d3023d66f29be2c9f35018cf6f2df02a8a46915",class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{key:"13018c5adf2f7636c2dc9688075a50882ecc68c1",class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{key:"65d5cb9e03d41200ce5e59c249ba69c68078dbdb",class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{key:"be533f7b6295dfc1f8b373e1451ba741a480b582",class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{key:"d9b9f8c433d8024b45b34752f0c964187b22772e",class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{key:"48c3cf49277f30e8a85f34c6742184ae639cd571",class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{key:"5904b6093e211a66df7d44f9408962f0dd462345",class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}componentDidRender(){if(this.isPickerVisible){let e=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');let t=this.el.querySelector(".yeti-date-picker");if(e&&!this.keepFocusOnButton){e.scrollIntoView({behavior:"smooth",block:"nearest"});e.focus()}if(this.keepFocusOnButton){this.keepFocusOnButton=false}t.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};const d=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.readyToVerifyFast=t(this,"readyToVerifyFast",7);this.searchFieldClear=t(this,"searchFieldClear",7);this.inputClass="";this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.maxlength=0;this.required=false;this.type="text";this.isValid=undefined;this.value="";this.labeledBy="";this.describedBy="";this.description="";this.placeholder="";this.isTouched=false}handleKeyUp(e){this.isTouched=true;this.value=e.target.value;this.readyToVerifyFast.emit(e)}handleClearClick(e){this.value="";this.el.querySelector(".yeti-input").focus();e.preventDefault();this.searchFieldClear.emit(e);return false}handleFieldBlur(e){e.stopImmediatePropagation();this.isTouched=true;this.value=e.target.value;this.readyToVerifySlow.emit(e)}render(){let e="yeti-input";let t=this.value!=""?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"4ac18182e5b5b324693691902a01cbbaad6c402d",class:"yeti-input-wrapper"},i("input",Object.assign({key:"576eea55a103aebe9bb45d179e120c85fce2b21f",type:this.type,class:e,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:e=>this.handleKeyUp(e),onBlur:e=>this.handleFieldBlur(e),"aria-invalid":!this.isValid},this.labeledBy!=""?{"aria-labelledby":this.labeledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{},this.maxlength!=0?{maxlength:this.maxlength}:{})),i("button",{key:"b4534a3efc7d3dd61f48b6ef0109f72f24e942dc",class:t,onClick:e=>this.handleClearClick(e)},i("span",{key:"c13dfee696e1e89f19a5ed13b4f8e7e61ada3520",class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),i("span",{key:"a08217307ccbfdedee45ffa4e04c540009340475",class:"yeti-a11y-hidden"},"Clear search input")))}get el(){return a(this)}};export{h as yeti_date_picker,d as yeti_input};
//# sourceMappingURL=p-e2343373.entry.js.map