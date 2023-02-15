import{r as t,c as e,h as i,g as a}from"./p-028ac5ad.js";import{u as s}from"./p-5c303e9a.js";const h=class{constructor(i){t(this,i),this.readyToVerifySlow=e(this,"readyToVerifySlow",7),this.keepFocusOnButton=!1,this.inputClass="",this.inputId=s.generateUniqueId(),this.inputName=this.inputId,this.required=!1,this.isValid=void 0,this.value="",this.describedBy="",this.isTouched=!1,this.cursorDate=new Date,this.iLoveJSX=!1,this.isPickerVisible=!1}watchInputValue(){null==this.value.match(/(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g)?this.isValid=!1:(this.isValid=""!=this.value||!this.required||!this.isTouched,this.cursorDate=""==this.value?new Date:new Date(this.value)),this.isTouched&&this.readyToVerifySlow.emit()}clickHandler(t){t.target.classList.contains("yeti-input")&&(this.isPickerVisible=!1),t.stopPropagation()}handleDefocusingClick(){this.isPickerVisible=!1,this.isTouched=!0,this.watchInputValue()}listenForTabOut(t){"Tab"==t.key&&t.target.classList.contains("yeti-date-calendar-day")&&!t.shiftKey?(this.isPickerVisible=!1,this.isTouched=!0,this.watchInputValue()):"Tab"==t.key&&t.target.classList.contains("yeti-date-picker-action-button-first")&&t.shiftKey?(this.isPickerVisible=!1,this.isTouched=!0):"Tab"==t.key&&t.target.classList.contains("yeti-date-button")&&!this.isPickerVisible&&(this.isTouched=!0,this.watchInputValue())}handleFieldBlur(t){let e=t.target.value.replaceAll("-","/");this.isTouched=!0,this.value=e}handleIconClick(){this.isPickerVisible=!this.isPickerVisible}handleSelectDate(t){let e=parseInt(t.target.attributes.getNamedItem("data-date").value),i=this.cursorDate,a=this.el.querySelector(".yeti-date-button");i.setDate(e),this.value=this.convertDateToInputValueString(i),this.isPickerVisible=!1,a&&a.focus()}handleCalendarKeydown(t){switch(t.key){case"ArrowLeft":this.cursorDate.setDate(this.cursorDate.getDate()-1),this.iLoveJSX=!this.iLoveJSX;break;case"ArrowRight":this.cursorDate.setDate(this.cursorDate.getDate()+1),this.iLoveJSX=!this.iLoveJSX;break;case"ArrowUp":this.cursorDate.setDate(this.cursorDate.getDate()-7),this.iLoveJSX=!this.iLoveJSX;break;case"ArrowDown":this.cursorDate.setDate(this.cursorDate.getDate()+7),this.iLoveJSX=!this.iLoveJSX;break;case"Escape":{let t=this.el.querySelector(".yeti-date-button");this.isPickerVisible=!1,t&&t.focus();break}case"Tab":break;case" ":case"Enter":this.handleSelectDate(t)}}getSelectedDateInThisMonth(t){if(""==this.value)return-1;{let e=new Date(this.value);return e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()?e.getDate():-1}}getTodayInThisMonth(t){let e=new Date;return e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()?e.getDate():-1}cursorDatePreviousYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()-1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}cursorDateNextYear(){this.cursorDate.setFullYear(this.cursorDate.getFullYear()+1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}cursorDatePreviousMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()-1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}cursorDateNextMonth(){this.cursorDate.setMonth(this.cursorDate.getMonth()+1),this.keepFocusOnButton=!0,this.iLoveJSX=!this.iLoveJSX}convertDateToInputValueString(t){return new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(t)}getIconButtonLabel(){return""==this.value?"Choose date":`Change date, ${this.value}`}renderMonthTBody(t){let e=new Date(t.getFullYear(),t.getMonth(),1).getDay(),a=1==new Date(t.getFullYear(),1,29).getMonth(),s=0,h=[],r=this.getSelectedDateInThisMonth(t),n=this.getTodayInThisMonth(t);switch(t.getMonth()){case 3:case 5:case 8:case 10:s=30;break;case 1:s=a?29:28;break;default:s=31}for(let t=0,a=0,d=1;t<6;t++){let c=[];for(let t=0;t<7;t++,a++)if(a<e)c.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}));else{if(a-e>=s)c.push(i("td",{class:"yeti-date-calendar-day yeti-date-calendar-day-not_this_month",tabindex:"-1"}));else{let t="yeti-date-calendar-day",e=this.cursorDate.getDate()==d?0:-1;t+=n==d&&r!=d?" yeti-date-calendar-day-today":"",t+=r==d?" yeti-date-calendar-day-selected":"",c.push(i("td",{"data-date":d,class:t,tabindex:e,onClick:t=>{this.handleSelectDate(t)}},d))}d++}h.push(i("tr",{"data-week-of-month":t},c))}return h}componentWillLoad(){this.watchInputValue()}componentDidRender(){if(this.isPickerVisible){let t=this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');t&&!this.keepFocusOnButton&&t.focus(),this.keepFocusOnButton&&(this.keepFocusOnButton=!1)}}render(){let t="yeti-input yeti-date-field";return""!=this.inputClass&&(t+=" "+this.inputClass),0==this.isValid&&(t+=" yeti-input__error"),i("div",{class:"yeti-date"},i("input",Object.assign({type:"text",class:t,id:this.inputId,name:this.inputName,value:this.value,onBlur:t=>this.handleFieldBlur(t),"aria-invalid":!this.isValid,placeholder:"mm/dd/yyyy"},""!=this.describedBy?{"aria-describedby":this.describedBy}:{})),i("button",{class:"yeti-date-button","aria-label":this.getIconButtonLabel(),onClick:()=>{this.handleIconClick()}},i("span",{class:"material-icons yeti-date-button-icon","aria-hidden":"true"},"calendar_today")),i("div",{class:this.isPickerVisible?"yeti-date-picker yeti-date-picker__visible":"yeti-date-picker"},i("div",{class:"yeti-date-picker-header"},i("h2",{class:"yeti-date-picker-heading","aria-live":"polite",id:"heading"},s.getMonthName(this.cursorDate)," ",this.cursorDate.getFullYear()),i("ul",{class:"yeti-date-picker-actions"},i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button yeti-date-picker-action-button-first",onClick:()=>{this.cursorDatePreviousYear()}},i("span",{class:"yeti-a11y-hidden"},"Previous year"),i("span",{class:"material-icons","aria-hidden":"true",title:"Previous year"},"keyboard_double_arrow_left"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:()=>{this.cursorDatePreviousMonth()}},i("span",{class:"yeti-a11y-hidden"},"Previous month"),i("span",{class:"material-icons","aria-hidden":"true",title:"Previous month"},"keyboard_arrow_left"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:()=>{this.cursorDateNextMonth()}},i("span",{class:"yeti-a11y-hidden"},"Next month"),i("span",{class:"material-icons","aria-hidden":"true",title:"Next month"},"keyboard_arrow_right"))),i("li",{class:"yeti-date-picker-action"},i("button",{class:"yeti-date-picker-action-button",onClick:()=>{this.cursorDateNextYear()}},i("span",{class:"yeti-a11y-hidden"},"Next year"),i("span",{class:"material-icons","aria-hidden":"true",title:"Next year"},"keyboard_double_arrow_right"))))),i("table",{class:"yeti-date-calendar",role:"grid","aria-labelledby":"heading",onKeyUp:t=>{this.handleCalendarKeydown(t)}},i("thead",null,i("tr",null,i("th",{class:"yeti-date-calendar-heading",abbr:"Sunday"},"Su"),i("th",{class:"yeti-date-calendar-heading",abbr:"Monday"},"Mo"),i("th",{class:"yeti-date-calendar-heading",abbr:"Tuesday"},"Tu"),i("th",{class:"yeti-date-calendar-heading",abbr:"Wednesday"},"We"),i("th",{class:"yeti-date-calendar-heading",abbr:"Thursday"},"Th"),i("th",{class:"yeti-date-calendar-heading",abbr:"Friday"},"Fr"),i("th",{class:"yeti-date-calendar-heading",abbr:"Saturday"},"Sa"))),this.renderMonthTBody(this.cursorDate))))}get el(){return a(this)}static get watchers(){return{value:["watchInputValue"]}}};export{h as yeti_date_picker}