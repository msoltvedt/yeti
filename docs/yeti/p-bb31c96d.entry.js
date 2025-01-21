import{r as e,h as t,a as i,g as s}from"./p-39d3f65a.js";const a=class{constructor(t){e(this,t);this.ignoreClass="yeti-unsaved_changes-ignore_changes";this.prompterClass="yeti-unsaved_changes-prompter";this.nonprompterClass="yeti-unsaved_changes-nonprompter";this.weGotThis=false;this.handleBeforeUnload=e=>{if(!this.isEnabled){return}if(!this.weGotThis){e.preventDefault()}else{this.weGotThis=false;return undefined}};this.handleExitClick=e=>{this.weGotThis=true;if(this.formHasChanges){this.clickedElementLeftHanging=e.currentTarget;e.preventDefault();e.stopImmediatePropagation();this.isOpen=true}};this.handleModalPrimaryClick=()=>{let e=this.clickedElementLeftHanging;this.isOpen=false;e.removeEventListener("click",this.handleExitClick,true);e.click()};this.isEnabled=true;this.formId="";this.formHasChanges=false;this.isOpen=false}handleModalSecondaryClick(){this.isOpen=false;this.weGotThis=false}initializeLinkListeners(){let e=document.querySelectorAll(`a:not( .${this.nonprompterClass} ), .${this.prompterClass}`);e.forEach((e=>{e.addEventListener("click",this.handleExitClick,true)}))}initializeNonPrompters(){let e=document.querySelectorAll(`.${this.nonprompterClass}`);e.forEach((e=>{e.addEventListener("click",(()=>{this.weGotThis=true}))}))}componentWillLoad(){if(this.formId==""){console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");return}this.form=document.getElementById(this.formId);if(this.form=="undefined"||!this.form.tagName||this.form.tagName.toLowerCase()!="form"){console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");return}window.addEventListener("beforeunload",this.handleBeforeUnload,{capture:true});this.form.addEventListener("input",(e=>{let t=e.target;if(t&&t.classList&&!t.classList.contains(this.ignoreClass)){this.formHasChanges=true}}));this.initializeLinkListeners();this.initializeNonPrompters()}render(){return t(i,{key:"362583e1992cfff1585e2c6ae10e6ff4e529e2bf"},t("yeti-modal",{key:"509b2cae5a8afe3eed3a27d11a21ca8de15e7667",heading:"Unsaved Changes",id:"modal1","described-by":"modal1_description",isActive:this.isOpen,showClose:false},t("yeti-modal-content",{key:"796b8e9c416fd757cca5d4078393dff18f158976"},t("p",{key:"5281e4612657aa955a553740b7d953dfa3d18928",id:"modal1_description",class:"yeti-margin-bottom-4"},"You have unsaved changes that will be lost."),t("p",{key:"4d5b245974b4251b56f49c1d87f2c4e7ff1d22a8"},"Are you sure you want to leave the page?")),t("yeti-modal-buttons",{key:"44654cff18757312251bf94863af62ed9fce680f"},t("button",{key:"800f863ff16d356b3cc86b19bc69be453c21874f",class:"yeti-button yeti-button-primary",id:"unsavedChangesModalPrimaryButton",onClick:()=>{this.handleModalPrimaryClick()}},"Yes, Discard Changes"),t("button",{key:"de285da404e2e94b4eb203be21cf3c10a3fe63c8",class:"yeti-button yeti-button-secondary",id:"unsavedChangesModalSecondaryButton",onClick:()=>{this.handleModalSecondaryClick()}},"No, Keep Editing"))))}get el(){return s(this)}};export{a as yeti_unsaved_changes};
//# sourceMappingURL=p-bb31c96d.entry.js.map