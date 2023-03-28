import { Component, Prop, h, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-table-pagination',
  shadow: false,
})
export class YetiTablePagination {

  @Event() paginationUpdated: EventEmitter;

  @Element() el: HTMLElement;

  @Prop() cssClass: string = '';

  @Prop() htmlId: string = utils.generateUniqueId();

  @Prop() records: number = 0;

  @Watch('records')
  watchRecordsHandler() {
    this.updatePages();
    this.updateIndices();
  }

  @Prop({
    reflect: true,
    mutable: true
  }) startIndex: number = 0;

  @Prop({
    reflect: true,
    mutable: true
  }) recordsDisplayed: number = 0;

  @Watch('recordsDisplayed')
  watchRecordsDisplayed() {
    this.paginationUpdated.emit({
      "currentPage": this.selectedPage-1,
      "recordsDisplayed": this.recordsDisplayed
    });
  }

  @State() itemsPerPageOptions: (number | string)[] = [10, 25, 50, 100, "All"];

  @State() selectedItemsPerPageOptionIndex: number = 0;

  @Prop({
    reflect: true,
    mutable: true
  }) selectedPage: number = 1;

  @State() pages: number = 1;



  parseOptionElements(options: HTMLCollection) {

    let newItemsPerPageOptions: Array<number | string> = [];

    for (let i = 0; i < options.length; i++) {
      
      let option = options.item(i);
      
      // First, confirm this element is indeed a yeti-table-pagination-option element.
      if (option.tagName.toLowerCase() == 'yeti-table-pagination-option') {

        // Check to see if it has an all attribute, and push the string "All" if it does.
        if (option.attributes && option.attributes['all']) {

          newItemsPerPageOptions.push("All");

        } else {

          // Check to see if it has a valid number for its contents, and warn if it doesn't.
          let contents = parseInt(option.innerHTML);

          if (!Number.isNaN(contents)) {

            newItemsPerPageOptions.push(contents);

          } else {
            
            console.warn(`Ignoring \<yeti-table-pagination-option\> with invalid value \"${option.innerHTML}\". Numbers only please.`);
          
          }

        }

      }

    } // End for

    // Update itemsPerPageOptions if necessary.
    if (newItemsPerPageOptions.length > 0) {
      this.itemsPerPageOptions = newItemsPerPageOptions;
    }

    // Finally, we need to remove the option elements.
    for (let j = options.length - 1; j >= 0; --j) {
      options.item(j).remove();
    }

  }



  getItemsPerPageOption() {
    return this.itemsPerPageOptions[ this.selectedItemsPerPageOptionIndex ];
  }



  updateIndices() {
    let itemsPerPage = this.getItemsPerPageOption();

    // First set start index
    if (itemsPerPage == "All" || itemsPerPage > this.records) {

      this.startIndex = 0;

    } else {

      this.startIndex = ((this.selectedPage - 1) * (itemsPerPage as number));

    }

    // Second set end index
    if (itemsPerPage == "All" || itemsPerPage > this.records) {

      this.recordsDisplayed = this.records;

    } else {
      
      this.recordsDisplayed = Math.min(
        (this.records - this.startIndex),
        (itemsPerPage as number)
      )

    }

  }



  updatePages() {
    let p = this.getItemsPerPageOption();
    p = (p == "All") ? 1 : Math.ceil(this.records / (p as number));
    this.pages = p;
  }



  handleItemsPerPageChange(e: Event) {
    let select = e.target as HTMLSelectElement;
    this.selectedItemsPerPageOptionIndex = select.selectedIndex;
    this.selectedPage = 1;
    this.updatePages();
    this.updateIndices();
    e.preventDefault();
    this.paginationUpdated.emit({
      "currentPage": this.selectedPage-1,
      "recordsDisplayed": this.recordsDisplayed
    });
  }



  handlePageSelectChange(e: Event) {
    let select = e.target as HTMLSelectElement;
    this.selectedPage = parseInt(select.value);
    this.updateIndices();
    e.preventDefault();
    this.paginationUpdated.emit({
      "currentPage": this.selectedPage-1,
      "recordsDisplayed": this.recordsDisplayed
    });
  }



  handlePreviousPageButtonClick(ev) {
    this.selectedPage = Math.max(1, this.selectedPage - 1);
    this.updateIndices();
    ev.preventDefault();
    this.paginationUpdated.emit({
      "currentPage": this.selectedPage-1,
      "recordsDisplayed": this.recordsDisplayed
    });
  }



  handleNextPageButtonClick(ev) {
    this.selectedPage = Math.min(this.pages, this.selectedPage + 1);
    this.updateIndices();
    ev.preventDefault();
    this.paginationUpdated.emit({
      "currentPage": this.selectedPage-1,
      "recordsDisplayed": this.recordsDisplayed
    });
  }



  componentWillLoad() {
    let optionElements = this.el.children;

    // Look for and handle any <yeti-table-pagnation-option> elements.
    if (optionElements.length > 0) {
      
      this.parseOptionElements(optionElements);

    }

  }



  render() {

    let cssClasses = 'yeti-table-pagination';

    //console.warn('Pagination render()', this.el);

    if (this.cssClass != '') {
      cssClasses += ' ' + this.cssClass;
    }

    return (
      
      <nav class={cssClasses} aria-label="Table Pagination">

        {/* Items per page */}
        <div class="yeti-table-pagination-items_per_page">

            <label htmlFor="demo-items_per_page" class="yeti-table-pagination-items_per_page-label">Items per page:</label>

            <select id="demo-items_per_page" class="yeti-select yeti-table-pagination-items_per_page-select" onChange={(e) => {
              this.handleItemsPerPageChange(e);
            }}>
              {
                this.itemsPerPageOptions.map((option) => {
                  return <option value={option} class="yeti-table-pagination-items_per_page-select-option">{option}</option>
                })
              }
            </select>

            <span class="yeti-table-pagination-items_per_page-count">
              { 
                this.getItemsPerPageOption() == "All" || this.records == 0 ? 
                  "" 
                  : (this.startIndex + 1) + ' to ' + (this.startIndex + this.recordsDisplayed) /*(this.endIndex + 1)*/ + ' of '
              }
              {this.records} item{ this.records == 1 ? '' : 's'}
            </span>

        </div>


        {/* Pages */}
        {
          (this.records > 0) ?
          <div class="yeti-table-pagination-pages">

              <label htmlFor="demo-pages" class="yeti-a11y-hidden">Page number, of {this.pages} page{this.pages == 1 ? '' : 's'}</label>

              <select id="demo-pages" class="yeti-select yeti-table-pagination-pages-select" onChange={(e) => {
                this.handlePageSelectChange(e);
              }}>
                  {(() => {
                    let options = [];
                    for (let i=1; i <= this.pages; i++) {
                      options.push(<option value={i} class="yeti-table-pagination-pages-select-page"  {...((i == this.selectedPage) && { selected: true })}>{i}</option>);
                    }
                    return options;
                  })()}
              </select>

              <span class="yeti-table-pagination-pages-of_pages" aria-hidden="true">of {this.pages} page{this.pages == 1 ? '' : 's'}</span>

              <ul class="yeti-table-pagination-pages-buttons">

                  <li class="yeti-table-pagination-pages-buttons-action">

                      <button 
                        class="yeti-table-pagination-pages-buttons-button"
                        onClick={(ev) => {this.handlePreviousPageButtonClick(ev)}}
                        {...((this.selectedPage == 1) && { disabled: true })}
                      >

                          <span class="material-icons" aria-hidden="true">arrow_left</span>
                          <span class="yeti-a11y-hidden">Previous page</span>

                      </button>

                  </li>

                  <li class="yeti-table-pagination-pages-buttons-action">
                    
                      <button 
                        class="yeti-table-pagination-pages-buttons-button"
                        onClick={(ev) => {this.handleNextPageButtonClick(ev)}}
                        {...((this.selectedPage == this.pages) && { disabled: true })}
                      >
                          <span class="material-icons" aria-hidden="true">arrow_right</span>
                          <span class="yeti-a11y-hidden">Next page</span>
                      </button>

                  </li>

              </ul>

          </div>
          :
          ""
        }
        
    </nav>
    );
  }


  componentDidRender() {
    //console.warn("Pagination did render.", this.el)
    
  }

}
