import { Component, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'yeti-reorderee',
  shadow: false,
})
export class YetiReorderee {

  @Element() el: HTMLElement;


  @Event() reorderRequested: EventEmitter;


  /**
   * Id assigned by parent Yeti Reorderer component.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) assignedId: string = '';

  /**
   * Position (of sibling yeti-reorderee elements) assigned by parent Yeti Reorderer component.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) position: number = -1;

  /**
   * Total number of yeti-reorderee siblings, including this one (assigned by parent Yeti Reorderer component)
   */
  @Prop({
    mutable: true,
    reflect: true
  }) reorderees: number = -1;

  /**
   * CSS class list that should apply to the HTML element wrapping the slotted content.
   */
  @Prop() wrapperClass?: string = '';

  /**
   * Id of the HTML element that should move this reorderee up the order when clicked.
   */
  @Prop() upTrigger: string = '';

  /**
   * Id of the HTML element that should move this reorderee up the order when clicked.
   */
  @Prop() downTrigger: string = '';

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;

  handleUpTrigger(ev) {
    this.reorderRequested.emit({
      "assignedId": this.assignedId,
      "position": this.position,
      "isUp": true,
      "isDisabled": (this.position == 0)
    });

    ev.stopImmediatePropagation();
    ev.preventDefault();
  }

  handleDownTrigger(ev) {
    this.reorderRequested.emit({
      "assignedId": this.assignedId,
      "position": this.position,
      "isUp": false,
      "isDisabled": ((this.position+1) >= this.reorderees)
    });

    ev.stopImmediatePropagation();
    ev.preventDefault();
  }


  render() {

    let wrapperClass = "yeti-reorderee";

    if (this.wrapperClass != '') {
      wrapperClass += ` ${this.wrapperClass}`;
    }

    return (

        <li class={wrapperClass}><slot /></li>

    );
  }



  componentDidRender() {
    // Set disabled state for edge case triggers
    let upTrigger = this.el.querySelector(`#${this.upTrigger}`);
    let downTrigger = this.el.querySelector(`#${this.downTrigger}`);

    if (upTrigger) {

      if (this.position == 0) {
        upTrigger.setAttribute("disabled", "");
        upTrigger.classList.add("yeti-reorderee__disabled");
      } else {
        upTrigger.removeAttribute("disabled");
        upTrigger.classList.remove("yeti-reorderee__disabled");
      }
      
    }
    

    if (downTrigger) {

      if ((this.position+1) >= this.reorderees) {
        downTrigger.setAttribute("disabled", "");
        downTrigger.classList.add("yeti-reorderee__disabled");
      } else {
        downTrigger.removeAttribute("disabled");
        downTrigger.classList.remove("yeti-reorderee__disabled");
      }
      
    }

  }



  componentDidLoad() {
    // Register click handlers on up and down triggers
    let upTrigger = this.el.querySelector(`#${this.upTrigger}`);
    let downTrigger = this.el.querySelector(`#${this.downTrigger}`);
    
    if (upTrigger) {
      upTrigger.addEventListener("click", (ev) => { this.handleUpTrigger(ev) });
    }
    
    if (downTrigger) {
      downTrigger.addEventListener("click", (ev) => { this.handleDownTrigger(ev) });
    }
  }

}