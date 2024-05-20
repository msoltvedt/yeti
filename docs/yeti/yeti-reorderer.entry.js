import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiReorderer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.reorderCompleted = createEvent(this, "reorderCompleted", 7);
        this.wrapperClass = '';
        this.iLoveJSX = false;
    }
    handleReorderRequested(event) {
        let mover = this.el.querySelector(`#${event.detail.assignedId}`);
        let moverPosition = event.detail.position;
        let moverChild = mover.querySelector(".yeti-reorderee");
        let moverRect = moverChild.getBoundingClientRect();
        let isUp = event.detail.isUp;
        let swapeePosition = (isUp) ? moverPosition - 1 : moverPosition + 1;
        let swapee = this.el.querySelector(`[position='${swapeePosition}']`);
        let swapeeChild = swapee.querySelector(".yeti-reorderee");
        let swapeeRect = swapeeChild.getBoundingClientRect();
        let moverYDelta = (isUp) ? swapeeRect.y - moverRect.y : /* i.e. just move it up to where the swapee is */
            swapeeRect.height + (swapeeRect.y - moverRect.y - moverRect.height); // Move it down by height of swapee + distance between mover and swapee.
        let swapeeYDelta = (isUp) ? moverRect.height + (moverRect.y - swapeeRect.y - swapeeRect.height) : moverRect.y - swapeeRect.y;
        let that = this; // So we can reference the class object inside a proper function later on.
        if (event.detail.isDisabled) {
            // This is just to be safe; Reorderee should never emit a reorderRequested event on a disabled trigger.
            return;
        }
        // Move mover into swapee's place
        moverChild.addEventListener('transitionend', handleTransitionEnd);
        moverChild.style.setProperty('transition', 'transform 300ms');
        swapeeChild.style.setProperty('transition', 'transform 300ms');
        moverChild.style.setProperty('transform', `translateY(${moverYDelta}px)`);
        swapeeChild.style.setProperty('transform', `translateY(${swapeeYDelta}px)`);
        function handleTransitionEnd() {
            let placement = ((isUp) ? 'beforebegin' : 'afterend');
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
        return (h("ul", { key: '9033b818aead41a30b28a2825fa5f1ae150b4d2a', class: wrapperClass }, h("slot", { key: 'd093be5abfc70a6689332822cfddbb997f47e491' })));
    }
    get el() { return getElement(this); }
};

export { YetiReorderer as yeti_reorderer };

//# sourceMappingURL=yeti-reorderer.entry.js.map