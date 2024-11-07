import { r as registerInstance, h, g as getElement } from './index-93794b9c.js';
import { u as utils } from './utils-800d05b7.js';

const YetiPageContents = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * An array of objects containing the heading names and ids.
     */
    this.headings = []; // Will be set in componentWillLoad;
    this.isExpanded = true;
    this.wrapperId = "";
    this.ignoreWithin = "";
  }
  componentWillLoad() {
    let elId = this.el.id;
    let elsParent;
    let elsGrandparent;
    let headingElements;
    let pageWrapper = document.createElement("div");
    pageWrapper.classList.add("yeti-page_contents-wrapper");
    // Hide this whole component from screen-readers (since they have a better version built in)
    this.el.setAttribute("aria-hidden", "true");
    // Set up ids
    if (!elId) {
      elId = utils.generateUniqueId();
      this.wrapperId = `${elId}_wrapper`;
    }
    // Set up page structure:
    // - Wrap el's parent in a new div with class .yeti-page_contents-wrapper
    // - Move the parent into that div
    // - Make el a sibling of parent
    elsParent = this.el.parentElement;
    elsGrandparent = elsParent.parentElement;
    if (!elsParent || !elsGrandparent) {
      console.warn("yeti-page-contents requires containing parent and grandparent elements.");
      return;
    }
    elsParent.classList.add("yeti-page_contents-wrappee");
    elsGrandparent.insertBefore(pageWrapper, elsParent);
    pageWrapper.appendChild(elsParent);
    pageWrapper.appendChild(this.el);
    // Build the list of headings
    if (this.ignoreWithin != '') {
      headingElements = elsParent.querySelectorAll(`:is(h1, h2, h3, h4, h5, h6):not(.${this.ignoreWithin} :is(h1, h2, h3, h4, h5, h6))`); // All h1, h2, h3, h4, h5, h6 elements that are not children of a parent with the ignore class
    }
    else {
      headingElements = elsParent.querySelectorAll("h1, h2, h3, h4, h5, h6");
    }
    for (let i = 0; i < headingElements.length; i++) {
      let heading = headingElements[i]; // Actual heading HTMLElement
      let newHeading = {
        label: "",
        id: "",
        level: 1
      };
      heading.id = (heading.id && heading.id != '') ? heading.id : utils.generateUniqueId(); // If the id doesn't have an id then give it one.
      newHeading.label = heading.innerText;
      newHeading.id = heading.id;
      newHeading.level = parseInt((heading.nodeName).substring(1)); // Get the "n" in Hn (e.g. 2 in H2)
      this.headings.push(newHeading);
    }
  }
  render() {
    let wrapperCSS = "yeti-page_contents";
    if (!this.isExpanded) {
      wrapperCSS += " yeti-page_contents__collapsed";
    }
    return (h("div", { class: wrapperCSS, id: this.wrapperId }, (!this.isExpanded) ?
      h("button", { class: "yeti-page_contents-minmax", title: 'Expand page contents', onClick: (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.isExpanded = true;
        } }, h("yeti-icon", { iconCode: 'toc' }))
      :
        "", h("ul", { class: "yeti-page_contents-headings" }, this.headings.map((heading, index) => {
      let css = `yeti-page_contents-heading yeti-page_contents-heading-level-${heading.level}`;
      let href = `#${heading.id}`;
      let myId = `${heading.id}_entry`;
      let label = heading.label;
      let minimize = {};
      if (index == 0) {
        // Render the minimize icon for the first one.
        css += ' yeti-page_contents-heading-title';
        minimize = h("button", { class: "yeti-page_contents-minmax", title: 'Minimize', onClick: (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.isExpanded = false;
          } }, h("yeti-icon", { iconCode: 'minimize' }));
      }
      return h("li", { class: css, id: myId, key: myId }, h("a", { href: href, onClick: (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          document.getElementById(heading.id).scrollIntoView({ behavior: "smooth", inline: "start" });
        } }, label, (index == 0) ? minimize : ''));
    }), h("li", { class: 'yeti-page_contents-heading-actions' }, h("a", { href: '', title: "Back to top", onClick: (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.body.scrollIntoView({ behavior: "smooth", inline: "start" });
      }, class: 'yeti-page_contents-heading-action' }, h("yeti-icon", { iconCode: 'vertical_align_top' })), h("a", { href: '', title: "Collapse all code blocks", onClick: (e) => {
        let demoes = document.getElementsByClassName("ydoc-code_sample");
        e.preventDefault();
        e.stopImmediatePropagation();
        for (let i = 0; i < demoes.length; i++) {
          demoes[i].classList.remove("ydoc-demo__code_expanded");
        }
      }, class: 'yeti-page_contents-heading-action' }, h("yeti-icon", { iconCode: 'unfold_less_double' })), h("a", { href: '', title: "Expand all code blocks", onClick: (e) => {
        let demoes = document.getElementsByClassName("ydoc-code_sample");
        e.preventDefault();
        e.stopImmediatePropagation();
        for (let i = 0; i < demoes.length; i++) {
          demoes[i].classList.add("ydoc-demo__code_expanded");
        }
      }, class: 'yeti-page_contents-heading-action' }, h("yeti-icon", { iconCode: 'unfold_more_double' }))))));
  }
  componentDidLoad() {
    // Set up the Intersection Observer stuff (so we can style the list item whose heading is in view)
    let headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let observer;
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };
    observer = new IntersectionObserver(handleIntersect, options);
    headings.forEach(heading => {
      observer.observe(heading);
    });
    function handleIntersect(entries) {
      entries.forEach((entry) => {
        let myCorrespondingEntry = document.querySelector(`#${entry.target.id}_entry`);
        //let allCorrespondingEntries = document.querySelectorAll(".yeti-page_contents-heading");
        if (entry.isIntersecting && entry.target.nodeName != "H1") {
          // allCorrespondingEntries.forEach( oneOfAllEntries => {
          //   oneOfAllEntries.classList.remove("yeti-page_contents-heading__visible");
          // });
          if (myCorrespondingEntry && myCorrespondingEntry.classList) {
            myCorrespondingEntry.classList.add("yeti-page_contents-heading__visible");
          }
        }
        else {
          if (myCorrespondingEntry && myCorrespondingEntry.classList) {
            myCorrespondingEntry.classList.remove("yeti-page_contents-heading__visible");
          }
        }
      });
    }
  }
  get el() { return getElement(this); }
};

export { YetiPageContents as yeti_page_contents };

//# sourceMappingURL=yeti-page-contents.entry.js.map