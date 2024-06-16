import { r as registerInstance, h, e as Host, g as getElement } from './index-e3c92518.js';

const YetiUnsavedChanges = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ignoreClass = "yeti-unsaved_changes-ignore_changes"; // Changes to this form element are ignored by this component.
        this.prompterClass = "yeti-unsaved_changes-prompter"; // Clicking this element should prompt the modal check.
        this.nonprompterClass = "yeti-unsaved_changes-nonprompter"; // Clicking this element should *not* prompt the modal check.
        this.weGotThis = false; // By default, the browser will prompt the user about unsaved changes. We'll set this for the cases where we plan to handle it to make sure the user doesn't get prompted by both this component and the browser default.
        this.handleBeforeUnload = (e) => {
            // Asks user to confirm they want to abandon their changes to the form and leave/reload the page. This is a fallback for cases
            // where the user would lose data but we can't trigger the Unsaved Changes modal.
            if (!this.weGotThis) {
                // We're not handling this case, so the browser should.
                e.preventDefault();
            }
            else {
                // We've already handled this case, so tell the browser not to prompt.
                this.weGotThis = false;
                //window.removeEventListener("beforeunload", this.handleBeforeUnload, { capture: true }); // For performance in Firefox
                return undefined;
            }
        };
        this.handleExitClick = (ev) => {
            // User has clicked something that could take them off the page; prompt them if necessary.
            this.weGotThis = true; // We'll handle prompting the user if it's necessary.
            if (this.formHasChanges) {
                this.clickedElementLeftHanging = ev.currentTarget;
                ev.preventDefault();
                ev.stopImmediatePropagation();
                this.isOpen = true;
            }
        };
        this.handleModalPrimaryClick = () => {
            let exit = this.clickedElementLeftHanging;
            this.isOpen = false;
            exit.removeEventListener("click", this.handleExitClick, true); // Remove our prompt
            exit.click(); // Proceed as if we never interrupted them
        };
        this.formId = "";
        this.formHasChanges = false;
        this.isOpen = false;
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
        let nonprompters = document.querySelectorAll(`.${this.nonprompterClass}`);
        nonprompters.forEach((nonprompter) => {
            nonprompter.addEventListener("click", () => {
                this.weGotThis = true; // In other words, tell the handleBeforeUnload function that we're handling this and the browser shouldn't prompt.
            });
        });
    }
    componentWillLoad() {
        // Confirm formId exists
        if (this.formId == "") {
            console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");
            return;
        }
        // Confirm formId points to an actual form
        this.form = document.getElementById(this.formId);
        if (this.form == "undefined" || !this.form.tagName || (this.form.tagName).toLowerCase() != "form") {
            console.error("Error in Yeti Unsaved Changes component: the form-id attribute must be the id of a valid form element.");
            return;
        }
        // Add the browser default beforeunload handler
        window.addEventListener("beforeunload", this.handleBeforeUnload, { capture: true });
        // Tell the form to listen for changes
        this.form.addEventListener("input", (e) => {
            let target = e.target;
            if (target && target.classList && !target.classList.contains(this.ignoreClass)) {
                this.formHasChanges = true;
            }
        });
        // Tell any links on the page to open the modal on click
        this.initializeLinkListeners();
        // Handle nonprompters
        this.initializeNonPrompters();
    }
    render() {
        return (h(Host, { key: '9dd1c23a5178d77dcbf0b8731ab75c160b9bb3a6' }, h("yeti-modal", { key: '9aa083308aad6aaa62d2d8911a0fe7f8942f82a7', heading: "Unsaved Changes", id: "modal1", "described-by": "modal1_description", isActive: this.isOpen, showClose: false }, h("yeti-modal-content", { key: 'd7379374cefd070c5b90e89d7266f0bf674512a9' }, h("p", { key: '01bb66211954246072e78953557c9bea6a1ed4b1', id: "modal1_description", class: "yeti-margin-bottom-4" }, "You have unsaved changes that will be lost."), h("p", { key: '1cd7ebef7b1633e67cd3cd0cb646d9a4a4064e8d' }, "Are you sure you want to leave the page?")), h("yeti-modal-buttons", { key: '84e2d817dcc052d4b9e473c7ec1d394f3ed2e25b' }, h("button", { key: '7c52ff0cf581ded736b248eb1f1942586cba7367', class: "yeti-button yeti-button-primary", id: "unsavedChangesModalPrimaryButton", onClick: () => { this.handleModalPrimaryClick(); } }, "Yes, Discard Changes"), h("button", { key: '53265e4f44cf468e528e4d92f072eada6aecce8d', class: "yeti-button yeti-button-secondary", id: "unsavedChangesModalSecondaryButton", onClick: () => { this.handleModalSecondaryClick(); } }, "No, Keep Editing")))));
    }
    get el() { return getElement(this); }
};

export { YetiUnsavedChanges as yeti_unsaved_changes };

//# sourceMappingURL=yeti-unsaved-changes.entry.js.map