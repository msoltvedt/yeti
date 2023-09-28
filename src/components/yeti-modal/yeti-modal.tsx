import { Component, Prop, h, Element, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-modal',
  shadow: false,
})
export class YetiModal {

  @Element() el: HTMLElement;

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
  @Prop({ attribute: 'modal-css'}) modalCSS: string = "";

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
    // When the Loading becomes active it should take focus away from whatever had it before, but
    // we want to keep track of what that was so we can return focus if Loading becomes inactive.

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
  }


  previouslyFocusedElement: HTMLElement = null; // So we can return focus to wherever the user was when the Loading component appeared.
  bodyInnerWrapper: HTMLElement = null; // A div wrapped around everything in the body except the modal. Used to prevent background scrolling.
  shouldStealFocus = false;
  shouldReturnFocus = false;
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

    if (this.isActive && e.keyCode == 27) { // Escape button
        this.isActive = false;    
    }

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

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }

  }


  render() {

    let modalOverlayCSS = "yeti-modal-overlay";
    let modalCSS = "yeti-modal";
    let modalProperties = {
        "role": "dialog",
        "aria-modal": "true",
        "aria-labelledby": this.headingId
    };

    if (this.describedBy != "") {
        modalProperties["aria-describedby"] = this.describedBy;
    }

    modalOverlayCSS += (this.isActive) ? "" : " yeti-modal-overlay__inert";

    modalCSS += (this.size == "") ? "" : ` yeti-modal-size-${this.size}`;

    modalCSS += (this.modalCSS != "") ? ` ${this.modalCSS}` : "";

    modalCSS += (this.isScrollable) ? "" : " yeti-modal__unscrollable";

    return (
        <div class={modalOverlayCSS}>
            
            <div class="yeti-modal-bumper-front" tabIndex={0}></div>


            <div class={modalCSS} {...modalProperties}>
        
                <div class="yeti-modal-header">
                    <h1 class="yeti-modal-header-heading" id={this.headingId}>{this.heading}</h1>
                    <button class="yeti-modal-header-close yeti-button-ghost" onClick={() => { this.isActive = false }}>
                    <span class="material-icons">close</span>
                    </button>
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

    if (this.shouldStealFocus) {
      // Becoming active, take focus
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      //utils.aria.focusFirstDescendant(this.el);
      this.handleInitialFocus();
    }

    if (this.shouldReturnFocus) {
      // Becoming inactive, return focus
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
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