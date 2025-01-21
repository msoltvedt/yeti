import{r as e,c as t,h as i,g as a}from"./p-39d3f65a.js";import{u as s}from"./p-943baa85.js";const h=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.keepFocusOnButton=false;this.pickerHeading=s.generateUniqueId();this.inputClass="";this.inputId="";this.inputName="";this.required=false;this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.showErrorTooltip=false;this.tooltipText="Enter the date in mm/dd/yyyy format.";this.isTouched=false;this.cursorDate=new Date;this.iLoveJSX=false;this.isPickerVisible=false;this.pickerJustOpened=false}watchInputValue(){let e=/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;if(this.value.match(e)==null){this.isValid=false}else{this.isValid=this.value==""&&this.required&&this.isTouched?false:true;this.cursorDate=this.value==""?new Date:new Date(this.value)}if(this.isTouched){this.readyToVerifySlow.emit()}}clickHandler(e){let t=e.target;if(t.classList.contains("yeti-input")){this.isPickerVisible=false}}handleDefocusingClick(){if(this.isPickerVisible&&!this.pickerJustOpened){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}this.pickerJustOpened=false}listenForTabOut(e){if(e.key=="Tab"&&e.target.classList.contains("yeti-date-calendar-day")&&!e.shiftKey){this.isPickerVisible=false;this.isTouched=true;this.watchInputValue()}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-picker-action-button-first")&&e.shiftKey){this.isPickerVisible=false;this.isTouched=true}else if(e.key=="Tab"&&e.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&!e.shiftKey){this.isTouched=true;this.watchInputValue()}}handleFieldBlur(e){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}handlePotentialEnterKeyPress(e){if(e.key=="Enter"){let t=e.target.value.replaceAll("-","/");this.isTouched=true;this.value=t}}handleIconClick(e){this.isTouched=true;this.isPickerVisible=!this.isPickerVisible;this.pickerJustOpened=true;e.preventDefault()}handleSelectDate(e){let t=e.target;let i=parseInt(t.attributes.getNamedItem("data-date").value);let a=this.cursorDate;let s=this.el.querySelector(".yeti-date-button");e.preventDefault();a.setDate(i);this.value=this.convertDateToInputValueString(a);this.isPickerVisible=false;if(s){s.focus()}}handleCalendarKeydown(e){switch(e.key){case"Home":{e.preventDefault();this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"End":{e.preventDefault();this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));this.iLoveJSX=!this.iLoveJSX;break}case"PageUp":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{e.preventDefault();let t;if(e.shiftKey){t=new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate())}else{t=new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate())}this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,t);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowRight":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+1);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowUp":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()-7);this.iLoveJSX=!this.iLoveJSX;break}case"ArrowDown":{e.preventDefault();this.cursorDate.setDate(this.cursorDate.getDate()+7);this.iLoveJSX=!this.iLoveJSX;break}case"Escape":{let e=this.el.querySelector(".yeti-date-button");this.isPickerVisible=false;if(e){e.focus()}break}case"Tab":{break}case" ":case"Enter":{this.handleSelectDate(e);break}}}getFirstDayOfWeek(e){return e.getDate()-e.getDay()}getLastDayOfWeek(e){return e.getDate()+6-e.getDay()}getAnalogousDateInTargetMonthsGrid(e,t){let i=new Date(e.getFullYear(),e.getMonth(),1);let a=i.getDay();let s=Math.floor((a+e.getDate())/7);let h=e.getDay();let d;let r;let l;t.setDate(1);l=new Date(e.getFullYear(),e.getMonth(),0).getDate();r=s*7+h+1-t.getDay();r+=r<1?7:0;while(r>l){r-=7}d=new Date(t);d.setDate(r);return d}getSelectedDateInThisMonth(e){if(this.value==""){return-1}else{let t=new Date(this.value);if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}}getTodayInThisMonth(e){let t=new Date;if(t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()){return t.getDate()}else{return-1}}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1);this.keepFocusOnButton=true;this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(e){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(e)}getIconButtonLabel(){return this.value==""?"Choose date":`Change date, ${this.value}`}renderMonthTBody(e){let t=new Date(e.getFullYear(),e.getMonth(),1);let a=t.getDay();let s=new Date(e.getFullYear(),1,29).getMonth()==1;let h=0;let d=[];let r=this.getSelectedDateInThisMonth(e);let l=this.getTodayInThisMonth(e);switch(e.getMonth()){case 3:case 5:case 8:case 10:h=30;break;case 1:h=s?29:28;break;default:h=31}for(let e=0,t=0,s=1;e<6;e++){let c=[];for(let e=0;e<7;e++,t++){if(t<a){c.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{if(t-a>=h){c.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}))}else{let e="yeti-date-calendar-day";let t=this.cursorDate.getDate()==s?0:-1;e+=l==s&&!(r==s)?" yeti-date-calendar-day-today":"";e+=r==s?" yeti-date-calendar-day-selected":"";c.push(i("td",{"data-date":s,class:e,tabindex:t,onClick:e=>{this.handleSelectDate(e)}},s))}s++}}d.push(i("tr",{"data-week-of-month":e},c))}return d}renderInput(e="yeti-input yeti-date-field"){return i("input",Object.assign({type:"text",class:e,id:this.inputId,name:this.inputName,value:this.value,onBlur:e=>this.handleFieldBlur(e),onKeyPress:e=>this.handlePotentialEnterKeyPress(e),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},this.labelledBy!=""?{"aria-labelledBy":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}))}componentWillLoad(){let e=this.el.getAttribute("id");if(!e||e==""){e=s.generateUniqueId();this.el.setAttribute("id",e)}this.inputId=this.inputId!=""?this.inputId:`${e}_input`;this.inputName=this.inputId;this.pickerHeading=`${e}_pickerHeading`;this.watchInputValue()}render(){let e="yeti-input yeti-date-field";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"2b8bcdb68da84a4f9c0b4cf64d266a47b3124372",class:"yeti-date"},this.showErrorTooltip&&this.isValid==false?i("yeti-tooltip",{text:this.tooltipText,position:"below",forceOpen:true},this.renderInput(e)):this.renderInput(e),i("button",{key:"5b66056d133948916b719f60d972f9db32c1b2af",class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:e=>{this.handleIconClick(e)}},i("span",{key:"7206431e5d558c73daa78477ac292c3052985ce6",class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{key:"b705946d4a132a34c8a0eedabfd3c345bdf803fe",class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{key:"26c88cad8b4429c695a7877b6e995f529f20abbd",class:"yeti-date-picker-header"},i("h2",{key:"e3ec77ffefc4220082140b339a7379f9a2b7196d",class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{key:"355eedea46282658c0f3db034fb63984480a9368",class:"yeti-date-picker-actions"},i("li",{key:"b942605e335b5374a9d6103dd45cbb6d6ea89449",class:"yeti-date-picker-action"},i("button",{key:"ad11225a35cf7062603db35bb2d407a138f6c898",class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:e=>{this.cursorDatePreviousYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"3a6b84671ffc0b2c87d95120e6c7986da55e8308",class:"yeti-a11y-hidden"},"Previous year"),i("span",{key:"87dae641319033a11b1fd3467a8678d88aaa8db5",class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{key:"8797c57b4613afeda93e832fc0b0608695830b10",class:"yeti-date-picker-action"},i("button",{key:"fadfa03ea5c9673b844d9fe4009ca7f69d0e7ea0",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDatePreviousMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"3dd20ed0b4df297d087a02ce40576ccb99cde26c",class:"yeti-a11y-hidden"},"Previous month"),i("span",{key:"09f83a1af4bfdd7903a8e316cdab1957bba1edf5",class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{key:"4ceb1985236ad26de495909883fa5416af0f0e30",class:"yeti-date-picker-action"},i("button",{key:"37357b25ebab9cffca44f9b8277270d17ad5a9cd",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextMonth();e.preventDefault();e.stopPropagation()}},i("span",{key:"b35f54bbd159f1b9655002a31184d5e37d701a24",class:"yeti-a11y-hidden"},"Next month"),i("span",{key:"64386448258575f536f6f2c4000ac7705b57213e",class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{key:"db94fe1e9afe03d5235d10d4ebccadcee9a396b5",class:"yeti-date-picker-action"},i("button",{key:"1b80727a25886ff712986b9df67c76de3ae095b5",class:"yeti-date-picker-action-button",onClick:e=>{this.cursorDateNextYear();e.preventDefault();e.stopPropagation()}},i("span",{key:"601f767b0c2ee5b36bd6997cf3a147f74a33e2cc",class:"yeti-a11y-hidden"},"Next year"),i("span",{key:"3d800f24b596013699de111137fa4db898e7c1d8",class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{key:"824011e963f164f328e60b859de5ec0fd8b38c55",class:"yeti-date-calendar",role:"grid","aria-labeledby":this.pickerHeading,onKeyDown:e=>{this.handleCalendarKeydown(e)}},i("thead",{key:"b7d5d9b25efed8a3def2712b37094be512bde392"},i("tr",{key:"6791ed8bafe40e3aa5a67b7b5ce194332bc02d0a"},i("th",{key:"77f81d55c44e225b88ddc846fde2608d31d3d2ed",class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{key:"2656228ea333be4a52b428a58d069a7bc50d4e14",class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{key:"8d375a5bab73651e7857b482b13502726e0c0ce9",class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{key:"4992520f6d3834147fc126022ad300d64a948512",class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{key:"df3833c41a53849d2dac42159b1fd0d3c0f3ec3f",class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{key:"d8e5755ec450db467698e662557ef731becada99",class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{key:"1cafc16e6087320ddc6ee59996f3f87c81f0d707",class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}componentDidRender(){if(this.isPickerVisible){let e=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');let t=this.el.querySelector(".yeti-date-picker");if(e&&!this.keepFocusOnButton){e.scrollIntoView({behavior:"smooth",block:"nearest"});e.focus()}if(this.keepFocusOnButton){this.keepFocusOnButton=false}t.scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};const d=class{constructor(i){e(this,i);this.readyToVerifySlow=t(this,"readyToVerifySlow",7);this.readyToVerifyFast=t(this,"readyToVerifyFast",7);this.searchFieldClear=t(this,"searchFieldClear",7);this.inputClass="";this.wrapperClass="";this.isDisabled=false;this.autocomplete="";this.inputId=s.generateUniqueId();this.inputName=this.inputId;this.maxlength=0;this.required=false;this.type="text";this.isValid=true;this.value="";this.inputTabindex="";this.labeledBy="";this.describedBy="";this.description="";this.placeholder="";this.controls="";this.isTouched=false}handleKeyUp(e){this.isTouched=true;this.value=e.target.value;this.readyToVerifyFast.emit({originalEvent:e,yetiInput:this.el,value:e.target.value})}handleClearClick(e){this.value="";this.el.querySelector(".yeti-input").focus();e.preventDefault();this.searchFieldClear.emit({originalEvent:e,yetiInput:this.el,value:e.target.value});return false}handleFieldBlur(e){e.stopImmediatePropagation();this.isTouched=true;this.value=e.target.value;this.readyToVerifySlow.emit({originalEvent:e,yetiInput:this.el,value:e.target.value})}render(){let e="yeti-input";let t="yeti-input-wrapper";let a=this.value!=""&&!this.isDisabled?"yeti-input-clear":"yeti-input-clear yeti-input-clear__inert";if(this.inputClass!=""){e+=" "+this.inputClass}if(this.wrapperClass!=""){t+=" "+this.wrapperClass}if(this.isValid==false){e+=" yeti-input__error"}return i("div",{key:"c6d336f2ab9d78abed67507a70a16ff92773af49",class:t},i("input",Object.assign({key:"6f22b96053fa96804e2b1bda162d2a45d3034f11",type:this.type,class:e,id:this.inputId,name:this.inputName,value:this.value,onKeyUp:e=>this.handleKeyUp(e),onBlur:e=>this.handleFieldBlur(e),"aria-invalid":!this.isValid},this.isDisabled?{disabled:this.isDisabled}:{},this.autocomplete!=""?{autocomplete:this.autocomplete}:{},this.inputTabindex!=""?{tabindex:this.inputTabindex}:{},this.labeledBy!=""?{"aria-labelledby":this.labeledBy}:{},this.controls!=""?{"aria-controls":this.controls}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},this.description!=""?{"aria-description":this.description}:{},this.placeholder!=""?{placeholder:this.placeholder}:{},this.maxlength!=0?{maxlength:this.maxlength}:{})),i("button",{key:"8e088ef65e1be37ef925e33413dfc2c9c7b33252",class:a,onClick:e=>this.handleClearClick(e)},i("span",{key:"ec0d973491df04d8034b8d6e45f4294cbc96d6ec",class:"material-icons yeti-size-4 yeti-typo-size-4","aria-hidden":"true"},"close"),i("span",{key:"59502154883b278aaac312fd6d90e5e82866e743",class:"yeti-a11y-hidden"},"Clear search input")))}get el(){return a(this)}};export{h as yeti_date_picker,d as yeti_input};
//# sourceMappingURL=p-dc8c73f0.entry.js.map