import{r as e,h as t,a as i,g as s}from"./p-0d1be970.js";const a=class{constructor(t){e(this,t);this.ignoreClass="yeti-unsaved_changes-ignore_changes";this.prompterClass="yeti-unsaved_changes-prompter";this.nonprompterClass="yeti-unsaved_changes-nonprompter";this.weGotThis=false;this.handleBeforeUnload=e=>{if(!this.isEnabled){return}if(!this.weGotThis){e.preventDefault()}else{this.weGotThis=false;return undefined}};this.handleExitClick=e=>{this.weGotThis=true;if(this.formHasChanges){this.clickedElementLeftHanging=e.currentTarget;e.preventDefault();e.stopImmediatePropagation();this.isOpen=true}};this.handleModalPrimaryClick=()=>{let e=this.clickedElementLeftHanging;this.isOpen=false;e.removeEventListener("click",this.handleExitClick,true);e.click()};this.isEnabled=true;this.formId="";this.formHasChanges=false;this.isOpen=false}handleModalSecondaryClick(){this.isOpen=false;this.weGotThis=false}initializeLinkListeners(){let e=document.querySelectorAll(`a:not( .${this.nonprompterClass} ), .${this.prompterClass}`);e.forEach((e=>{e.addEventListener("click",this.handleExitClick,true)}))}initializeNonPrompters(){let e=document.querySelectorAll(`.${this.nonprompterClass}`);e.forEach((e=>{e.addEventListener("click",(()=>{this.weGotThis=true}))}))}componentWillLoad(){if(this.formId==""){console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");return}this.form=document.getElementById(this.formId);if(this.form=="undefined"||!this.form.tagName||this.form.tagName.toLowerCase()!="form"){console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");return}window.addEventListener("beforeunload",this.handleBeforeUnload,{capture:true});this.form.addEventListener("input",(e=>{let t=e.target;if(t&&t.classList&&!t.classList.contains(this.ignoreClass)){this.formHasChanges=true}}));this.initializeLinkListeners();this.initializeNonPrompters()}render(){return t(i,{key:"993b16fbc54c2cdbcca89eca80c5f438ee99a326"},t("yeti-modal",{key:"2ad645ffc69a49dcacc5de49760144c372b3a7a3",heading:"Unsaved Changes",id:"modal1","described-by":"modal1_description",isActive:this.isOpen,showClose:false},t("yeti-modal-content",{key:"2de6822b42943cfe530e53f28fb08b457c44bb41"},t("p",{key:"1188e71c04e587e01ae4ad17d877b3a5d7740067",id:"modal1_description",class:"yeti-margin-bottom-4"},"You have unsaved changes that will be lost."),t("p",{key:"55769f67015e1c39305393097998f32bab6190eb"},"Are you sure you want to leave the page?")),t("yeti-modal-buttons",{key:"3911b68ac6902a0c87e3fd5944cab4767f18234d"},t("button",{key:"ea65173796580675bbd417c186798f3872b4ac42",class:"yeti-button yeti-button-primary",id:"unsavedChangesModalPrimaryButton",onClick:()=>{this.handleModalPrimaryClick()}},"Yes, Discard Changes"),t("button",{key:"4f49147e4ee6aac67b2e528e5349a88768355b09",class:"yeti-button yeti-button-secondary",id:"unsavedChangesModalSecondaryButton",onClick:()=>{this.handleModalSecondaryClick()}},"No, Keep Editing"))))}get el(){return s(this)}};export{a as yeti_unsaved_changes};
//# sourceMappingURL=p-1f8d5703.entry.js.map