import { Component, Prop, h, State, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-reorderer',
  shadow: false,
})
export class YetiReorderer {

  @Element() el: HTMLElement;


  @Event() reorderCompleted: EventEmitter;


  /**
   * CSS class list that should apply to the top-most wrapper element.
   */
  @Prop() wrapperClass: string = '';

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;


  @Listen("reorderRequested")
  handleReorderRequested(event) {
    let mover = this.el.querySelector(`#${event.detail.assignedId}`);
    let moverPosition = event.detail.position;
    let moverChild = mover.querySelector(".yeti-reorderee") as HTMLElement;
    let moverRect = moverChild.getBoundingClientRect();
    let isUp = event.detail.isUp;
    let swapeePosition = (isUp) ? moverPosition - 1 : moverPosition + 1;
    let swapee = this.el.querySelector(`[position='${swapeePosition}']`);
    let swapeeChild = swapee.querySelector(".yeti-reorderee") as HTMLElement;
    let swapeeRect = swapeeChild.getBoundingClientRect();
    let yDelta = swapeeRect.y - moverRect.y;
    let that = this;

    if (event.detail.isDisabled) {
      // This is just to be safe; Reorderee should never emit a reorderRequested event on a disabled trigger.
      return;
    }
    
    // Move mover into swapee's place
    moverChild.addEventListener('transitionend', handleTransitionEnd);
    moverChild.style.setProperty('transition', 'transform 300ms');
    swapeeChild.style.setProperty('transition', 'transform 300ms');
    moverChild.style.setProperty('transform', `translateY(${yDelta}px)`);
    swapeeChild.style.setProperty('transform', `translateY(${-yDelta}px)`);

    function handleTransitionEnd() {
      let placement = ((isUp) ? 'beforebegin' : 'afterend') as InsertPosition;
      swapee.insertAdjacentElement(placement, mover);
      moverChild.style.removeProperty('transition');
      swapeeChild.style.removeProperty('transition');
      moverChild.style.removeProperty('transform');
      swapeeChild.style.removeProperty('transform');
      
      // Update positions
      mover.attributes["position"].value = swapeePosition;
      swapee.attributes["position"].value = moverPosition;

      // Detach listener
      moverChild.removeEventListener('transitionend', handleTransitionEnd);

      // Notify of completion
      that.reorderCompleted.emit();
    }

  } 



  componentWillLoad() {
    // Set up ids for this instance and its child yeti-reorderees. Set position and reorderees attributes for children.
    let reorderees = this.el.querySelectorAll("yeti-reorderee");
    let myId = (this.el.id) ? this.el.id : utils.generateUniqueId();

    if (typeof reorderees == 'undefined' || !reorderees.length || reorderees.length < 1) {
      console.warn("yeti-reorderer should contain at least one yeti-reorderee element.");
      return;
    }

    for (let i = 0; i < reorderees.length; i++) {
      reorderees[i].assignedId = reorderees[i].id = `${myId}_reorderee_${i}`;
      reorderees[i].position = i;
      reorderees[i].reorderees = reorderees.length;
    }

  }



  render() {

    let wrapperClass = "yeti-reorderer";

    if (this.wrapperClass != '') {
      wrapperClass += ` ${this.wrapperClass}`;
    }

    return (

        <ul class={wrapperClass}><slot /></ul>

    );
  }

}