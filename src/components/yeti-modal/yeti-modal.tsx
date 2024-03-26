import { Component, Prop, State, h, Element, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-modal',
  shadow: false,
})
export class YetiModal {

  @Element() el: HTMLElement;

  /**
   * Whether or not it's the special Side Sheet variant of Modal.
   */
  @Prop() isSideSheet: boolean = false;

  /**
   * The string that will display in the modal's heading and serve as its title.
   */
  @Prop() heading: string = "Modal Heading";

  /**
   * The optional id of an element that describes the modal's content.
   */
  @Prop() describedBy: string = "";

  /**
   * The optional size of the modal (other than the default). Options are xl, l, s, xs.
   */
  @Prop() size: string = "";

  /**
   * Optional CSS classes to add to the modal element.
   */
  @Prop() modalClass: string = "";

  /**
   * Whether overflowing contents are shown via scrolling or clipped.
   */
  @Prop() isScrollable: boolean = true;

  /**
   * Tracks whether the Modal is displaying or not.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isActive: boolean = false;
  @Watch('isActive')
  handleFocus(newValue: boolean) {
    // When the Modal becomes active it should take focus away from whatever had it before, but
    // we want to keep track of what that was so we can return focus if Modal becomes inactive.

    // First, normal Modals have only two states: active and inactive (i.e. they don't use the isOpening and isClosing states)
    if (!this.isSideSheet) {
      // Becoming active, take focus
      if (newValue) {
        this.shouldStealFocus = true;
        this.setBackgroundElementStyles(true);
      }

      // Becoming inactive, return focus
      else {
        this.shouldReturnFocus = true;
        this.setBackgroundElementStyles(false);
      }

    // Side Sheet modals have four states: inactive, opening, active, and closing.
    } else {

      // It's a side sheet modal

      if (newValue) {
        // Side sheet modal becoming active
        this.setBackgroundElementStyles(true);
        this.isAnimating = true;
      }

      else {
        this.isAnimating = true;
      }
    }


  }

  /**
   * Choose to show the close icon (currently an X) or not
   */
  @Prop() showClose: boolean = true;

  @State() isAnimating: boolean = false;

  @State() isOpening: boolean = false;

  @State() isClosing: boolean = false;


  previouslyFocusedElement: HTMLElement = null; // So we can return focus to wherever the user was when the Loading component appeared.
  bodyInnerWrapper: HTMLElement = null; // A div wrapped around everything in the body except the modal. Used to prevent background scrolling.
  shouldStealFocus = false;
  shouldReturnFocus = false;
  hasOpened = false;
  headingId = utils.generateUniqueId();
  


  setBackgroundElementStyles(modalIsActivating: boolean) {
    if (modalIsActivating) {
        document.body.classList.add("yeti-modal-has_active_modal");
    } else {
        document.body.classList.remove("yeti-modal-has_active_modal");
    }
  }



  @Listen('keydown', { target: 'window'})
  focusTrap(e) {

    if (this.isActive && e.keyCode == 27 && this.showClose) { // Escape button
        this.isActive = false;    
    }

  }



  @Listen('transitionend')
  handleTransitionEnd(e) {

    if (!e.propertyName || e.propertyName != "transform") {
      return;
    }

    if (this.isOpening) {

      // Becoming active, take focus
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      this.handleInitialFocus();
      this.isOpening = false;
      this.hasOpened = true;

    } else if (this.isClosing) {

      this.setBackgroundElementStyles(false);
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
      }
      this.isClosing = false;

    }

    this.isAnimating = false;

  }



  handleInitialFocus() {
    // Sets focus on the correct thing within the modal's content when it first opens. If nothing is focusable, uses the content area itself.
    let contentArea = this.el.querySelector('.yeti-modal-content') as HTMLElement;
    let firstFocusableContentItem = utils.aria.focusFirstDescendant(contentArea); // either false or an HTMLElement

    if (!firstFocusableContentItem) {
        // There is nothing focusable within the content of the modal, so make the content area itself focusable.
        contentArea.setAttribute("tabIndex", "-1");
        contentArea.focus();
    }
  }



  componentWillLoad() {
    // Set up ids and handle slotted content
    let componentId = this.el.getAttribute("id");
    let content = this.el.querySelector("yeti-modal-content");
    let buttons = this.el.querySelector("yeti-modal-buttons");
    let headerAction = this.el.querySelector("yeti-modal-header-action");

    if (!content) {
        console.error("Yeti Modal components must have a yeti-modal-content element.");
    } else {
        content.setAttribute("slot", "content");
    }

    if (!buttons) {
        console.error("Yeti Modal components must have a yeti-modal-buttons element.");
    } else {
        buttons.setAttribute("slot", "buttons");
    }

    if (headerAction) {
      headerAction.setAttribute("slot", "header_action");
    }

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }

    if (this.isActive) {
      this.setBackgroundElementStyles(true);
    }

  }


  render() {

    let modalOverlayCSS = (this.isSideSheet) ? "yeti-modal_ss-overlay" : "yeti-modal-overlay";
    let modalCSS = `yeti-modal${(this.isSideSheet) ? " yeti-modal_ss" : ""}`;
    let modalProperties = {
        "role": "dialog",
        "aria-modal": "true",
        "aria-labelledby": this.headingId
    };

    if (this.describedBy != "") {
        modalProperties["aria-describedby"] = this.describedBy;
    }

    modalOverlayCSS += (this.isActive || this.isAnimating) ? "" : " yeti-modal-overlay__inert";

    modalOverlayCSS += (this.isOpening) ? " yeti-modal__opening" : "";
    modalOverlayCSS += (this.hasOpened) ? " yeti-modal__open" : "";
    modalOverlayCSS += (this.isClosing) ? " yeti-modal__closing" : "";

    modalCSS += (this.size == "") ? "" : ` yeti-modal-size-${this.size}`;

    modalCSS += (this.modalClass != "") ? ` ${this.modalClass}` : "";

    modalCSS += (this.isScrollable) ? "" : " yeti-modal__unscrollable";

    return (
        <div class={modalOverlayCSS}>
            
            <div class="yeti-modal-bumper-front" tabIndex={0}></div>


            <div class={modalCSS} {...modalProperties}>
        
                <div class="yeti-modal-header">
                    <h1 class="yeti-modal-header-heading" id={this.headingId}>{this.heading}</h1>

                    <div class="yeti-modal-header-action">
                      <slot name="header_action" />
                    </div>

                    {(this.showClose) ?

                      <button class="yeti-modal-header-close yeti-button-ghost" onClick={() => { this.isActive = false }}>
                      <span class="material-icons">close</span>
                      </button>

                    :

                      null

                    }
                    
                </div>

        
                <div class="yeti-modal-content">

                    <slot name="content" />
        
                    <div class="yeti-modal-content-fade"></div>
        
                </div>

        
                <div class="yeti-modal-actions">

                    <div class="yeti-modal-actions-buttons">
                    
                        <slot name="buttons" />
                    
                    </div>
                
                </div>
        
            </div>


            <div class="yeti-modal-bumper-back" tabIndex={0}></div>

        </div>

    );
  }



  componentDidRender() {
    // Handle focus management. We can't do this when the property changes because the inactive state uses display: none,
    // which interferes with the ability to accept focus depending on some race conditions.

    // For regular modals...
    if (this.shouldStealFocus) {
      // Becoming active, take focus
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      this.handleInitialFocus();
    }

    if (this.shouldReturnFocus) {
      // Becoming inactive, return focus
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
      }
    }

    
    // For side sheet modals
    if (this.isAnimating) {
      // It's a side sheet modal, and it's opening. Add the opening class to the overlay to initiate the CSS transition.
      if (this.isActive) {
        setTimeout(() => {
          this.isOpening = true;
          this.isClosing = false;
        }, 1);
      } else {
        setTimeout(() => {
          this.isOpening = false;
          this.hasOpened = false;
          this.isClosing = true;
        }, 1);
      }
      
    }

    this.shouldStealFocus = false;
    this.shouldReturnFocus = false;
  }



  componentDidLoad() {
    let frontBumper = this.el.querySelector(".yeti-modal-bumper-front");
    let backBumper  = this.el.querySelector(".yeti-modal-bumper-back");

    frontBumper.addEventListener("focus", () => {
        utils.aria.focusLastDescendant(this.el.querySelector(".yeti-modal"));
    });

    backBumper.addEventListener("focus", () => {
        utils.aria.focusFirstDescendant(this.el.querySelector(".yeti-modal"));
    });
  }

}