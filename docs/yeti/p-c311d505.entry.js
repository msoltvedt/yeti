import{r as t,c as i,h as s,g as e}from"./p-f504dd71.js";import{u as h}from"./p-5c303e9a.js";const l=class{constructor(s){t(this,s),this.menuButtonChange=i(this,"menuButtonChange",7),this.justMadeASelection=!1,this.wrapperCSS="",this.buttonCSS="",this.menuCSS="",this.buttonId=h.generateUniqueId(),this.menuId=h.generateUniqueId(),this.tooltipText="Options",this.menuAlignment="",this.value="",this.labelledBy="",this.describedBy="",this.options=[],this.isTouched=!1,this.iLoveJSX=!1,this.isOpen=!1,this.cursorPosition=-1}handleValueChange(t,i){this.menuButtonChange.emit({newValue:t,oldValue:i})}handleDefocusingClick(){0==this.el.querySelectorAll(":focus").length&&this.isOpen&&this.closeMenu()}handleKeydown(t){switch(t.key.toString().toLowerCase()){case"tab":this.closeMenu();break;case"arrowdown":this.isOpen?this.cursorPosition=(this.cursorPosition+1)%this.options.length:(this.cursorPosition=0,this.openMenu()),t.preventDefault();break;case"arrowup":this.isOpen?this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length:(this.cursorPosition=this.options.length-1,this.openMenu()),t.preventDefault();break;case" ":this.isOpen||(this.cursorPosition=0,this.openMenu()),t.preventDefault();break;case"enter":this.isOpen?(this.value=this.options[this.cursorPosition].label,this.justMadeASelection=!0,this.closeMenu()):(this.openMenu(),this.cursorPosition=0,t.preventDefault());break;case"home":this.isOpen&&(this.cursorPosition=0),t.preventDefault();break;case"end":this.isOpen&&(this.cursorPosition=this.options.length-1),t.preventDefault()}}openMenu(){this.isOpen=!0}closeMenu(){this.isOpen=!1,this.cursorPosition=-1,this.isTouched=!0}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}parseOptionElements(t){for(let i=0;i<t.length;i++){let s=t.item(i);"yeti-menu-button-option"==s.tagName.toLowerCase()&&(s.hasAttribute("href")&&""!=s.getAttribute("href")?this.options.push({href:s.getAttribute("href"),label:s.innerHTML}):this.options.push({label:s.innerHTML}))}for(let i=t.length-1;i>=0;--i)t.item(i).remove()}renderMenuItems(){let t=[];for(let i=0;i<this.options.length;i++){let e,h,l=this.options[i];e=l.href?s("a",{href:l.href,class:"yeti-menu_button-menu-item-link",role:"menuitem",tabindex:"-1",key:i,"data-option-index":i,onClick:()=>{this.handleOptionClick(i)}},l.label):s("button",{class:"yeti-menu_button-menu-item-button",role:"menuitem",tabindex:"-1",key:i,"data-option-index":i,onClick:()=>{this.handleOptionClick(i)}},l.label),h=s("li",{class:"yeti-menu_button-menu-item",role:"presentation"},e),t.push(h)}return t}handleOptionClick(t){this.value=this.options[t].label,this.justMadeASelection=!0,this.closeMenu()}handleActualFocus(){let t=this.el.querySelector(".yeti-multiselect");t&&t.focus()}handleButtonClick(){this.isOpen=!this.isOpen}componentWillLoad(){let t=this.el.children;t.length>0&&this.parseOptionElements(t)}componentDidRender(){let t=this.el.querySelector('[data-option-index="'+this.cursorPosition+'"');if(t&&t.focus(),this.isOpen&&this.el.scrollIntoView({behavior:"smooth",block:"nearest"}),this.justMadeASelection){let t=this.el.querySelector(".yeti-menu_button-button");t&&(t.focus(),t.scrollIntoView({behavior:"smooth",block:"nearest"})),this.justMadeASelection=!1}}render(){let t="yeti-menu_button",i="yeti-menu_button-button",e="yeti-menu_button-menu";return this.menuAlignment.indexOf("right")>-1&&(t+=" yeti-menu_button-right_aligned"),this.isOpen&&(t+=" yeti-menu_button__open"),i+=this.buttonCSS&&""!=this.buttonCSS?" "+this.buttonCSS:"",e+=this.menuCSS&&""!=this.menuCSS?" "+this.menuCSS:"",[s("div",{class:t},s("yeti-tooltip",{text:this.tooltipText},s("button",{class:i,"aria-haspopup":"true","aria-expanded":"true","aria-controls":this.menuId,id:this.buttonId,onClick:()=>{this.handleButtonClick()}},s("span",{class:"material-icons","aria-hidden":"true"},"more_vert"),s("span",{class:"yeti-a11y-hidden"},"Options"))),s("ul",{class:e,role:"menu",id:this.menuId,"aria-labelledby":this.buttonId},this.renderMenuItems()))]}get el(){return e(this)}static get watchers(){return{value:["handleValueChange"]}}},a=class{constructor(s){t(this,s),this.readyToVerifySlow=i(this,"readyToVerifySlow",7),this.readyToVerifyFast=i(this,"readyToVerifyFast",7),this.cssClass="",this.htmlId=h.generateUniqueId(),this.actualId=h.generateUniqueId(),this.htmlName=this.htmlId,this.required=!1,this.isValid=void 0,this.value="",this.labelledBy="",this.describedBy="",this.placeholder="-Select-",this.showClear=!0,this.options=[],this.isTouched=!1,this.numSelections=0,this.iLoveJSX=!1,this.isOpen=!1,this.cursorPosition=-1}handleDefocusingClick(){0==this.el.querySelectorAll(":focus").length&&this.isOpen&&this.closeFlyout()}handleKeydown(t){switch(t.key.toString().toLowerCase()){case"tab":t.shiftKey?this.el.querySelectorAll(".yeti-multiselect:focus").length>0&&this.closeFlyout():0==this.el.querySelectorAll(".yeti-multiselect:focus").length&&this.closeFlyout();break;case"arrowdown":this.isOpen?(this.cursorPosition=(this.cursorPosition+1)%this.options.length,this.iLoveJSX=!this.iLoveJSX,t.preventDefault()):t.altKey&&(this.openFlyout(),t.preventDefault());break;case"arrowup":this.isOpen?(this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length,this.iLoveJSX=!this.iLoveJSX,t.preventDefault()):t.altKey&&(this.openFlyout(),t.preventDefault());break;case"escape":this.isOpen&&(this.closeFlyout(),t.preventDefault());break;case"enter":case" ":{t.preventDefault();let i=t.target;if(i.classList.contains("yeti-multiselect-puck")){i.click();break}this.cursorPosition>=0?this.handleOptionClick(this.cursorPosition):this.toggleFlyout();break}}}openFlyout(){this.isOpen=!0}closeFlyout(){this.isOpen=!1,this.cursorPosition=-1,this.isTouched=!0,this.readyToVerifySlow.emit()}toggleFlyout(){this.isOpen?this.closeFlyout():this.openFlyout()}handleFieldBlur(t){this.isTouched=!0,this.readyToVerifySlow.emit(t)}parseOptionElements(t){for(let i=0;i<t.length;i++){let s=t.item(i);"yeti-multiselect-option"==s.tagName.toLowerCase()&&(this.options.push({selected:s.hasAttribute("selected"),label:s.innerHTML}),s.hasAttribute("selected")&&++this.numSelections)}for(let i=t.length-1;i>=0;--i)t.item(i).remove()}getPlaceholderDisplay(){switch(this.numSelections){case 0:return this.placeholder;case 1:for(let t=0;t<this.options.length;t++)if(this.options[t].selected)return this.options[t].label;default:return`${this.numSelections} selections`}}renderActualOptions(){let t=[];for(let i=0;i<this.options.length;i++){let e=s("option",{value:this.options[i].label,selected:this.options[i].selected},this.options[i].label);t.push(e)}return t}handleOptionClick(t){let i=[];this.numSelections=this.options[t].selected?--this.numSelections:++this.numSelections,this.options[t].selected=!this.options[t].selected;for(let t=0;t<this.options.length;t++)this.options[t].selected&&i.push(this.options[t].label);this.value=i.toString(),this.iLoveJSX=!this.iLoveJSX,this.readyToVerifyFast.emit()}handleClearSelections(t){let i=this.el.querySelector(".yeti-multiselect");for(let t=0;t<this.options.length;t++)this.options[t].selected=!1;this.value="",this.numSelections=0,i.focus(),t.stopPropagation(),this.readyToVerifyFast.emit()}handleActualFocus(){let t=this.el.querySelector(".yeti-multiselect");t&&t.focus()}componentWillLoad(){let t=this.el.children;t.length>0&&this.parseOptionElements(t)}componentWillRender(){if(""==this.value){for(let t=0;t<this.options.length;t++)this.options[t].selected=!1;this.value="",this.numSelections=0}}componentDidRender(){this.isOpen&&this.el.querySelector(".yeti-multiselect-flyout").scrollIntoView({behavior:"smooth",block:"nearest"})}render(){let t="yeti-multiselect",i="yeti-multiselect-flyout";return""!=this.cssClass&&(t+=" "+this.cssClass),0==this.isValid&&(t+=" yeti-multiselect__error"),i+=this.isOpen?" yeti-multiselect-flyout__open":"",[s("div",{class:"yeti-multiselect-wrapper"},s("select",Object.assign({tabIndex:-1,class:"yeti-multiselect-actual yeti-a11y-hidden",multiple:!0,id:this.htmlId,name:this.htmlName,onFocus:()=>{this.handleActualFocus()}},this.isValid?{}:{"aria-invalid":!0},""!=this.labelledBy?{"aria-labelledby":this.labelledBy}:{},""!=this.describedBy?{"aria-describedby":this.describedBy}:{}),this.renderActualOptions()),s("div",{tabIndex:0,class:t,onClick:()=>{this.isOpen=!this.isOpen},onFocus:()=>{this.isTouched=!0},"aria-hidden":"true"},s("span",{class:"yeti-multiselect-placeholder",title:this.getPlaceholderDisplay()},this.getPlaceholderDisplay()),this.showClear&&this.numSelections>0?s("button",{class:"yeti-multiselect-puck",title:"Clear all selections",onClick:t=>{this.handleClearSelections(t),t.preventDefault()}},s("span",{class:"material-icons yeti-multiselect-puck-icon","aria-hidden":"true"},"cancel")):""),s("div",{class:i,"aria-hidden":"true"},s("ul",{class:"yeti-multiselect-options"},this.options.map(((t,i)=>s("li",{key:i},s("button",{class:this.cursorPosition==i?"yeti-multiselect-option yeti-multiselect-option__hover":"yeti-multiselect-option",tabIndex:-1,onClick:t=>{this.handleOptionClick(i),t.preventDefault()}},s("span",{class:"yeti-multiselect-option-checkbox"},s("span",{class:"material-icons"},t.selected?"check_box":"check_box_outline_blank")),s("span",{class:"yeti-multiselect-option-label"},t.label))))))))]}get el(){return e(this)}};export{l as yeti_menu_button,a as yeti_multiselect}