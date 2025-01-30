import{r as t,c as i,h as e,g as s}from"./p-39d3f65a.js";import{u as h}from"./p-943baa85.js";const o=class{constructor(e){t(this,e);this.readyToVerifySlow=i(this,"readyToVerifySlow",7);this.readyToVerifyFast=i(this,"readyToVerifyFast",7);this.searchId=h.generateUniqueId();this.didJustOpen=false;this.wrapperClass="";this.comboboxId="";this.flyoutId="";this.formName="";this.required=false;this.isMultiselect=false;this.menuAlignment="";this.isValid=true;this.value="";this.labelledBy="";this.describedBy="";this.placeholder="- Select -";this.showClear=true;this.isSearchable=false;this.searchString="";this.options=[];this.isTouched=false;this.numSelections=0;this.isOpen=false;this.cursorPosition=-1;this.iLoveJSX=false}handleOptionsChange(){let t=[];let i=false;let e=0;for(let s=0;s<this.options.length;s++){let h=this.options[s];h.id=h.id?h.id:`${this.el.getAttribute("id")}_option${s}`;h.value=h.value?h.value:h.label;if(!this.isMultiselect){if(h.selected){h.selected=!i}if(h.selected){i=true}}if(h.selected){++e;t.push(h.value)}}this.value=t.toString();this.numSelections=e}handleIsOpenChange(t){if(t){this.didJustOpen=true}}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeFlyout()}}handleKeyDown(t){let i=t.key.toString().toLowerCase();let e=this.el.querySelector(".yeti-dropdown");console.log("In handleKeyDown, key was",i,this.el);switch(i){case"tab":{setTimeout((()=>{if(!this.el.contains(document.activeElement)){this.closeFlyout()}}),1);break}case"arrowdown":{if(this.isOpen){if(e!=document.activeElement){e===null||e===void 0?void 0:e.focus()}this.cursorPosition=this.getNextVisibleCursorPosition();t.preventDefault()}else if(t.altKey){this.cursorPosition=0;this.openFlyout();t.preventDefault()}break}case"arrowup":{if(this.isOpen){if(e!=document.activeElement){e===null||e===void 0?void 0:e.focus()}this.cursorPosition=this.getPreviousVisibleCursorPosition();t.preventDefault()}else if(t.altKey){this.openFlyout();t.preventDefault()}break}case"escape":{if(this.isOpen){e===null||e===void 0?void 0:e.focus();this.closeFlyout();t.preventDefault()}break}case"enter":case" ":{let i=t.target;let s=t.key.toLowerCase();console.log("Enter or space, active element was",document.activeElement);console.log(`Key was ${s}.`);if(i.classList.contains("yeti-dropdown-puck")||i.classList.contains("yeti-input-clear")){i.click();break}else{if(e!=document.activeElement){console.log("Hit enter or space while in the search field.");if(s=="enter"){console.log("User hit enter while in a search field, swallowing the event.");t.preventDefault()}}else{t.preventDefault();if(this.cursorPosition>=0){this.handleOptionClick(this.cursorPosition)}else{this.toggleFlyout()}}}break}}}handleSearchInputClear(){this.el.querySelector(".yeti-dropdown-search").value="";this.resetAllOptionsVisibility();this.searchString=""}getNextVisibleCursorPosition(){let t=this.options.length;let i=(this.cursorPosition+t)%t;for(let e=(i+1)%t;e!=i;e=(e+1)%t){if(this.options[e].isVisible){return e}}return this.cursorPosition}getPreviousVisibleCursorPosition(){let t=this.options.length;let i=(this.cursorPosition+t)%t;for(let e=(i-1+t)%t;e!=i;e=(e-1+t)%t){if(this.options[e].isVisible){return e}}return this.cursorPosition}resetAllOptionsVisibility(){for(let t of this.options){t.isVisible=true}}openFlyout(){this.isOpen=true}closeFlyout(){this.isOpen=false;this.cursorPosition=-1;this.isTouched=true;this.searchString="";this.resetAllOptionsVisibility();this.readyToVerifySlow.emit()}toggleFlyout(){if(this.isOpen){this.closeFlyout()}else{this.openFlyout()}}handleFieldBlur(t){this.isTouched=true;this.readyToVerifySlow.emit(t)}parseOptionElements(t){let i=[];let e=false;for(let s=0;s<t.length;s++){let h=t.item(s);if(h.tagName.toLowerCase()=="yeti-dropdown-option"){let t;let o=false;let l="";if(h.hasAttribute("id")){t=h.getAttribute("id")}else{t=`${this.el.getAttribute("id")}_option${s}`}if(h.hasAttribute("value")){l=h.getAttribute("value")}else{l=h.textContent}if(this.isMultiselect){o=h.hasAttribute("selected")}else{o=h.hasAttribute("selected")&&!e;if(o){e=true}}this.options.push({selected:o,label:h.textContent,id:t,value:l,isVisible:true});if(o){++this.numSelections;i.push(l)}}}this.value=i.toString();for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}getPlaceholderDisplay(){switch(this.numSelections){case 0:return this.placeholder;case 1:for(let t=0;t<this.options.length;t++){if(this.options[t].selected){return this.options[t].label}}default:return`${this.numSelections} selections`}}handleOptionClick(t){let i=[];let e=this.options[t].selected?--this.numSelections:++this.numSelections;this.options[t].selected=!this.options[t].selected;for(let s=0;s<this.options.length;s++){if(this.isMultiselect){if(this.options[s].selected){i.push(this.options[s].value)}}else{if(t==s){this.value=this.options[t].value;e=this.options[s].selected?1:0;this.closeFlyout()}else{this.options[s].selected=false}}}if(this.isMultiselect){this.value=i.toString()}this.numSelections=e;this.readyToVerifyFast.emit()}handleClearSelections(t){let i=this.el.querySelector(".yeti-dropdown");for(let t=0;t<this.options.length;t++){this.options[t].selected=false}this.value="";this.numSelections=0;i.focus();t.stopPropagation();this.readyToVerifySlow.emit();this.readyToVerifyFast.emit()}handleSearchKeyUp(t){var i,e;let s=this.el.querySelector(".yeti-dropdown-search");let h=s.value;let o=t.key.toString().toLowerCase();console.log("In handleSearchKeyUp, key was",o,t.target);if(!this.isSearchable){return}if(o=="enter"){t.preventDefault();console.log("User hit enter in search field, preventing default and exiting handler.");return}for(let t of this.options){if((h===null||h===void 0?void 0:h.toLowerCase())!=""&&((e=(i=t.label)===null||i===void 0?void 0:i.toLowerCase())===null||e===void 0?void 0:e.indexOf(h.toLowerCase()))<0){t.isVisible=false}else{t.isVisible=true}}this.searchString=h}componentWillLoad(){let t=this.el.children;let i=this.el.getAttribute("id");if(!i||i==""){i=h.generateUniqueId();this.el.setAttribute("id",i)}this.comboboxId=this.comboboxId!=""?this.comboboxId:`${i}_combobox`;this.formName=this.formName!=""?this.formName:i;this.flyoutId=this.flyoutId!=""?this.flyoutId:`${i}_flyout`;if(t.length>0){this.parseOptionElements(t)}}componentDidRender(){var t;if(this.isOpen){let i=this.el.querySelector(".yeti-dropdown-flyout");let e=this.el.querySelector(".yeti-dropdown-option__hover");let s=e?e:i;if(this.isSearchable&&this.didJustOpen){(t=this.el.querySelector(".yeti-dropdown-search"))===null||t===void 0?void 0:t.focus();this.didJustOpen=false}s.scrollIntoView({behavior:"smooth",block:"nearest"})}}render(){let t="yeti-dropdown";let i="yeti-dropdown-flyout";if(this.wrapperClass!=""){t+=" "+this.wrapperClass}if(this.isValid==false){t+=" yeti-dropdown__error"}i+=this.isOpen?" yeti-dropdown-flyout__open":"";if(this.menuAlignment=="right"){i+=" yeti-dropdown-flyout-align-right"}return[e("div",{key:"91f37bcb32dc1ca2056b09d579b2e9d7b63974db",class:"yeti-dropdown-wrapper"},e("div",Object.assign({key:"8256f2087d1f4406b4d7b7e3bb3ec80d4d0adf11",tabIndex:0,class:t,onClick:()=>{this.isOpen=!this.isOpen},onFocus:()=>{this.isTouched=true},role:"combobox"},!this.isValid?{"aria-invalid":"true"}:{},this.labelledBy!=""?{"aria-labeledby":this.labelledBy}:{},this.describedBy!=""?{"aria-describedby":this.describedBy}:{},{"aria-controls":this.flyoutId,"aria-expanded":this.isOpen,"aria-haspopup":"listbox"},this.isOpen&&this.cursorPosition>=0?{"aria-activedescendant":this.options[this.cursorPosition].id}:{},{id:this.comboboxId},this.isSearchable?{"aria-description":"searchable"}:{}),e("span",{key:"1bbe6d8125529dc19e054fa6d14207a8f4c19d57",class:"yeti-dropdown-placeholder",title:this.getPlaceholderDisplay()},this.getPlaceholderDisplay(),this.numSelections>1?e("span",{class:"yeti-a11y-hidden"},this.value):""),this.showClear&&this.numSelections>0?e("button",{class:"yeti-dropdown-puck",title:"Clear all selections",onClick:t=>{this.handleClearSelections(t);t.preventDefault()}},e("span",{class:"yeti-a11y-hidden"},"Clear all selections"),e("span",{class:"material-icons yeti-dropdown-puck-icon","aria-hidden":"true"},"cancel")):""),e("div",{key:"3273fbf39ceb585b4608350fecc9661ceb80f30f",class:i},this.isSearchable?e("div",{class:"yeti-dropdown-search-wrapper"},e("input",Object.assign({type:"search",class:"yeti-dropdown-search",placeholder:"Type to search",onKeyUp:t=>{this.handleSearchKeyUp(t)},"aria-controls":this.flyoutId,autocomplete:"off",id:this.searchId,value:this.searchString},!this.isOpen?{tabindex:"-1"}:{}))):"",e("ul",Object.assign({key:"c5693c41ec64b10bb55c020caa73528f4d24b9c5",class:"yeti-dropdown-options",id:this.flyoutId,role:"listbox","aria-multiselectable":"true"},this.labelledBy!=""?{"aria-labeledby":this.labelledBy}:{},this.isOpen&&this.cursorPosition>=0?{"aria-activedescendant":this.options[this.cursorPosition].id}:{}),this.options.map(((t,i)=>{let s=this.cursorPosition==i?"yeti-dropdown-option yeti-dropdown-option__hover":"yeti-dropdown-option";return t.isVisible?e("li",{id:t.id,key:t.id,role:"option","aria-selected":`${t.selected}`},e("button",{class:s,tabIndex:-1,onClick:t=>{this.handleOptionClick(i);t.preventDefault()}},this.isMultiselect?e("span",{class:"yeti-dropdown-option-checkbox"},e("span",{class:"material-icons","aria-hidden":"true"},t.selected?"check_box":"check_box_outline_blank")):"",e("span",{class:"yeti-dropdown-option-label"},t.label),!this.isMultiselect&&t.selected?e("yeti-icon",{iconCode:"check","aria-hidden":"true",iconClass:"yeti-typo-size-4"}):"")):""})))))]}get el(){return s(this)}static get watchers(){return{options:["handleOptionsChange"],isOpen:["handleIsOpenChange"]}}};const l=class{constructor(e){t(this,e);this.menuButtonChange=i(this,"menuButtonChange",7);this.menuButtonSelectionMade=i(this,"menuButtonSelectionMade",7);this.justMadeASelection=false;this.hasCustomButtonContents=false;this.wrapperClass="";this.buttonClass="";this.menuClass="";this.buttonId="";this.buttonType="";this.menuId="";this.tooltipText="Options";this.menuAlignment="";this.hasTooltip=true;this.value="";this.labelledBy="";this.describedBy="";this.options=[];this.isTouched=false;this.iLoveJSX=false;this.isOpen=false;this.cursorPosition=-1}handleValueChange(t,i){this.menuButtonChange.emit({newValue:t,oldValue:i})}handleDefocusingClick(){if(this.el.querySelectorAll(":focus").length==0&&this.isOpen){this.closeMenu()}}handleKeydown(t){let i=t.key.toString().toLowerCase();switch(i){case"tab":{this.closeMenu();break}case"arrowdown":{if(this.isOpen){this.cursorPosition=(this.cursorPosition+1)%this.options.length}else{this.cursorPosition=0;this.openMenu()}t.preventDefault();break}case"arrowup":{if(this.isOpen){this.cursorPosition=(this.cursorPosition-1+this.options.length)%this.options.length}else{this.cursorPosition=this.options.length-1;this.openMenu()}t.preventDefault();break}case" ":{if(!this.isOpen){this.cursorPosition=0;this.openMenu()}t.preventDefault();break}case"enter":{if(!this.isOpen){this.openMenu();this.cursorPosition=0;t.preventDefault()}else{this.value=this.options[this.cursorPosition].label;this.justMadeASelection=true;this.closeMenu()}break}case"home":{if(this.isOpen){this.cursorPosition=0}t.preventDefault();break}case"end":{if(this.isOpen){this.cursorPosition=this.options.length-1}t.preventDefault();break}}}openMenu(){this.isOpen=true}closeMenu(){this.isOpen=false;this.cursorPosition=-1;this.isTouched=true}toggleMenu(){if(this.isOpen){this.closeMenu()}else{this.openMenu()}}parseChildTags(){let t=this.el.querySelectorAll("yeti-menu-button-option");let i=this.el.querySelector("yeti-menu-button-contents");this.options=t&&t.length&&t.length>0?[]:this.options;for(let i=0;i<t.length;i++){let e=t.item(i);if(e.tagName.toLowerCase()=="yeti-menu-button-option"){let t={label:"",id:"",href:"",value:"",hasHTML:false};let s=e.getAttribute("id");t.id=s&&s!=""?s:`${this.el.getAttribute("id")}_option${i}`;t.label=e.innerText.trim().replace(/\t/g,"");t.label=t.label.replace(/\n/g," ");if(e.hasAttribute("href")&&e.getAttribute("href")!=""){t.href=e.getAttribute("href");if(e.hasAttribute("target")&&e.getAttribute("target")!=""){t.target=e.getAttribute("target")}if(e.hasAttribute("download-as")&&e.getAttribute("download-as")!=""){t.downloadAs=e.getAttribute("download-as")}}if(e.childNodes.length!=1||e.firstChild.nodeType!=3){t.hasHTML=true;let i=document.createElement("div");i.setAttribute("slot",t.id);while(e.childNodes.length>0){i.appendChild(e.childNodes[0])}this.el.appendChild(i);t.innerHTML=e.innerHTML}this.options.push(t)}}if(i){this.hasCustomButtonContents=true;i.setAttribute("slot","buttonContents")}for(let i=t.length-1;i>=0;--i){t.item(i).remove()}}unwrapButtonContents(){let t=this.el.querySelector("yeti-menu-button-contents");if(t){t.replaceWith(...Array.from(t.childNodes))}}renderMenuItems(){let t=[];for(let i=0;i<this.options.length;i++){let s=this.options[i];let h;let o;let l=`${s.id}`;if(s.href){h=e("a",Object.assign({href:s.href},s.target!=""&&!s.downloadAs?{target:s.target}:{},s.downloadAs&&s.downloadAs!=""?{download:s.downloadAs}:{},{class:"yeti-menu_button-menu-item-link",role:"menuitem",tabindex:"-1","data-option-index":i,onClick:t=>{this.handleOptionClick(i,t,true)}}),s.hasHTML?e("slot",{name:s.id}):s.label)}else{h=e("button",{class:"yeti-menu_button-menu-item-button",role:"menuitem",type:"button",tabindex:"-1","data-option-index":i,onClick:t=>{this.handleOptionClick(i,t)}},s.hasHTML?e("slot",{name:s.id}):s.label)}o=e("li",{class:"yeti-menu_button-menu-item",role:"presentation",id:l,key:l},h);t.push(o)}return t}handleOptionClick(t,i,e=false){this.value=this.options[t].label;this.justMadeASelection=true;this.closeMenu();if(!e){i.preventDefault()}}handleActualFocus(){let t=this.el.querySelector(".yeti-multiselect");if(t){t.focus()}}handleButtonClick(t){this.isOpen=!this.isOpen;t.preventDefault()}renderButton(t){return e("button",Object.assign({class:t,type:"button","aria-haspopup":"true"},this.isOpen?{"aria-expanded":"true"}:{},{"aria-controls":this.menuId,id:this.buttonId,role:"button",onClick:t=>{this.handleButtonClick(t)}}),this.hasCustomButtonContents?e("slot",{name:"buttonContents"}):[e("span",{class:"material-icons","aria-hidden":"true"},"more_vert"),e("span",{class:"yeti-a11y-hidden"},"Options")])}componentWillLoad(){let t=this.el.getAttribute("id");if(!t||t==""){this.el.setAttribute("id",h.generateUniqueId())}this.buttonId=this.buttonId!=""?this.buttonId:`${t}_button`;this.menuId=this.menuId!=""?this.menuId:`${t}_menu`}componentWillRender(){this.parseChildTags()}componentDidRender(){this.unwrapButtonContents();let t='[data-option-index="'+this.cursorPosition+'"';let i=this.el.querySelector(t);let e=this.el.querySelector(".yeti-menu_button-menu");if(i){i.focus()}if(this.isOpen){e.scrollIntoView({behavior:"smooth",block:"nearest"})}if(this.justMadeASelection){let t=this.el.querySelector(".yeti-menu_button-button");if(t){t.focus();t.scrollIntoView({behavior:"smooth",block:"nearest"})}this.menuButtonSelectionMade.emit({value:this.value});this.justMadeASelection=false}}render(){let t="yeti-menu_button";let i="yeti-menu_button-button";let s="yeti-menu_button-menu";let h=`${this.el.getAttribute("id")}_tooltip`;if(this.menuAlignment.indexOf("right")>-1){t+=" yeti-menu_button-right_aligned"}if(this.isOpen){t+=" yeti-menu_button__open"}if(this.buttonType&&this.buttonType!=""){i=`${i} yeti-menu_button-button-mimic ${i}-${this.buttonType}`}t+=this.wrapperClass&&this.wrapperClass!=""?" "+this.wrapperClass:"";i+=this.buttonClass&&this.buttonClass!=""?" "+this.buttonClass:"";s+=this.menuClass&&this.menuClass!=""?" "+this.menuClass:"";return[e("div",{key:"38c4df63452c9f037b79592d581121db07341f9f",class:t},this.hasTooltip?e("yeti-tooltip",{text:this.tooltipText,id:h,slotId:this.buttonId,tipId:`${this.buttonId}_tooltip`},this.renderButton(i)):this.renderButton(i),e("ul",{class:s,role:"menu",id:this.menuId,"aria-labelledby":this.buttonId,key:this.menuId},this.renderMenuItems()))]}get el(){return s(this)}static get watchers(){return{value:["handleValueChange"]}}};export{o as yeti_dropdown,l as yeti_menu_button};
//# sourceMappingURL=p-45c0883d.entry.js.map