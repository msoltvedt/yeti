import { Component, Host, Prop, Element, h } from '@stencil/core';
//import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-unsaved-changes',
  shadow: false,
})
export class YetiUnsavedChanges {

  @Element() el: HTMLElement;  

  /**
   * id of the form element we're watching
   */
  @Prop({ reflect: true }) formId: string = "";  

  /**
   * whether or not the form has changed since page load
   */
  @Prop({ 
    reflect: true,
    mutable: true 
  }) formHasChanges: boolean = false; 

  /**
   * whether or not the Unsaved Changes modal is currently open
   */
  @Prop({ 
    reflect: true,
    mutable: true 
  }) isOpen: boolean = false;
  
  private form;
  
  private ignoreClass = "yeti-unsaved_changes-ignore_changes";    // Changes to this form element are ignored by this component.
  private prompterClass = "yeti-unsaved_changes-prompter";        // Clicking this element should prompt the modal check.
  private nonprompterClass = "yeti-unsaved_changes-nonprompter";  // Clicking this element should *not* prompt the modal check.

  private clickedElementLeftHanging: EventTarget;

  private weGotThis = false; // By default, the browser will prompt the user about unsaved changes. We'll set this for the cases where we plan to handle it to make sure the user doesn't get prompted by both this component and the browser default.



  handleBeforeUnload = (e) => {
    // Asks user to confirm they want to abandon their changes to the form and leave/reload the page. This is a fallback for cases
    // where the user would lose data but we can't trigger the Unsaved Changes modal.

    if (!this.weGotThis) {

      // We're not handling this case, so the browser should.
      e.preventDefault();

    } else {

      // We've already handled this case, so tell the browser not to prompt.
      this.weGotThis = false;
      //window.removeEventListener("beforeunload", this.handleBeforeUnload, { capture: true }); // For performance in Firefox
      return undefined;

    }

  }



  handleExitClick = (ev) => {
    // User has clicked something that could take them off the page; prompt them if necessary.

    this.weGotThis = true; // We'll handle prompting the user if it's necessary.

    if (this.formHasChanges) {

      this.clickedElementLeftHanging = ev.currentTarget;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      this.isOpen = true;

    }
    
  }



  handleModalPrimaryClick = () => {
    let exit = this.clickedElementLeftHanging as HTMLElement;
    this.isOpen = false;
    exit.removeEventListener("click", this.handleExitClick, true); // Remove our prompt
    exit.click(); // Proceed as if we never interrupted them
  }



  handleModalSecondaryClick() {
    this.isOpen = false;
    this.weGotThis = false;
  }



  initializeLinkListeners() {
    let exits = document.querySelectorAll(`a:not( .${this.nonprompterClass} ), .${this.prompterClass}`);
    
    // exits is a list of all the HTMLElements that should prompt a modal check on click.
    exits.forEach((exit) => {
      exit.addEventListener("click", this.handleExitClick, true);
    });

  }



  initializeNonPrompters() {
    /* For elements we define as nonprompters (via adding the nonprompter class), we will:

      1. Not prompt the user ourselves via this component.
      2. Prevent the browser from prompting them. */

    let nonprompters = document.querySelectorAll( `.${this.nonprompterClass}` );

    nonprompters.forEach((nonprompter) => {
      nonprompter.addEventListener("click", () => {
        this.weGotThis = true; // In other words, tell the handleBeforeUnload function that we're handling this and the browser shouldn't prompt.
      });
    })
  }



  componentWillLoad() {

    // Confirm formId exists
    if (this.formId == "") {
      console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");
      return;
    }

    // Confirm formId points to an actual form
    this.form = document.getElementById( this.formId );
    if (this.form == "undefined" || !this.form.tagName || (this.form.tagName).toLowerCase() != "form") {
      console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");
      return;
    }

    // Add the browser default beforeunload handler
    window.addEventListener("beforeunload", this.handleBeforeUnload, { capture: true });

    // Tell the form to listen for changes
    (this.form as HTMLFormElement).addEventListener("input", (e) => {
      let target = (e.target as HTMLElement);
      if (target && target.classList && !target.classList.contains( this.ignoreClass )) {
        this.formHasChanges = true;
      }
    });

    // Tell any links on the page to open the modal on click
    this.initializeLinkListeners();

    // Handle nonprompters
    this.initializeNonPrompters();

  }


  render() {
    return (
      <Host>
        <yeti-modal heading="Unsaved Changes" id="modal1" described-by="modal1_description" isActive={this.isOpen} showClose={false}>

          <yeti-modal-content>
              <p id="modal1_description" class="yeti-margin-bottom-4">
                  You have unsaved changes that will be lost.
              </p>
              <p >Are you sure you want to leave the page?</p>
          </yeti-modal-content>

          <yeti-modal-buttons>
              <button class="yeti-button yeti-button-primary" id="unsavedChangesModalPrimaryButton" onClick={() => { this.handleModalPrimaryClick() }}>Yes, Discard Changes</button>
              <button class="yeti-button yeti-button-secondary" id="unsavedChangesModalSecondaryButton" onClick={() => { this.handleModalSecondaryClick() }}>No, Keep Editing</button>
          </yeti-modal-buttons>

        </yeti-modal>
      </Host>
    );
  }

}