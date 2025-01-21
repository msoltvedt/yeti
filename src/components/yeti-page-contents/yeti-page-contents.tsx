import { Component, Prop, h, Element } from '@stencil/core';
import { utils, YetiPageContentsHeader } from '../../utils/utils';

@Component({
  tag: 'yeti-page-contents',
  shadow: false,
})
export class YetiPageContents {

  @Element() el: HTMLElement;

  /**
   * Whether to show the Page Contents menu in expanded or closed state.
   */
  @Prop() isExpanded: boolean = true;


  /**
   * Whether to show the Page Contents menu in expanded or closed state.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) wrapperId: string = ""; // Will be set in componentWillLoad;


  /**
   * Headings within a parent of the given class will be ignored.
   */
  @Prop() ignoreWithin: string = "";


  /**
   * An array of objects containing the heading names and ids.
   */
  headings: YetiPageContentsHeader[] = []; // Will be set in componentWillLoad;


  componentWillLoad() {
    
    let elId = this.el.id;
    let elsParent;
    let elsGrandparent;
    let headingElements;
    let pageWrapper = document.createElement("div");
    let headingIds = [];
    pageWrapper.classList.add("yeti-page_contents-wrapper");

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
    } else {
      headingElements = elsParent.querySelectorAll("h1, h2, h3, h4, h5, h6");
    }
    

    for (let i = 0; i < headingElements.length; i++) {
      
      let heading = headingElements[i]; // Actual heading HTMLElement
      let candidateId; // Potential id for the heading element.
      let newHeading: YetiPageContentsHeader = {
        label: "",
        id: "",
        level: 1
      };

      candidateId = (heading.id && heading.id != '') ? heading.id : heading.innerText.replaceAll(' ', ''); // If the id doesn't have an id then give it one.

      candidateId = (headingIds.includes(candidateId)) ? utils.generateUniqueId() : candidateId; // Base the id on the heading text if it would be unique, otherwise generate a unique id.

      newHeading.label = heading.innerText;
      newHeading.id = candidateId;
      newHeading.level = parseInt((heading.nodeName).substring(1)); // Get the "n" in Hn (e.g. 2 in H2)
      
      this.headings.push(newHeading);
      headingIds.push(candidateId);
      heading.id = candidateId;
    }

  }



  render() {

    let wrapperCSS = "yeti-page_contents";

    if (!this.isExpanded) {
      wrapperCSS += " yeti-page_contents__collapsed";
    }

    return (
      
      <div class={wrapperCSS} id={this.wrapperId}>

        {(!this.isExpanded) ? 
          <button class="yeti-page_contents-minmax" title='Expand page contents' onClick={(e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.isExpanded = true;
          }}><yeti-icon iconCode='toc'></yeti-icon></button> 
        : 
          ""}

        <ul class="yeti-page_contents-headings">

          {this.headings.map((heading, index) => {

              let css = `yeti-page_contents-heading yeti-page_contents-heading-level-${heading.level}`;
              let href = `#${heading.id}`;
              let myId = `${heading.id}_entry`;
              let label = heading.label;
              let minimize = {};

              if (index == 0) {
                // Render the minimize icon for the first one.
                css += ' yeti-page_contents-heading-title';
                minimize = <button class="yeti-page_contents-minmax" title='Minimize' onClick={(e) => {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  this.isExpanded = false;
                }}><yeti-icon iconCode='minimize'></yeti-icon></button>;
              }

              return <li class={css} id={myId} key={myId}>
                <a href={href} onClick={(e) => {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  document.getElementById(heading.id).scrollIntoView({ behavior: "smooth", inline: "start" });
                }}>{label}{(index == 0) ? minimize : ''}</a>
              </li>;
            })
          }

          <li class='yeti-page_contents-heading-actions'>
            
            <a href='' title="Back to top" onClick={(e) => {
              e.preventDefault();
              e.stopImmediatePropagation();
              document.body.scrollIntoView({ behavior: "smooth", inline: "start" });
            }} class='yeti-page_contents-heading-action'><yeti-icon iconCode='vertical_align_top'></yeti-icon></a>
            
            <a href='' title="Collapse all code blocks" onClick={(e) => {
              
              let demoes = document.getElementsByClassName("ydoc-code_sample");
          
              e.preventDefault();
              e.stopImmediatePropagation();
          
              for (let i = 0; i < demoes.length; i++) {
                demoes[i].classList.remove("ydoc-demo__code_expanded");
              }

            }} class='yeti-page_contents-heading-action'><yeti-icon iconCode='unfold_less_double'></yeti-icon></a>
            
            <a href='' title="Expand all code blocks" onClick={(e) => {
              
              let demoes = document.getElementsByClassName("ydoc-code_sample");
          
              e.preventDefault();
              e.stopImmediatePropagation();
          
              for (let i = 0; i < demoes.length; i++) {
                demoes[i].classList.add("ydoc-demo__code_expanded");
              }

            }} class='yeti-page_contents-heading-action'><yeti-icon iconCode='unfold_more_double'></yeti-icon></a>

          </li>

        </ul>

      </div>

    );
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
      
      entries.forEach( (entry) => {

        let myCorrespondingEntry = document.querySelector(`#${entry.target.id}_entry`);
        //let allCorrespondingEntries = document.querySelectorAll(".yeti-page_contents-heading");

        if (entry.isIntersecting && entry.target.nodeName != "H1") {

          // allCorrespondingEntries.forEach( oneOfAllEntries => {
          //   oneOfAllEntries.classList.remove("yeti-page_contents-heading__visible");
          // });

          if (myCorrespondingEntry && myCorrespondingEntry.classList) {
            myCorrespondingEntry.classList.add("yeti-page_contents-heading__visible");
          }
        
        } else {

          if (myCorrespondingEntry && myCorrespondingEntry.classList) {
            myCorrespondingEntry.classList.remove("yeti-page_contents-heading__visible");
          }

        }

      });

    }

  }
  

}
