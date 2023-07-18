import { Component, Prop, h, Element, Watch, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-loading',
  shadow: false,
})
export class YetiLoading {

  @Element() el: HTMLElement;

  @Prop() isModal: boolean = false;

  @Prop() isActive: boolean = false;
  @Watch('isActive')
  handleFocus(newValue: boolean) {
    // When the Loading becomes active it should take focus away from whatever had it before, but
    // we want to keep track of what that was so we can return focus if Loading becomes inactive.

    // Becoming active, take focus
    if (newValue) {
      this.shouldStealFocus = true;
    }

    // Becoming inactive, return focus
    else {
      this.shouldReturnFocus = true;
    }
  }


  previouslyFocusedElement: HTMLElement = null;
  shouldStealFocus = false;
  shouldReturnFocus = false;



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
      </div>

    modalOverlayCSS += (this.isActive) ? "" : " yeti-modal-overlay__inert";

    return (
      (this.isModal) ?

        <div class={modalOverlayCSS}>
          <div class="yeti-modal">
              {baseLoading}
          </div>
        </div>

      :

        baseLoading

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