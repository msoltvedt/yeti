import{r as t,c as e,h as i,g as s}from"./p-b0bf542b.js";import{u as a}from"./p-4ae56677.js";const h=class{constructor(i){t(this,i);this.readyToVerifySlow=e(this,"readyToVerifySlow",7);this.keepFocusOnButton=false;this.pickerHeading=a.generateUniqueId();this.inputClass="";this.inputId="";this.inputName="";this.required=false;this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.showErrorTooltip=false;this.tooltipText="Enter the date in mm/dd/yyyy format.";this.isTouched=false;this.cursorDate=new Date;this.iLoveJSX=false;this.isPickerVisible=false;this.pickerJustOpened=false}watchInputValue(){console.log("watchInputValue");let t=/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;if(this.value.match(t)==null){this.isValid=false}else{this.isValid=this.value==""&&this.required&&this.isTouched?false:true;this.cursorDate=this.value==""?new Date:new Date(this.value)}if(this.isTouched){this.readyToVerifySlow.emit()}}clickHandler(t){let e=t.target;if(e.classList.contains("yeti-input")){this.isPickerVisible=false}}handleDefocusingClick(){if(this.isPickerVisible&&!this.pickerJustOpened){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}this.pickerJustOpened=false}listenForTabOut(t){if(t.key=="Tab"&&t.target.classList.contains("yeti-date-calendar-day")&&!t.shiftKey){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}else if(t.key=="Tab"&&t.target.classList.contains("yeti-date-picker-action-button-first")&&t.shiftKey){this.isPickerVisible=false;this.isTouched=true}else if(t.key=="Tab"&&t.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&!t.shiftKey){this.isTouched=true;this.watchInputValue()}}handleFieldBlur(t){let e=t.target.value.replaceAll("-","/");this.isTouched=true;this.value=e}handleIconClick(t){this.isTouched=true;this.isPickerVisible=!this.isPickerVisible;this.pickerJustOpened=true;t.preventDefault()}handleSelectDate(t){let e=t.target;let i=parseInt(e.attributes.getNamedItem("data-date").value);let s=this.cursorDate;let a=this.el.querySelector(".yeti-date-button");t.preventDefault();s.setDate(i);this.value=this.convertDateToInputValueString(s);this.isPickerVisible=false;if(a){a.focus()}}handleCalendarKeydown(t){switch(t.key){case"Home":{t.preventDefault();this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"End":{t.preventDefault();this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"PageUp":{t.preventDefault();let e;if(t.shiftKey){e=new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{e=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,e);this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{t.preventDefault();let e;if(t.shiftKey){e=new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{e=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,e);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":{t.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowRight":{t.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowUp":{t.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-7);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowDown":{t.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+7);this.iLoveJSX=!this.iLoveJSX;break}case"Escape":{let t=this.el.querySelector(".yeti-date-button");this.isPickerVisible=false;if(t){t.focus()}break}case"Tab":{break}case" ":case"Enter":{this.handleSelectDate(t);break}}}getFirstDayOfWeek(t){return t.getDate()-t.getDay()}getLastDayOfWeek(t){return t.getDate()+6-t.getDay()}getAnalogousDateInTargetMonthsGrid(t,e){let i=new Date(t.getFullYear(),t.getMonth(),1);let s=i.getDay();let a=Math.floor((s+t.getDate())/7);let h=t.getDay();let r;let l;let n;e.setDate(1);n=new Date(t.getFullYear(),t.getMonth(),0).getDate();l=a*7+h+1-e.getDay();l+=l<1?7:0;while(l>n){l-=7}r=new Date(e);r.setDate(l);return r}getSelectedDateInThisMonth(t){if(this.value==""){return-1}else{let e=new Date(this.value);if(e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()){return e.getDate()}else{return-1}}}getTodayInThisMonth(t){let e=new Date;if(e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()){return e.getDate()}else{return-1}}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(t){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(t)}getIconButtonLabel(){return this.value==""?"Choose date":`Change date, ${this.value}`}renderMonthTBody(t){let e=new Date(t.getFullYear(),t.getMonth(),1);let s=e.getDay();let a=new Date(t.getFullYear(),1,29).getMonth()==1;let h=0;let r=[];let l=this.getSelectedDateInThisMonth(t);let n=this.getTodayInThisMonth(t);switch(t.getMonth()){case 3:case 5:case 8:case 10:h=30;break;case 1:h=a?29:28;break;default:h=31}for(let t=0,e=0,a=1;t<6;t++){let d=[];for(let t=0;t<7;t++,e++){if(e<s){d.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{if(e-s>=h){d.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{let t="yeti-date-calendar-day";let e=this.cursorDate.getDate()==a?0:-1;t+=n==a&&!(l==a)?" yeti-date-calendar-day-today":"";t+=l==a?" yeti-date-calendar-day-selected":"";d.push(i("td",{"data-date":a,class:t,tabindex:e,onClick:t=>{this.handleSelectDate(t)}},a))}a++}}r.push(i("tr",{"data-week-of-month":t},d))}return r}renderInput(t="yeti-input yeti-date-field"){return i("input",Object.assign({type:"text",class:t,id:this.inputId,name:this.inputName,value:this.value,onBlur:t=>this.handleFieldBlur(t),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},this.labelledBy!=""?{"aria-labelledBy":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}))}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){t=a.generateUniqueId();this.el.setAttribute("id",t)}this.inputId=this.inputId!=""?this.inputId:`${t}_input`;this.inputName=this.inputId;this.pickerHeading=`${t}_pickerHeading`;this.watchInputValue()}render(){let t="yeti-input yeti-date-field";if(this.inputClass!=""){t+=" "+this.inputClass}if(this.isValid==false){t+=" yeti-input__error"}return i("div",{class:"yeti-date"},this.showErrorTooltip&&this.isValid==false?i("yeti-tooltip",{text:this.tooltipText,position:"below",forceOpen:true},this.renderInput(t)):this.renderInput(t),i("button",{class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:t=>{this.handleIconClick(t)}},i("span",{class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{class:"yeti-date-picker-header"},i("h2",{class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},a.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{class:"yeti-date-picker-actions"},i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:t=>{this.cursorDatePreviousYear();t.preventDefault();t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Previous year"),i("span",{class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:t=>{this.cursorDatePreviousMonth();t.preventDefault();t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Previous month"),i("span",{class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:t=>{this.cursorDateNextMonth();t.preventDefault();t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Next month"),i("span",{class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:t=>{this.cursorDateNextYear();t.preventDefault();t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Next year"),i("span",{class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{class:"yeti-date-calendar",role:"grid","aria-labelledby":this.pickerHeading,onKeyDown:t=>{this.handleCalendarKeydown(t)}},i("thead",null,i("tr",null,i("th",{class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}componentDidRender(){if(this.isPickerVisible){let t=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');let e=this.el.querySelector(".yeti-date-picker");if(t&&!this.keepFocusOnButton){t.scrollIntoView({behavior:"smooth",block:"nearest"});t.focus()}if(this.keepFocusOnButton){this.keepFocusOnButton=false}e.scrollIntoView({behavior:"smooth",block:"nearest"})}}componentDidLoad(){let t=this.el.querySelector(".yeti-date-field");t.addEventListener("keydown",(e=>{this.isTouched=true;if(e.key&&e.key=="Enter"){console.log("Enter!");this.value=t.value}}))}get el(){return s(this)}static get watchers(){return{value:["watchInputValue"]}}};const r=class{constructor(i){t(this,i);this.readyToVerifySlow=e(this,"readyToVerifySlow",7);this.readyToVerifyFast=e(this,"readyToVerifyFast",7);this.searchFieldClear=e(this,"searchFieldClear",7);this.inputClass="";this.inputId=a.generateUniqueId();this.inputName=this.inputId;this.maxlength=0;this.required=false;this.type="text";this.isValid=undefined;this.value="";this.labeledBy="";this.describedBy="";this.description="";this.placeholder="";this.isTouched=false}handleKeyUp(t){this.isTouched=true;this.value=t.target.value;this.readyToVerifyFast.emit(t)}handleClearClick(t){this.value="";this.el.querySelector(".yeti-input").focus();t.preventDefault();this.searchFieldClear.emit(t);return false}handleFieldBlur(t){t.stopImmediatePropagation();this.isTouched=true;this.value=t.target.value;this.readyToVerifySlow.emit(t)}render(){let t="yeti-input";let e=this.value!=""?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){t+=" "+this.inputClass}if(this.isValid==false){t+=" yeti-input__error"}return i("div",{class:"yeti-input-wrapper"},i("input",Object.assign({type:this.type,class:t,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:t=>this.handleKeyUp(t),onBlur:t=>this.handleFieldBlur(t),"aria-invalid":!this.isValid},this.labeledBy!=""?{"aria-labelledby":this.labeledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{},this.maxlength!=0?{maxlength:this.maxlength}:{})),i("button",{class:e,onClick:t=>this.handleClearClick(t)},i("span",{class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),i("span",{class:"yeti-a11y-hidden"},"Clear search input")))}get el(){return s(this)}};export{h as yeti_date_picker,r as yeti_input};
//# sourceMappingURL=p-8c7ccd6b.entry.js.map