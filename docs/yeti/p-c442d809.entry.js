import{r as t,c as e,h as i,g as a}from"./p-ad659053.js";import{u as s}from"./p-5f7a1b51.js";const h=class{constructor(i){t(this,i),this.readyToVerifySlow=e(this,"readyToVerifySlow",7),this.keepFocusOnButton=!1,this.pickerHeading=s.generateUniqueId(),this.inputClass="",this.inputId="",this.inputName="",this.required=!1,this.isValid=void 0,this.value="",this.labelledBy="",this.describedBy="",this.isTouched=!1,this.cursorDate=new Date,this.iLoveJSX=!1,this.isPickerVisible=!1,this.pickerJustOpened=!1}watchInputValue(){null==this.value.match(/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g)?this.isValid=!1:(this.isValid=""!=this.value||!this.required||!this.isTouched,this.cursorDate=""==this.value?new Date:new Date(this.value)),this.isTouched&&this.readyToVerifySlow.emit()}clickHandler(t){t.target.classList.contains("yeti-input")&&(this.isPickerVisible=!1)}handleDefocusingClick(){this.isPickerVisible&&!this.pickerJustOpened&&(this.isPickerVisible=!1,this.isTouched=!0,this.watchInputValue()),this.pickerJustOpened=!1}listenForTabOut(t){"Tab"==t.key&&t.target.classList.contains("yeti-date-calendar-day")&&!t.shiftKey?(this.isPickerVisible=!1,this.isTouched=!0,this.watchInputValue()):"Tab"==t.key&&t.target.classList.contains("yeti-date-picker-action-button-first")&&t.shiftKey?(this.isPickerVisible=!1,this.isTouched=!0):"Tab"!=t.key||!t.target.classList.contains("yeti-date-button")||this.isPickerVisible||t.shiftKey||(this.isTouched=!0,this.watchInputValue())}handleFieldBlur(t){let e=t.target.value.replaceAll("-","/");this.isTouched=!0,this.value=e}handleIconClick(t){this.isTouched=!0,this.isPickerVisible=!this.isPickerVisible,this.pickerJustOpened=!0,t.preventDefault()}handleSelectDate(t){let e=parseInt(t.target.attributes.getNamedItem("data-date").value),i=this.cursorDate,a=this.el.querySelector(".yeti-date-button");t.preventDefault(),i.setDate(e),this.value=this.convertDateToInputValueString(i),this.isPickerVisible=!1,a&&a.focus()}handleCalendarKeydown(t){switch(t.key){case"Home":t.preventDefault(),this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate)),this.iLoveJSX=!this.iLoveJSX;break;case"End":t.preventDefault(),this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate)),this.iLoveJSX=!this.iLoveJSX;break;case"PageUp":{let e;t.preventDefault(),e=t.shiftKey?new Date(this.cursorDate.getFullYear()-1,this.cursorDate.getMonth(),this.cursorDate.getDate()):new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()-1,this.cursorDate.getDate()),this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,e),this.iLoveJSX=!this.iLoveJSX;break}case"PageDown":{let e;t.preventDefault(),e=t.shiftKey?new Date(this.cursorDate.getFullYear()+1,this.cursorDate.getMonth(),this.cursorDate.getDate()):new Date(this.cursorDate.getFullYear(),this.cursorDate.getMonth()+1,this.cursorDate.getDate()),this.cursorDate=this.getAnalogousDateInTargetMonthsGrid(this.cursorDate,e),this.iLoveJSX=!this.iLoveJSX;break}case"ArrowLeft":t.preventDefault(),this.cursorDate.setDate(this.cursorDate.getDate()-1),this.iLoveJSX=!this.iLoveJSX;break;case"ArrowRight":t.preventDefault(),this.cursorDate.setDate(this.cursorDate.getDate()+1),this.iLoveJSX=!this.iLoveJSX;break;case"ArrowUp":t.preventDefault(),this.cursorDate.setDate(this.cursorDate.getDate()-7),this.iLoveJSX=!this.iLoveJSX;break;case"ArrowDown":t.preventDefault(),this.cursorDate.setDate(this.cursorDate.getDate()+7),this.iLoveJSX=!this.iLoveJSX;break;case"Escape":{let t=this.el.querySelector(".yeti-date-button");this.isPickerVisible=!1,t&&t.focus();break}case"Tab":break;case" ":case"Enter":this.handleSelectDate(t)}}getFirstDayOfWeek(t){return t.getDate()-t.getDay()}getLastDayOfWeek(t){return t.getDate()+6-t.getDay()}getAnalogousDateInTargetMonthsGrid(t,e){let i,a,s,h=new Date(t.getFullYear(),t.getMonth(),1).getDay(),r=Math.floor((h+t.getDate())/7),n=t.getDay();for(e.setDate(1),s=new Date(t.getFullYear(),t.getMonth(),0).getDate(),a=7*r+n+1-e.getDay(),a+=a<1?7:0;a>s;)a-=7;return i=new Date(e),i.setDate(a),i}getSelectedDateInThisMonth(t){if(""==this.value)return-1;{let e=new Date(this.value);return e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()?e.getDate():-1}}getTodayInThisMonth(t){let e=new Date;return e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()?e.getDate():-1}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(t){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(t)}getIconButtonLabel(){return""==this.value?"Choose date":`Change date, ${this.value}`}renderMonthTBody(t){let e=new Date(t.getFullYear(),t.getMonth(),1).getDay(),a=1==new Date(t.getFullYear(),1,29).getMonth(),s=0,h=[],r=this.getSelectedDateInThisMonth(t),n=this.getTodayInThisMonth(t);switch(t.getMonth()){case 3:case 5:case 8:case 10:s=30;break;case 1:s=a?29:28;break;default:s=31}for(let t=0,a=0,d=1;t<6;t++){let l=[];for(let t=0;t<7;t++,a++)if(a<e)l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}));else{if(a-e>=s)l.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}));else{let t="yeti-date-calendar-day",e=this.cursorDate.getDate()==d?0:-1;t+=n==d&&r!=d?" yeti-date-calendar-day-today":"",t+=r==d?" yeti-date-calendar-day-selected":"",l.push(i("td",{"data-date":d,class:t,tabindex:e,onClick:t=>{this.handleSelectDate(t)}},d))}d++}h.push(i("tr",{"data-week-of-month":t},l))}return h}componentWillLoad(){let t=this.el.getAttribute("id");t&&""!=t||(t=s.generateUniqueId(),this.el.setAttribute("id",t)),this.inputId=""!=this.inputId?this.inputId:`${t}_input`,this.inputName=this.inputId,this.pickerHeading=`${t}_pickerHeading`,this.watchInputValue()}componentDidRender(){if(this.isPickerVisible){let t=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]'),e=this.el.querySelector(".yeti-date-picker");t&&!this.keepFocusOnButton&&(t.scrollIntoView({behavior:"smooth",block:"nearest"}),t.focus()),this.keepFocusOnButton&&(this.keepFocusOnButton=!1),e.scrollIntoView({behavior:"smooth",block:"nearest"})}}render(){let t="yeti-input yeti-date-field";return""!=this.inputClass&&(t+=" "+this.inputClass),0==this.isValid&&(t+=" yeti-input__error"),i("div",{class:"yeti-date"},i("input",Object.assign({type:"text",class:t,id:this.inputId,name:this.inputName,value:this.value,onBlur:t=>this.handleFieldBlur(t),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy",autocomplete:"off"},""!=this.labelledBy?{"aria-labelledBy":this.labelledBy}:{},""!=this.describedBy?{"aria-describedby":this.describedBy}:{})),i("button",{class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:t=>{this.handleIconClick(t)}},i("span",{class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{class:"yeti-date-picker-header"},i("h2",{class:"yeti-date-picker-heading","aria-live":"polite",id:this.pickerHeading},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{class:"yeti-date-picker-actions"},i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:t=>{this.cursorDatePreviousYear(),t.preventDefault(),t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Previous year"),i("span",{class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:t=>{this.cursorDatePreviousMonth(),t.preventDefault(),t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Previous month"),i("span",{class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:t=>{this.cursorDateNextMonth(),t.preventDefault(),t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Next month"),i("span",{class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:t=>{this.cursorDateNextYear(),t.preventDefault(),t.stopPropagation()}},i("span",{class:"yeti-a11y-hidden"},"Next year"),i("span",{class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{class:"yeti-date-calendar",role:"grid","aria-labelledby":this.pickerHeading,onKeyDown:t=>{this.handleCalendarKeydown(t)}},i("thead",null,i("tr",null,i("th",{class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};export{h as yeti_date_picker}