import { Component, Prop, h, State, Element } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-page-contents',
  shadow: false,
})
export class YetiContents {

  @Element() el: HTMLElement;

  /**
   * The type of icon. Corresponds to the analogous "code" Google uses (i.e. check_circle).
   */
  @Prop({ attribute: 'type'}) iconCode: string = 'check_circle';

  /**
   * The type of icon. Corresponds to the analogous "code" Google uses (i.e. check_circle).
   */
  @Prop() iconStyle: string = '';

  /**
   * CSS classlist applied to the actual element producing the icon.
   */
  @Prop({ attribute: 'icon-css'}) iconCSS?: string = '';

  /**
   * id of the actual element producing the icon. Set to a unique id if one is not provided.
   */
  @Prop() iconId?: string = utils.generateUniqueId();

  /**
   * Optional replacement text to use as a more clear description of the icon for screen-reader users. Otherwise AT will announce the Google "code" (i.e. check_circle).
   */
  @Prop() alt?: string = "";

  /**
   * Whether the icon can gain focus (used primarily for tooltip anchors).
   */
  @Prop() focusable?: boolean = false;

  /**
   * Used to toggle a re-render of the icon.
   */
  @State() iLoveJSX: boolean = false;



  componentDidRender() {
    if (this.focusable) {
        this.el.setAttribute("tabindex", "0");
    }
  }



  render() {
    function pullContentWithAnchorLinks() {
      // Get all h2 elements on the page
      const h3Elements = document.querySelectorAll('h3');
  
      // Create an unordered list element
      const ulElement = document.createElement('ul');
  
      // Loop through each h2 element and create a list item with an anchor link
      h3Elements.forEach((h3Element, index) => {
          const liElement = document.createElement('li');
          const aElement = document.createElement('a');
          aElement.href = `#section-${index + 1}`;
  
          // Set the text content of the anchor link to the h3 content
          aElement.textContent = h3Element.textContent || '';
          liElement.appendChild(aElement);
          ulElement.appendChild(liElement);
  
          // Add an id for linking purposes
          h3Element.id = `section-${index + 1}`;
      });
      // Return the unordered list element
      return ulElement;
  }
  
  // Get the target element in the HTML where you want to append the list
  const targetElement = document.getElementById('yeti-contents-menu'); // Replace 'target' with the actual ID of your target element
  
  // Call the function and append the unordered list to the target element
  const ulElement = pullContentWithAnchorLinks();
  targetElement?.appendChild(ulElement);
  
    

    return (

      <div class="yeti-contents-wrapper">

      <div id="yeti-contents-menu">
      
      </div>
                  
            </div>
      

    );
  }

}