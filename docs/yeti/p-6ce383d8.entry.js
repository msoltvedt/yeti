import{r as e,c as t,h as i,g as a}from"./p-0d1be970.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.keepFocusOnButton=false;this.pickerHeading=s.generateUniqueId();this.inputClass="";this.inputId="";this.inputName="";this.required=false;this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.showErrorTooltip=false;this.tooltipText="Enter the date in mm/dd/yyyy format.";this.isTouched=false;this.cursorDate=new Date;this.iLoveJSX=false;this.isPickerVisible=false;this.pickerJustOpened=false}watchInputValue(){let e=/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;if(this.value.match(e)==null){this.isValid=false}else{this.isValid=this.value==""&&this.required&&this.isTouched?false:true;this.cursorDate=this.value==""?new Date:new Date(this.value)}if(this.isTouched){this.readyToVerifySlow.emit()}}clickHandler(e){let t=e.target;if(t.classList.contains("yeti-input")){this.isPickerVisible=false}}handleDefocusingClick(){if(this.isPickerVisible&&!this.pickerJustOpened){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}this.pickerJustOpened=false}listenForTabOut(e){if(e.key=="Tab"&&e.target.classList.contains("yeti-date-calendar-day")&&!e.shiftKey){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-picker-action-button-first")&&e.shiftKey){this.isPickerVisible=false;this.isTouched=true}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&!e.shiftKey){this.isTouched=true;this.watchInputValue()}}handleFieldBlur(e){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}handlePotentialEnterKeyPress(e){if(e.key=="Enter"){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}}handleIconClick(e){this.isTouched=true;this.isPickerVisible=!this.isPickerVisible;this.pickerJustOpened=true;e.preventDefault()}handleSelectDate(e){let t=e.target;let i=parseInt(t.attributes.getNamedItem("data-date").value);let a=this.cursorDate;let s=this.el.querySelector(".yeti-date-button");e.preventDefault();a.setDate(i);this.value=this.convertDateToInputValueString(a);this.isPickerVisible=false;if(s){s.focus()}}handleCalendarKeydown(e){switch(e.key){case"Home":{e.preventDefault();this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"End":{e.preventDefault();this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"PageUp":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowRight":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowUp":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-7);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowDown":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+7);this.iLoveJSX=!this.iLoveJSX;break}case"Escape":{let e=this.el.querySelector(".yeti-date-button");this.isPickerVisible=false;if(e){e.focus()}break}case"Tab":{break}case" ":case"Enter":{this.handleSelectDate(e);break}}}getFirstDayOfWeek(e){return e.getDate()-e.getDay()}getLastDayOfWeek(e){return e.getDate()+6-e.getDay()}getAnalogousDateInTargetMonthsGrid(e,t){let i=new Date(e.getFullYear(),e.getMonth(),1);let a=i.getDay();let s=Math.floor((a+e.getDate())/7);let h=e.getDay();let d;let r;let c;t.setDate(1);c=new Date(e.getFullYear(),e.getMonth(),0).getDate();r=s*7+h+1-t.getDay();r+=r<1?7:0;while(r>c){r-=7}d=new Date(t);d.setDate(r);return d}getSelectedDateInThisMonth(e){if(this.value==""){return-1}else{let t=new Date(this.value);if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}}getTodayInThisMonth(e){let t=new Date;if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(e){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(e)}getIconButtonLabel(){return this.value==""?"Choose date":`Change date, ${this.value}`}renderMonthTBody(e){let t=new Date(e.getFullYear(),e.getMonth(),1);let a=t.getDay();let s=new Date(e.getFullYear(),1,29).getMonth()==1;let h=0;let d=[];let r=this.getSelectedDateInThisMonth(e);let c=this.getTodayInThisMonth(e);switch(e.getMonth()){case 3:case 5:case 8:case 10:h=30;break;case 1:h=s?29:28;break;default:h=31}for(let e=0,t=0,s=1;e<6;e++){let l=[];for(let e=0;e<7;e++,t++){if(t<a){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{if(t-a>=h){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{let e="yeti-date-calendar-day";let t=this.cursorDate.getDate()==s?0:-1;e+=c==s&&!(r==s)?" yeti-date-calendar-day-today":"";e+=r==s?" yeti-date-calendar-day-selected":"";l.push(i("td",{"data-date":s,class:e,tabindex:t,onClick:e=>{this.handleSelectDate(e)}},s))}s++}}d.push(i("tr",{"data-week-of-month":e},l))}return d}renderInput(e="yeti-input yeti-date-field"){return i("input",Object.assign({type:"text",class:e,id:this.inputId,name:this.inputName,value:this.value,onBlur:e=>this.handleFieldBlur(e),onKeyPress:e=>this.handlePotentialEnterKeyPress(e),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},this.labelledBy!=""?{"aria-labelledBy":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}))}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=s.generateUniqueId();this.el.setAttribute("id",e)}this.inputId=this.inputId!=""?this.inputId:`${e}_input`;this.inputName=this.inputId;this.pickerHeading=`${e}_pickerHeading`;this.watchInputValue()}render(){let e="yeti-input yeti-date-field";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"69bdc34163ac614e897e71fd3ad86fed03c5d8ab",class:"yeti-date"},this.showErrorTooltip&&this.isValid==false?i("yeti-tooltip",{text:this.tooltipText,position:"below",forceOpen:true},this.renderInput(e)):this.renderInput(e),i("button",{key:"342cd7c56286052bc7b021ded6cc6a4b07a629f0",class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:e=>{this.handleIconClick(e)}},i("span",{key:"11b84e2180c8a2cd62f8202ca70da05b6bb66e2d",class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{key:"73574b02d77023d198e7eec118fe7255fc8ea1b3",class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{key:"234c39fc0d08b79d33f60102c1e653485a812f1f",class:"yeti-date-picker-header"},i("h2",{key:"8eaa66912579db65dc8ad6d585462ba1db89513a",class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{key:"66467271788d3e45e99a3df63f1a8a1e30115ed1",class:"yeti-date-picker-actions"},i("li",{key:"d215d8b4a018886497e7671742f0de05e6388680",class:"yeti-date-picker-action"},i("button",{key:"6172f3c14f13e20f801c7bd5a1a7524a568e990a",class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:e=>{this.cursorDatePreviousYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"581211edc2f1eb544548beb1e971d09b9cc74996",class:"yeti-a11y-hidden"},"Previous year"),i("span",{key:"80ef8c9476f8849c6984e3fa255207286733fc96",class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{key:"b6e1052c55bedec98a004f9da02a84dd083e038e",class:"yeti-date-picker-action"},i("button",{key:"e1d9fea6b2c7c43932d6682d47a8a95d83050de5",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDatePreviousMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"a5b9bf65c552a2928c58635ff090fcbad68b9664",class:"yeti-a11y-hidden"},"Previous month"),i("span",{key:"eaa46c87cf8176a0ddd67c7d0d2f7d2fc153925e",class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{key:"12d3f6970a12d3967846eb0c9bb1d501f3c79343",class:"yeti-date-picker-action"},i("button",{key:"a9c086ecc2195d608b7e366b88a3d6d759bdcd58",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"aa8324002307dabce396525a81c5a3aa54cc9bd8",class:"yeti-a11y-hidden"},"Next month"),i("span",{key:"d1e3f577c31cbee321c78a984d8d642707a5397a",class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{key:"38178b590b1eff88470c2c3f5d2df7c76f33e1c4",class:"yeti-date-picker-action"},i("button",{key:"559bc133e4599f6bc78b2f3b93e5a8bc06befff6",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"a152fa29da70b35c0089394724b0b9ad04d56d4c",class:"yeti-a11y-hidden"},"Next year"),i("span",{key:"1433bde83e4f155c9c0ca575e7fa29893beab6e6",class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{key:"566dd01f2239a08905d993f43d05a4b04b0558fe",class:"yeti-date-calendar",role:"grid","aria-labeledby":this.pickerHeading,onKeyDown:e=>{this.handleCalendarKeydown(e)}},i("thead",{key:"8d770bb0b7e04fd34f219bfec5b5a5ccd6f33f14"},i("tr",{key:"9b3d393ac4427fff061fc176b437391d3e84c65f"},i("th",{key:"a33904c4800de9c9e87dc8b1bddb41caa6774eb3",class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{key:"2c7f47aa1374d5374435df2d5c1552fcacbe1064",class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{key:"b628417e7c74d3839524b9a9d727d8044dcc6858",class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{key:"ca9af3a13b84f8c00f7492afc3f30cabd92e3897",class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{key:"0d15a34a632782ce1c4167dd47ed0630967e2bc2",class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{key:"1535111b46ecba398c14d532247e22b8b5012d62",class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{key:"76f23971b71342ed7b93cb7fddc31c7ba3167d07",class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}componentDidRender(){if(this.isPickerVisible){let e=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');let t=this.el.querySelector(".yeti-date-picker");if(e&&!this.keepFocusOnButton){e.scrollIntoView({behavior:"smooth",block:"nearest"});e.focus()}if(this.keepFocusOnButton){this.keepFocusOnButton=false}t.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};const d=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.readyToVerifyFast=t(this,"readyToVerifyFast",7);this.searchFieldClear=t(this,"searchFieldClear",7);this.inputClass="";this.wrapperClass="";this.autocomplete="";this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.maxlength=0;this.required=false;this.type="text";this.isValid=true;this.value="";this.inputTabindex="";this.labeledBy="";this.describedBy="";this.description="";this.placeholder="";this.controls="";this.isTouched=false}handleKeyUp(e){this.isTouched=true;this.value=e.target.value;this.readyToVerifyFast.emit({originalEvent:e,yetiInput:this.el,value:e.target.value})}handleClearClick(e){this.value="";this.el.querySelector(".yeti-input").focus();e.preventDefault();this.searchFieldClear.emit({originalEvent:e,yetiInput:this.el,value:e.target.value});return false}handleFieldBlur(e){e.stopImmediatePropagation();this.isTouched=true;this.value=e.target.value;this.readyToVerifySlow.emit({originalEvent:e,yetiInput:this.el,value:e.target.value})}render(){let e="yeti-input";let t="yeti-input-wrapper";let a=this.value!=""?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.wrapperClass!=""){t+=" "+this.wrapperClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"7dd2445e92484def9c8172ff9f46370162dba935",class:t},i("input",Object.assign({key:"b4bd5cb23338f6f451443a57e2dcf0ef74b0a94b",type:this.type,class:e,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:e=>this.handleKeyUp(e),onBlur:e=>this.handleFieldBlur(e),"aria-invalid":!this.isValid},this.autocomplete!=""?{autocomplete:this.autocomplete}:{},this.inputTabindex!=""?{tabindex:this.inputTabindex}:{},this.labeledBy!=""?{"aria-labelledby":this.labeledBy}:{},this.controls!=""?{"aria-controls":this.controls}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{},this.maxlength!=0?{maxlength:this.maxlength}:{})),i("button",{key:"b18d036445fe1b5bf9f27bc8d9343bcfad199da3",class:a,onClick:e=>this.handleClearClick(e)},i("span",{key:"a3e330619eea86a3b816c91480e8ea13ca4614c4",class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),i("span",{key:"cb3931b98925ef611ddff1e59feb676686a54721",class:"yeti-a11y-hidden"},"Clear search input")))}get el(){return a(this)}};export{h as yeti_date_picker,d as yeti_input};
//# sourceMappingURL=p-6ce383d8.entry.js.map