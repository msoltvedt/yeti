import{r as t,c as i,h as e,g as s}from"./p-f2293e0f.js";import{u as h}from"./p-3eab3126.js";const l=class{constructor(e){t(this,e);this.menuButtonChange=i(this,"menuButtonChange",7);this.menuButtonSelectionMade=i(this,"menuButtonSelectionMade",7);this.justMadeASelection=false;this.hasCustomButtonContents=false;this.wrapperCSS="";this.buttonCSS="";this.menuCSS="";this.buttonId="";this.buttonType="";this.menuId="";this.tooltipText="Options";this.menuAlignment="";this.hasTooltip=true;this.value="";this.labelledBy="";this.describedBy="";this.options=[];this.isTouched=false;this.iLoveJSX=false;this.isOpen=false;this.cursorPosition=-1}handleValueChange(t,i){this.menuButtonChange.emit({newValue:t,oldValue:i})}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeMenu()}}handleKeydown(t){let i=t.key.toString().toLowerCase();switch(i){case"tab":{this.closeMenu();break}case"arrowdown":{if(this.isOpen){this.cursorPosition=(this.cursorPosition+1)%this.options.length}else{this.cursorPosition=0;this.openMenu()}t.preventDefault();break}case"arrowup":{if(this.isOpen){this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length}else{this.cursorPosition=this.options.length-1;this.openMenu()}t.preventDefault();break}case" ":{if(!this.isOpen){this.cursorPosition=0;this.openMenu()}t.preventDefault();break}case"enter":{if(!this.isOpen){this.openMenu();this.cursorPosition=0;t.preventDefault()}else{this.value=this.options[this.cursorPosition].label;this.justMadeASelection=true;this.closeMenu()}break}case"home":{if(this.isOpen){this.cursorPosition=0}t.preventDefault();break}case"end":{if(this.isOpen){this.cursorPosition=this.options.length-1}t.preventDefault();break}}}openMenu(){this.isOpen=true}closeMenu(){this.isOpen=false;this.cursorPosition=-1;this.isTouched=true}toggleMenu(){if(this.isOpen){this.closeMenu()}else{this.openMenu()}}parseChildTags(){let t=this.el.querySelectorAll("yeti-menu-button-option");let i=this.el.querySelector("yeti-menu-button-contents");this.options=t&&t.length&&t.length>0?[]:this.options;for(let i=0;i<t.length;i++){let e=t.item(i);if(e.tagName.toLowerCase()=="yeti-menu-button-option"){let t={label:"",id:"",href:"",value:"",hasHTML:false};let s=e.getAttribute("id");t.id=s&&s!=""?s:`${this.el.getAttribute("id")}_option${i}`;t.label=e.innerText.trim().replace(/\t/g,"");t.label=t.label.replace(/\n/g," ");if(e.hasAttribute("href")&&e.getAttribute("href")!=""){t.href=e.getAttribute("href")}if(e.childNodes.length!=1||e.firstChild.nodeType!=3){t.hasHTML=true;let i=document.createElement("div");i.setAttribute("slot",t.id);while(e.childNodes.length>0){i.appendChild(e.childNodes[0])}this.el.appendChild(i);t.innerHTML=e.innerHTML}this.options.push(t)}}if(i){this.hasCustomButtonContents=true;i.setAttribute("slot","buttonContents")}for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}unwrapButtonContents(){let t=this.el.querySelector("yeti-menu-button-contents");if(t){t.replaceWith(...Array.from(t.childNodes))}}renderMenuItems(){let t=[];for(let i=0;i<this.options.length;i++){let s=this.options[i];let h;let l;let n=`${s.id}`;if(s.href){h=e("a",{href:s.href,class:"yeti-menu_button-menu-item-link",role:"menuitem",tabindex:"-1","data-option-index":i,onClick:t=>{this.handleOptionClick(i,t,true)}},s.hasHTML?e("slot",{name:s.id}):s.label)}else{h=e("button",{class:"yeti-menu_button-menu-item-button",role:"menuitem",tabindex:"-1","data-option-index":i,onClick:t=>{this.handleOptionClick(i,t)}},s.hasHTML?e("slot",{name:s.id}):s.label)}l=e("li",{class:"yeti-menu_button-menu-item",role:"presentation",id:n,key:n},h);t.push(l)}return t}handleOptionClick(t,i,e=false){this.value=this.options[t].label;this.justMadeASelection=true;this.closeMenu();if(!e){i.preventDefault()}}handleActualFocus(){let t=this.el.querySelector(".yeti-multiselect");if(t){t.focus()}}handleButtonClick(t){this.isOpen=!this.isOpen;t.preventDefault()}renderButton(t){return e("button",Object.assign({class:t,"aria-haspopup":"true"},this.isOpen?{"aria-expanded":"true"}:{},{"aria-controls":this.menuId,id:this.buttonId,role:"button",onClick:t=>{this.handleButtonClick(t)}}),this.hasCustomButtonContents?e("slot",{name:"buttonContents"}):[e("span",{class:"material-icons","aria-hidden":"true"},"more_vert"),e("span",{class:"yeti-a11y-hidden"},"Options")])}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){this.el.setAttribute("id",h.generateUniqueId())}this.buttonId=this.buttonId!=""?this.buttonId:`${t}_button`;this.menuId=this.menuId!=""?this.menuId:`${t}_menu`}componentWillRender(){this.parseChildTags()}componentDidRender(){this.unwrapButtonContents();let t='[data-option-index="'+this.cursorPosition+'"';let i=this.el.querySelector(t);let e=this.el.querySelector(".yeti-menu_button-menu");if(i){i.focus()}if(this.isOpen){e.scrollIntoView({behavior:"smooth",block:"nearest"})}if(this.justMadeASelection){let t=this.el.querySelector(".yeti-menu_button-button");if(t){t.focus();t.scrollIntoView({behavior:"smooth",block:"nearest"})}this.menuButtonSelectionMade.emit({value:this.value});this.justMadeASelection=false}}render(){let t="yeti-menu_button";let i="yeti-menu_button-button";let s="yeti-menu_button-menu";let h=`${this.el.getAttribute("id")}_tooltip`;if(this.menuAlignment.indexOf("right")>-1){t+=" yeti-menu_button-right_aligned"}if(this.isOpen){t+=" yeti-menu_button__open"}if(this.buttonType&&this.buttonType!=""){i=`${i} yeti-menu_button-button-mimic ${i}-${this.buttonType}`}t+=this.wrapperCSS&&this.wrapperCSS!=""?" "+this.wrapperCSS:"";i+=this.buttonCSS&&this.buttonCSS!=""?" "+this.buttonCSS:"";s+=this.menuCSS&&this.menuCSS!=""?" "+this.menuCSS:"";return[e("div",{class:t},this.hasTooltip?e("yeti-tooltip",{text:this.tooltipText,id:h,slotId:this.buttonId,tipId:`${this.buttonId}_tooltip`},this.renderButton(i)):this.renderButton(i),e("ul",{class:s,role:"menu",id:this.menuId,"aria-labelledby":this.buttonId,key:this.menuId},this.renderMenuItems()))]}get el(){return s(this)}static get watchers(){return{value:["handleValueChange"]}}};const n=class{constructor(e){t(this,e);this.readyToVerifySlow=i(this,"readyToVerifySlow",7);this.readyToVerifyFast=i(this,"readyToVerifyFast",7);this.cssClass="";this.facadeId="";this.actualId="";this.actualName=this.actualId;this.required=false;this.menuAlignment="";this.isValid=undefined;this.value="";this.labelledBy="";this.describedBy="";this.placeholder="- Select -";this.showClear=true;this.options=[];this.isTouched=false;this.numSelections=0;this.iLoveJSX=false;this.isOpen=false;this.cursorPosition=-1}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeFlyout()}}handleKeydown(t){let i=t.key.toString().toLowerCase();switch(i){case"tab":{if(!t.shiftKey){if(this.el.querySelectorAll(".yeti-multiselect:focus").length==0){this.closeFlyout()}}else{if(this.el.querySelectorAll(".yeti-multiselect:focus").length>0){this.closeFlyout()}}break}case"arrowdown":{if(this.isOpen){this.cursorPosition=(this.cursorPosition+1)%this.options.length;t.preventDefault()}else if(t.altKey){this.openFlyout();t.preventDefault()}break}case"arrowup":{if(this.isOpen){this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length;t.preventDefault()}else if(t.altKey){this.openFlyout();t.preventDefault()}break}case"escape":{if(this.isOpen){this.closeFlyout();t.preventDefault()}break}case"enter":case" ":{t.preventDefault();let i=t.target;if(i.classList.contains("yeti-multiselect-puck")){i.click();break}else{if(this.cursorPosition>=0){this.handleOptionClick(this.cursorPosition)}else{this.toggleFlyout()}}break}}}openFlyout(){this.isOpen=true}closeFlyout(){this.isOpen=false;this.cursorPosition=-1;this.isTouched=true;this.readyToVerifySlow.emit()}toggleFlyout(){if(this.isOpen){this.closeFlyout()}else{this.openFlyout()}}handleFieldBlur(t){this.isTouched=true;this.readyToVerifySlow.emit(t)}parseOptionElements(t){for(let i=0;i<t.length;i++){let e=t.item(i);if(e.tagName.toLowerCase()=="yeti-multiselect-option"){let t;if(e.hasAttribute("id")){t=e.getAttribute("id")}else{t=`${this.el.getAttribute("id")}_option${i}`}this.options.push({selected:e.hasAttribute("selected"),label:e.innerHTML,id:t});if(e.hasAttribute("selected")){++this.numSelections}}}for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}getPlaceholderDisplay(){switch(this.numSelections){case 0:return this.placeholder;case 1:for(let t=0;t<this.options.length;t++){if(this.options[t].selected){return this.options[t].label}}default:return`${this.numSelections} selections`}}renderActualOptions(){let t=[];for(let i=0;i<this.options.length;i++){let s=e("option",{value:this.options[i].label,selected:this.options[i].selected},this.options[i].label);t.push(s)}return t}handleOptionClick(t){let i=[];this.numSelections=this.options[t].selected?--this.numSelections:++this.numSelections;this.options[t].selected=!this.options[t].selected;for(let t=0;t<this.options.length;t++){if(this.options[t].selected){i.push(this.options[t].label)}}this.value=i.toString();this.iLoveJSX=!this.iLoveJSX;this.readyToVerifyFast.emit()}handleClearSelections(t){let i=this.el.querySelector(".yeti-multiselect");for(let t=0;t<this.options.length;t++){this.options[t].selected=false}this.value="";this.numSelections=0;i.focus();t.stopPropagation();this.readyToVerifySlow.emit();this.readyToVerifyFast.emit()}handleActualFocus(){let t=this.el.querySelector(".yeti-multiselect");if(t){t.focus()}}componentWillLoad(){let t=this.el.children;let i=this.el.getAttribute("id");if(!i||i==""){i=h.generateUniqueId();this.el.setAttribute("id",i)}this.actualId=this.actualId!=""?this.actualId:`${i}_actual`;this.actualName=this.actualId;this.facadeId=this.facadeId!=""?this.facadeId:`${i}_facade`;if(this.el.hasAttribute("id")&&this.el.getAttribute("id")!=""){this.el.getAttribute("id")}else{this.el.setAttribute("id",h.generateUniqueId())}if(t.length>0){this.parseOptionElements(t)}}componentWillRender(){if(this.value==""){for(let t=0;t<this.options.length;t++){this.options[t].selected=false}this.value="";this.numSelections=0}}componentDidRender(){if(this.isOpen){let t=this.el.querySelector(".yeti-multiselect-flyout");let i=this.el.querySelector(".yeti-multiselect-option__hover");let e=i?i:t;e.scrollIntoView({behavior:"smooth",block:"nearest"})}}render(){let t="yeti-multiselect";let i="yeti-multiselect-flyout";if(this.cssClass!=""){t+=" "+this.cssClass}if(this.isValid==false){t+=" yeti-multiselect__error"}i+=this.isOpen?" yeti-multiselect-flyout__open":"";if(this.menuAlignment=="right"){i+=" yeti-multiselect-flyout-align-right"}return[e("div",{class:"yeti-multiselect-wrapper"},e("select",Object.assign({tabIndex:-1,class:"yeti-multiselect-actual yeti-a11y-hidden",multiple:true,id:this.actualId,name:this.actualName,onFocus:()=>{this.handleActualFocus()}},!this.isValid?{"aria-invalid":true}:{},this.labelledBy!=""?{"aria-labelledby":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{}),this.renderActualOptions()),e("div",{tabIndex:0,class:t,onClick:()=>{this.isOpen=!this.isOpen},onFocus:()=>{this.isTouched=true},"aria-hidden":"true"},e("span",{class:"yeti-multiselect-placeholder",title:this.getPlaceholderDisplay()},this.getPlaceholderDisplay()),this.showClear&&this.numSelections>0?e("button",{class:"yeti-multiselect-puck",title:"Clear all selections",onClick:t=>{this.handleClearSelections(t);t.preventDefault()}},e("span",{class:"material-icons yeti-multiselect-puck-icon","aria-hidden":"true"},"cancel")):""),e("div",{class:i,"aria-hidden":"true"},e("ul",{class:"yeti-multiselect-options",id:this.facadeId},this.options.map(((t,i)=>{let s=this.cursorPosition==i?"yeti-multiselect-option yeti-multiselect-option__hover":"yeti-multiselect-option";return e("li",{id:t.id,key:t.id},e("button",{class:s,tabIndex:-1,onClick:t=>{this.handleOptionClick(i);t.preventDefault()}},e("span",{class:"yeti-multiselect-option-checkbox"},e("span",{class:"material-icons"},t.selected?"check_box":"check_box_outline_blank")),e("span",{class:"yeti-multiselect-option-label"},t.label)))})))))]}get el(){return s(this)}};export{l as yeti_menu_button,n as yeti_multiselect};
//# sourceMappingURL=p-8620084f.entry.js.map