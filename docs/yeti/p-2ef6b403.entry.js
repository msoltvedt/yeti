import{r as e,c as t,h as i,g as a}from"./p-39d3f65a.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.keepFocusOnButton=false;this.pickerHeading=s.generateUniqueId();this.inputClass="";this.inputId="";this.inputName="";this.required=false;this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.showErrorTooltip=false;this.tooltipText="Enter the date in mm/dd/yyyy format.";this.isTouched=false;this.cursorDate=new Date;this.iLoveJSX=false;this.isPickerVisible=false;this.pickerJustOpened=false}watchInputValue(){let e=/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;if(this.value.match(e)==null){this.isValid=false}else{this.isValid=this.value==""&&this.required&&this.isTouched?false:true;this.cursorDate=this.value==""?new Date:new Date(this.value)}if(this.isTouched){this.readyToVerifySlow.emit()}}clickHandler(e){let t=e.target;if(t.classList.contains("yeti-input")){this.isPickerVisible=false}}handleDefocusingClick(){if(this.isPickerVisible&&!this.pickerJustOpened){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}this.pickerJustOpened=false}listenForTabOut(e){if(e.key=="Tab"&&e.target.classList.contains("yeti-date-calendar-day")&&!e.shiftKey){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-picker-action-button-first")&&e.shiftKey){this.isPickerVisible=false;this.isTouched=true}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&!e.shiftKey){this.isTouched=true;this.watchInputValue()}}handleFieldBlur(e){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}handlePotentialEnterKeyPress(e){if(e.key=="Enter"){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}}handleIconClick(e){this.isTouched=true;this.isPickerVisible=!this.isPickerVisible;this.pickerJustOpened=true;e.preventDefault()}handleSelectDate(e){let t=e.target;let i=parseInt(t.attributes.getNamedItem("data-date").value);let a=this.cursorDate;let s=this.el.querySelector(".yeti-date-button");e.preventDefault();a.setDate(i);this.value=this.convertDateToInputValueString(a);this.isPickerVisible=false;if(s){s.focus()}}handleCalendarKeydown(e){switch(e.key){case"Home":{e.preventDefault();this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"End":{e.preventDefault();this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"PageUp":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowRight":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowUp":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-7);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowDown":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+7);this.iLoveJSX=!this.iLoveJSX;break}case"Escape":{let e=this.el.querySelector(".yeti-date-button");this.isPickerVisible=false;if(e){e.focus()}break}case"Tab":{break}case" ":case"Enter":{this.handleSelectDate(e);break}}}getFirstDayOfWeek(e){return e.getDate()-e.getDay()}getLastDayOfWeek(e){return e.getDate()+6-e.getDay()}getAnalogousDateInTargetMonthsGrid(e,t){let i=new Date(e.getFullYear(),e.getMonth(),1);let a=i.getDay();let s=Math.floor((a+e.getDate())/7);let h=e.getDay();let d;let r;let c;t.setDate(1);c=new Date(e.getFullYear(),e.getMonth(),0).getDate();r=s*7+h+1-t.getDay();r+=r<1?7:0;while(r>c){r-=7}d=new Date(t);d.setDate(r);return d}getSelectedDateInThisMonth(e){if(this.value==""){return-1}else{let t=new Date(this.value);if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}}getTodayInThisMonth(e){let t=new Date;if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(e){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(e)}getIconButtonLabel(){return this.value==""?"Choose date":`Change date, ${this.value}`}renderMonthTBody(e){let t=new Date(e.getFullYear(),e.getMonth(),1);let a=t.getDay();let s=new Date(e.getFullYear(),1,29).getMonth()==1;let h=0;let d=[];let r=this.getSelectedDateInThisMonth(e);let c=this.getTodayInThisMonth(e);switch(e.getMonth()){case 3:case 5:case 8:case 10:h=30;break;case 1:h=s?29:28;break;default:h=31}for(let e=0,t=0,s=1;e<6;e++){let l=[];for(let e=0;e<7;e++,t++){if(t<a){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{if(t-a>=h){l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{let e="yeti-date-calendar-day";let t=this.cursorDate.getDate()==s?0:-1;e+=c==s&&!(r==s)?" yeti-date-calendar-day-today":"";e+=r==s?" yeti-date-calendar-day-selected":"";l.push(i("td",{"data-date":s,class:e,tabindex:t,onClick:e=>{this.handleSelectDate(e)}},s))}s++}}d.push(i("tr",{"data-week-of-month":e},l))}return d}renderInput(e="yeti-input yeti-date-field"){return i("input",Object.assign({type:"text",class:e,id:this.inputId,name:this.inputName,value:this.value,onBlur:e=>this.handleFieldBlur(e),onKeyPress:e=>this.handlePotentialEnterKeyPress(e),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},this.labelledBy!=""?{"aria-labelledBy":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}))}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=s.generateUniqueId();this.el.setAttribute("id",e)}this.inputId=this.inputId!=""?this.inputId:`${e}_input`;this.inputName=this.inputId;this.pickerHeading=`${e}_pickerHeading`;this.watchInputValue()}render(){let e="yeti-input yeti-date-field";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"d758936d78134206c219a4d362f85d0e06eec1fc",class:"yeti-date"},this.showErrorTooltip&&this.isValid==false?i("yeti-tooltip",{text:this.tooltipText,position:"below",forceOpen:true},this.renderInput(e)):this.renderInput(e),i("button",{key:"5f7f2efd69c86605954a983a15ecf166d1a208e4",class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:e=>{this.handleIconClick(e)}},i("span",{key:"d47fccb317d9d8f50b3a0a809486d686b5e1cba2",class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{key:"7fd8652b12492f0889d4e698ff0cfd394e06e535",class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{key:"eb1db55bed90523b01b9735d0e3861d13b2bbca7",class:"yeti-date-picker-header"},i("h2",{key:"24ca58134820a8042a3adc9dd06eaa33bb7bc766",class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{key:"78040720b9ee7c6727de9cdc81dfa924805a4074",class:"yeti-date-picker-actions"},i("li",{key:"fb385a8db7f4110a53d7c9f6c980fec495462e65",class:"yeti-date-picker-action"},i("button",{key:"c5e1c36b36624e8d7d5afa5bc507cf76dfa13485",class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:e=>{this.cursorDatePreviousYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"81420afacf9b39346991ddcbcc711423ac7705cd",class:"yeti-a11y-hidden"},"Previous year"),i("span",{key:"0fed913ab2e7e05d7575b02ca905b1c314fa27af",class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{key:"2aef4a0184a44be5515e949ff3b50f07da2578fb",class:"yeti-date-picker-action"},i("button",{key:"09c35cfbdac20e1d0fdcf020adc73a5c9729ca29",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDatePreviousMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"7e00ca20859f388ebc7ce6a921ad3d13b74e67a1",class:"yeti-a11y-hidden"},"Previous month"),i("span",{key:"006e57c09184692ab98b68814d55a074d908c38e",class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{key:"e126cd08ea138c3588f76b11598c1ce714401d01",class:"yeti-date-picker-action"},i("button",{key:"454c411bc141f4b8185d6a7ebff86e3141b38530",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"fda49e53cf139be94ebfb82c3f112bc472ae5dec",class:"yeti-a11y-hidden"},"Next month"),i("span",{key:"0e8ad1ef0344f720567f7ec1f8a2c4749abe0a59",class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{key:"070222384f8c30fd3ad3f170feef82f74242b1c3",class:"yeti-date-picker-action"},i("button",{key:"8bd48e4e7646954e367a6556a6b63c69b834d3cf",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"74af57b678c4ecd5bb9a7b8c01390d0773d62990",class:"yeti-a11y-hidden"},"Next year"),i("span",{key:"4e9ea52a96bbcca9f020e44204a2674e2c451574",class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{key:"1b518e8a930ab4b1f0c51927bb5470f97265ac16",class:"yeti-date-calendar",role:"grid","aria-labeledby":this.pickerHeading,onKeyDown:e=>{this.handleCalendarKeydown(e)}},i("thead",{key:"8e22b6e731450f2698b4e76ceaf08e73d08a00ca"},i("tr",{key:"a8b78d6eeef623fb2c5d6f668af7f28212c8e896"},i("th",{key:"121f4e5ff0de78b37d2e05f3c55abd084821801e",class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{key:"b61cf2c61d293d36e86eb4a030b5c3670709ac63",class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{key:"54f0d35747962d1ce25aaf7405aeb55d6dec330f",class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{key:"be06ad3d04ea008b9fdb284f2df9fa40ba341e1d",class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{key:"0342fd45cfdbd21dcfd2ad5b79719ea2fbfc4714",class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{key:"7fc4ad93f0bc2ec77e2a15baff11f887b9e19eb4",class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{key:"04fdfd4fcadaf66dff0867ef3142055ec9bc7b33",class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}componentDidRender(){if(this.isPickerVisible){let e=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');let t=this.el.querySelector(".yeti-date-picker");if(e&&!this.keepFocusOnButton){e.scrollIntoView({behavior:"smooth",block:"nearest"});e.focus()}if(this.keepFocusOnButton){this.keepFocusOnButton=false}t.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};const d=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.readyToVerifyFast=t(this,"readyToVerifyFast",7);this.searchFieldClear=t(this,"searchFieldClear",7);this.inputClass="";this.wrapperClass="";this.isDisabled=false;this.autocomplete="";this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.maxlength=0;this.required=false;this.type="text";this.isValid=true;this.value="";this.inputTabindex="";this.labeledBy="";this.describedBy="";this.description="";this.placeholder="";this.controls="";this.isTouched=false}handleKeyUp(e){this.isTouched=true;this.value=e.target.value;this.readyToVerifyFast.emit({originalEvent:e,yetiInput:this.el,value:e.target.value})}handleClearClick(e){this.value="";this.el.querySelector(".yeti-input").focus();e.preventDefault();this.searchFieldClear.emit({originalEvent:e,yetiInput:this.el,value:e.target.value});return false}handleFieldBlur(e){e.stopImmediatePropagation();this.isTouched=true;this.value=e.target.value;this.readyToVerifySlow.emit({originalEvent:e,yetiInput:this.el,value:e.target.value})}render(){let e="yeti-input";let t="yeti-input-wrapper";let a=this.value!=""&&!this.isDisabled?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.wrapperClass!=""){t+=" "+this.wrapperClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"219720c2983c2dbbc078e4e01b00508180976669",class:t},i("input",Object.assign({key:"f451aec660639031664160bfdffdf89c566297a5",type:this.type,class:e,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:e=>this.handleKeyUp(e),onBlur:e=>this.handleFieldBlur(e),"aria-invalid":!this.isValid},this.isDisabled?{disabled:this.isDisabled}:{},this.autocomplete!=""?{autocomplete:this.autocomplete}:{},this.inputTabindex!=""?{tabindex:this.inputTabindex}:{},this.labeledBy!=""?{"aria-labelledby":this.labeledBy}:{},this.controls!=""?{"aria-controls":this.controls}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{},this.maxlength!=0?{maxlength:this.maxlength}:{})),i("button",{key:"dbfbe74e2870355eff1aa48637317a1d423e7844",class:a,onClick:e=>this.handleClearClick(e)},i("span",{key:"3111f92fe24377b9e980fb40649383db249b1cf4",class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),i("span",{key:"9c506c918e9ee37db0d3ac9633af2fac2cbf3cf4",class:"yeti-a11y-hidden"},"Clear search input")))}get el(){return a(this)}};export{h as yeti_date_picker,d as yeti_input};
//# sourceMappingURL=p-2ef6b403.entry.js.map