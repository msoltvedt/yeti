import { Component, Prop, h, Element, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-loading',
  shadow: false,
})
export class YetiLoading {

  @Element() el: HTMLElement;

  /**
   * Whether to display the Loading pattern inline or default mode.
   */
  @Prop() isInline: boolean = false;

  /**
   * Whether to display the Loading pattern as a modal (covering its parent container) or as an inline-block object.
   */
  @Prop() isModal: boolean = false;

  /**
   * Tracks whether the Loader is displaying or not.
   */
  @Prop() isActive: boolean = false;
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
  shouldStealFocus = false;
  shouldReturnFocus = false;
  slottedContent = null;


  setBackgroundElementStyles(modalIsActivating: boolean) {
    if (modalIsActivating) {
        document.body.classList.add("yeti-modal-has_active_modal");
    } else {
        document.body.classList.remove("yeti-modal-has_active_modal");
    }
  }



  @Listen('keydown')
  focusTrap(e) {
    if (this.isActive) {
      e.preventDefault();
    }
  }


  componentWillLoad() {
    // Set up ids
    let componentId = this.el.getAttribute("id");

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }
    
    // Check to see if there's slotted content
    let innerHTML = this.el.innerHTML.trim();

    if (innerHTML != "" && innerHTML != "<!---->") {
      this.slottedContent = innerHTML;
    } else {
      this.slottedContent = null;
    }

  }



  render() {

    let modalOverlayCSS = "yeti-modal-overlay yeti-modal-overlay-light";

    let baseLoading =

      <div class="yeti-loading" tabindex="-1">

        <div class="yeti-loading-icon">
            <svg class="yeti-loading-icon-svg" viewBox="0 0 100 100" aria-hidden="true">
                <circle class="yeti-loading-icon-svg-circle" cx="50%" cy="50%" r="44"></circle>
            </svg>
        </div>

        <div class="yeti-loading-label">Loading...</div>

        {(this.slottedContent == null && this.slottedContent != "<!---->") ?
          
          ""

        :
        
          <div class="yeti-loading-content">
            
            <slot />
          
          </div>
        }

      </div>


    let inlineLoading = 
    
      <div class="yeti-loading_inline">
          
        <div class="yeti-loading_inline-icon">
            <svg class="yeti-loading_inline-icon-svg" viewBox="0 0 100 100">
                <circle class="yeti-loading_inline-icon-svg-background" cx="50%" cy="50%" r="44"></circle>
                <circle class="yeti-loading_inline-icon-svg-stroke" cx="50%" cy="50%" r="44"></circle>
            </svg>
        </div>

        <div class="yeti-loading_inline-label">Loading...</div>
      
      </div>;


    modalOverlayCSS += (this.isActive) ? "" : " yeti-modal-overlay__inert";

    return (
      (this.isModal) ?

        <div class={modalOverlayCSS}>
          <div class="yeti-modal yeti-modal-size-xs">
              {baseLoading}
          </div>
        </div>

      :

        (this.isInline) ? inlineLoading : baseLoading

    );
  }



  componentDidRender() {
    // Handle focus management. We can't do this when the property changes because the inactive state uses display: none,
    // which interferes with the ability to accept focus depending on some race conditions.

    if (this.shouldStealFocus) {
      // Becoming active, take focus
      let loadingDiv = this.el.getElementsByClassName("yeti-loading")[0] as HTMLElement;
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      loadingDiv.focus();
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

}
