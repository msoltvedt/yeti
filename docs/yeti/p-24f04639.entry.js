import{r as e,h as t,a as i,g as s}from"./p-e8f90371.js";const a=class{constructor(t){e(this,t);this.ignoreClass="yeti-unsaved_changes-ignore_changes";this.prompterClass="yeti-unsaved_changes-prompter";this.nonprompterClass="yeti-unsaved_changes-nonprompter";this.weGotThis=false;this.handleBeforeUnload=e=>{if(!this.weGotThis){e.preventDefault()}else{this.weGotThis=false;return undefined}};this.handleExitClick=e=>{this.weGotThis=true;if(this.formHasChanges){this.clickedElementLeftHanging=e.currentTarget;e.preventDefault();e.stopImmediatePropagation();this.isOpen=true}};this.handleModalPrimaryClick=()=>{let e=this.clickedElementLeftHanging;this.isOpen=false;e.removeEventListener("click",this.handleExitClick,true);e.click()};this.formId="";this.formHasChanges=false;this.isOpen=false}handleModalSecondaryClick(){this.isOpen=false;this.weGotThis=false}initializeLinkListeners(){let e=document.querySelectorAll(`a:not( .${this.nonprompterClass} ), .${this.prompterClass}`);e.forEach((e=>{e.addEventListener("click",this.handleExitClick,true)}))}initializeNonPrompters(){let e=document.querySelectorAll(`.${this.nonprompterClass}`);e.forEach((e=>{e.addEventListener("click",(()=>{this.weGotThis=true}))}))}componentWillLoad(){if(this.formId==""){console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");return}this.form=document.getElementById(this.formId);if(this.form=="undefined"||!this.form.tagName||this.form.tagName.toLowerCase()!="form"){console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");return}window.addEventListener("beforeunload",this.handleBeforeUnload,{capture:true});this.form.addEventListener("input",(e=>{let t=e.target;if(t&&t.classList&&!t.classList.contains(this.ignoreClass)){this.formHasChanges=true}}));this.initializeLinkListeners();this.initializeNonPrompters()}render(){return t(i,{key:"946ae58626973d2fffb88f2c06cf0a390d325dbe"},t("yeti-modal",{key:"60d9172c1658fa5caa56cd32ffc419ba5fcee5d7",heading:"Unsaved Changes",id:"modal1","described-by":"modal1_description",isActive:this.isOpen,showClose:false},t("yeti-modal-content",{key:"0998f7b5afecc39dc66f9966dc6767d00b3fe3d9"},t("p",{key:"8393dbdba1f56b852de36d4593c0885221e4ea7a",id:"modal1_description",class:"yeti-margin-bottom-4"},"You have unsaved changes that will be lost."),t("p",{key:"5a762c54c71d315f65a90ee4082c66f7d797f1c2"},"Are you sure you want to leave the page?")),t("yeti-modal-buttons",{key:"0ebdfe5d0bccc40e5f5bf052e5b4475dc5d09c43"},t("button",{key:"4fe7f6fd1c85785972d9a1e7eb438ebbb645ca4f",class:"yeti-button yeti-button-primary",id:"unsavedChangesModalPrimaryButton",onClick:()=>{this.handleModalPrimaryClick()}},"Yes, Discard Changes"),t("button",{key:"9e12fd4d1135601811dd01cd5298461fd3a552f1",class:"yeti-button yeti-button-secondary",id:"unsavedChangesModalSecondaryButton",onClick:()=>{this.handleModalSecondaryClick()}},"No, Keep Editing"))))}get el(){return s(this)}};export{a as yeti_unsaved_changes};
//# sourceMappingURL=p-24f04639.entry.js.map