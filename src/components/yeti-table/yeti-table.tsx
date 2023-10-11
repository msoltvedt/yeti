import { Component, Prop, h, State, Watch, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { utils, YetiTableContents, YetiTableRow, YetiTableCell } from '../../utils/utils';
import { YetiDatePicker } from '../yeti-date-picker/yeti-date-picker';
import { YetiMultiselect } from '../yeti-multiselect/yeti-multiselect';
import { YetiTablePagination } from '../yeti-table-pagination/yeti-table-pagination';

@Component({
  tag: 'yeti-table',
  shadow: false,
})

export class YetiTable {

  @Element() el: HTMLElement;

  /**
   * Fires when user chooses an option from the optional Menu Button component.
   */
  @Event({ bubbles: true }) rowActionClick: EventEmitter;

  /**
   * Fires when an isRadio cell changes value.
   */
  @Event({ bubbles: true }) cellRadioChange: EventEmitter;

  /**
   * Fires when user clicks a sortable header. This only fires when sortSelf is false (i.e. some logic outside the component will handle sorting and presumably update the table's contents).
   */
  @Event({ bubbles: true }) tableSort: EventEmitter;

  /**
   * Fires when user updates a column filter. This only fires when filterSelf is false (i.e. some logic outside the component will handle filtering and presumably update the table's contents).
   */
  @Event({ bubbles: true }) tableFilter: EventEmitter;

  /**
   * Fires when user chooses a different page of data. This only fires when paginateSelf is false (i.e. some logic outside the component will handle pagination and presumably update the table's contents).
   */
  @Event({ bubbles: true }) tablePaginate: EventEmitter;

  /**
   * CSS classlist that will be added to the actual html table element.
   */
  @Prop() tableClass: string = '';

  /**
   * id that will be assigned to the actual html table element.
   */
  @Prop() tableId: string = utils.generateUniqueId();

  /**
   * Placeholder text when filtering returns no matching records.
   */
  @Prop() noMatchesText: string = "No matches";

  /**
   * Number of table records
   */
  @Prop() records?: number = 0;

  /**
   * Unique type that captures the table's contents and configurable state information. See utils.ts for details.
   */
  @Prop() contents: YetiTableContents = {
    head: {
      rows: []
    },
    body: {
      rows: []
    }
  }

  @Watch('contents')
  watchContentsHandler(newValue: YetiTableContents, oldValue: YetiTableContents) {

    if (!newValue.body) {
      console.error('Supplied data has no table body.');
      return false;
    } else if (!newValue.body.rows) {
      console.error('Supplied data must have rows in table body.');
      return false;
    }

    this.markRowsWithChangedRowActions(oldValue);

    // See if the headings changed
    if (newValue.head && oldValue.head && newValue.head != oldValue.head) {
      this.setHeadingColumnIndices();
      //this.setDefaultFilterValues();
    }

    // See if the body changed
    if (newValue.body && oldValue.body && newValue.body != oldValue.body) {
      this.setBodyColumnIndices();
      //this.setDefaultFilterValues();
    }

  }

  /**
   * Determines whether to handle sorting (true) or just note the user requested it (false).
   */
  @Prop() sortSelf: boolean = true;

  /**
   * Determines whether to handle filtering (true) or just note the user requested it (false).
   */
  @Prop() filterSelf: boolean = true;

  /**
   * Determines whether to handle pagination (true) or just note the user requested it (false).
   */
  @Prop() paginateSelf: boolean = true;

  /**
   * Toggle this to force a re-render of the whole component.
   */
  @State() iLoveJSX: boolean = true;

  /**
   * Index of the first table record to display (used when paging).
   */
  @State() firstRecordIndexToDisplay: number = 0;

  /**
   * How many records to display at one time (used when paging).
   */
  @State() numRecordsToDisplay: number = 0; // Will initialize on load

  /**
   * Reference to an associated Pagination component, if it exists. This will be auto-set when the component first loads.
   */
  @State() paginationComponent: YetiTablePagination = null;

  /**
   * Tracks whether the user has requested filtering on any column. Primarily used to determine whether to show the clear filters icon.
   */
  @State() filtersAreActive: boolean = false;

  private tableHasFilters: boolean = false;

  private rowsThatPassFiltering: number = 0;

  @Listen('paginationUpdated')
  handlePaginationUpdate(ev) {
    let paginator = ev.target;

    this.numRecordsToDisplay = paginator.recordsDisplayed;

    // Handle pagination ourselves
    if (this.paginateSelf) {
      this.firstRecordIndexToDisplay = paginator.startIndex;
    }

    // Let the component consumer handle pagination
    else {
      this.tablePaginate.emit({
        "currentPage": ev.detail.currentPage,
        "recordsDisplayed": ev.detail.recordsDisplayed
      })
    }
  }

  @Listen('readyToVerifySlow')
  @Listen('readyToVerifyFast')
  handleReadyToVerify(ev) {

    let targetGeneric = ev.target as HTMLElement;
    let columnIndex = parseInt(targetGeneric.getAttribute("data-column"));

    switch (targetGeneric.nodeName.toLowerCase()) {

      case "yeti-date-picker":

        let picker = ev.target as YetiDatePicker;
        this.handleDateFilterChange(picker, columnIndex);
        return;

      case "yeti-multiselect":

        let multiselect = ev.target as YetiMultiselect;

        if (ev.type == 'readyToVerifyFast') {
          /* Note: readyToVerifySlow fires whenever yeti-multiselect closes the selection dropdown, which is not what we want here. */
          this.handleMultiselectFilterChange(multiselect, columnIndex);
        }
        return;
    }
  }

  @Listen('menuButtonChange')
  handleMenuButtonChange(ev) {

    let menuButton = ev.target;
    let newValue = ev.detail.newValue;
    let rowIndex = menuButton.getAttribute("data-row-index");

    this.rowActionClick.emit({
      "rowIndex": rowIndex,
      "actionLabel": newValue
    });
    
  }



  handleCellRadioChange(cell: YetiTableCell) {
    
    this.cellRadioChange.emit({
      "row": this.contents.body.rows[ cell.rowIndex ],
      "cell": cell
    });

  }



  setFiltersActiveFlag() {
    if (!this.tableHasFilters) {
      this.filtersAreActive = false;
    } else {
      // We know this table has filters. Loop through them all and see if any have a value other than "".

      for (let i = 0; i < this.contents.head.rows[0].cells.length; i++) {
        if (
          this.contents.head.rows[0].cells[i].filtering 
          && this.contents.head.rows[0].cells[i].filtering.value != ""
          && this.contents.head.rows[0].cells[i].filtering.value != undefined
        ) {
          this.filtersAreActive = true;
          return;
        }
      }

      this.filtersAreActive = false;
    }
  }



  markRowsWithChangedRowActions(oldContents) {
    /*
      Stencil's JSX compiler won't update the row actions <yeti-menu-button> component when row actions are changed in this.contents
      because it's passed by reference or something. As a result, we have to manually check to see if the row actions have changed,
      and if so, give the <yeti-menu-button> a new key to trigger a rerender with the latest data.
    */
    if (!this.contents.body || !this.contents.body.rows || !this.contents.body.rows.length) {
      return;
    }

    this.contents.body.rows.forEach((row, rowIndex) => {
      row.cells.forEach((cell, cellIndex) => {
        if (cell.rowActions && cell.rowActions.length && cell.rowActions.length > 0) {
          if (oldContents.body && oldContents.body.rows && oldContents.body.rows[rowIndex] && oldContents.body.rows[rowIndex].cells[cellIndex] && !utils.isEqual(cell.rowActions, oldContents.body.rows[rowIndex].cells[cellIndex].rowActions)) {
            
            row.rowActionsJustChanged = true;

          }
        }
      });
    });
  }



  isValidTableData(data: object | string): boolean {
    // Verify that the supplied data is in the correct format.
    
    if (utils.isValidJSON(data)) {
      // The data is at least JSON
      data = JSON.stringify(data);
      data = JSON.parse(data);

      return true;
    } else {
      console.error('Error in yeti-table; supplied data was not valid JSON.');
    }

    return true;
  }



  setHeadingColumnIndices() {
    
    // First check if there even is a head.
    if (!this.contents.head || !this.contents.head.rows || !(this.contents.head.rows.length > 0)) {
      return;
    }

    this.contents.head.rows.forEach((row, rowIndex) => {
      row.rowIndex = rowIndex;

      row.cells.forEach((cell, cellIndex) => {
        cell.columnIndex = cellIndex;
      })
    })
  }



  setBodyColumnIndices() {
    this.contents.body.rows.forEach((row, rowIndex) => {
      row.rowIndex = rowIndex;

      row.cells.forEach((cell, cellIndex) => {
        cell.columnIndex = cellIndex;
        cell.rowIndex = rowIndex;
      })
    })
  }



  setSortableOnCellsOtherThanTheOneWithThisIndex(columnIndex: number) {

    let ths = this.contents.head.rows[0].cells;
    
    for (let i = 0, th = ths[0]; i < ths.length; i++, th = ths[i]) {
    
      if (th.sortDirection) {

        th.sortDirection = (th.columnIndex == columnIndex) ? th.sortDirection : "unsorted"

      }
      
    }
  }



  setDefaultFilterValues() {
    if (!this.contents.head || !this.contents.head.rows || !(this.contents.head.rows.length > 0)) {
      return;
    }

    this.contents.head.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.filtering) {
          cell.filtering.value = "";
        }
      })
    });
    
    this.filtersAreActive = false;
  }


  
  handleSort(ev: Event, cell: YetiTableCell) {

    ev.preventDefault();

    // First check to see if we're doing this ourselves
    if (!this.sortSelf) {

      // We don't have to sort this ourselves.
      this.tableSort.emit({
        "columnIndex": cell.columnIndex,
        "sortDirection": (cell.sortDirection == "ascending") ? "descending" : "ascending"
      });

      return;
    }
    
    // We need to sort this ourselves
    this.contents.body.rows.sort((a: YetiTableRow, b: YetiTableRow) => {

      // Get values to sort on.
      let aValue: string = a.cells[cell.columnIndex].value;
      let bValue: string = b.cells[cell.columnIndex].value;

      // Determine the types of each value.
      let aType = utils.getStringifiedType(aValue);
      let bType = utils.getStringifiedType(bValue);

      // Adjust for sort direction.
      let sortModifier = (cell.sortDirection == "ascending") ? -1 : 1; // Always sort ascending unless we already are.

      // Handle mismatched types, first.
      if (aType != bType) {

        if (sortModifier > 0) {

          // Sort ascending order: numbers, strings, dates.
          switch (aType) {
            case "number": return -1;
            case "string": return -1;
            default: return 1;
          }

        } else {

          // Sort descending order: dates, strings, numbers.
          switch (aType) {
            case "date": return -1;
            case "string": return -1;
            default: return 1;
          }

        }

      }

      // Handle matched types
      switch (aType) {

        case "number": {
          return (utils.castToNumber(aValue) - utils.castToNumber(bValue)) * sortModifier;
        }

        case "string": {
          if (aValue == bValue) {
            return 0;
          } else {
            return (aValue < bValue) ? (-1 * sortModifier) : (1 * sortModifier);
          }
        }

        case "date": {
          let aDate: Date = new Date(aValue);
          let bDate: Date = new Date(bValue);
          if (aDate == bDate) {
            return 0;
          } else {
            return (aDate < bDate) ? (-1 * sortModifier) : (1 * sortModifier);
          }
        }
      }

    });

    cell.sortDirection = (cell.sortDirection == "ascending") ? "descending" : "ascending";
    this.setSortableOnCellsOtherThanTheOneWithThisIndex(cell.columnIndex);
    this.iLoveJSX = !this.iLoveJSX; // this.render() doesn't work, and there's no this.forceUpdate() in Stencil

  }



  handleTextFilterChange(input: HTMLInputElement, columnIndex: number) {

    // First make sure we're supposed to do this ourselves
    if (!this.filterSelf) {

      // Reset pagination current page to 0;
      this.paginationComponent.selectedPage = 1;

      this.tableFilter.emit({
        "columnIndex": columnIndex,
        "value": input.value
      });
    }

    // Yep, it's our job.
    else {
      this.contents.head.rows[0].cells[columnIndex].filtering.value = input.value;
      this.iLoveJSX = !this.iLoveJSX;
    }

    this.setFiltersActiveFlag();

  }



  handleSelectFilterChange(select: HTMLSelectElement, columnIndex: number) {

    // First make sure we're supposed to do this ourselves
    if (!this.filterSelf) {

      // Reset pagination current page to 0;
      this.paginationComponent.selectedPage = 1;

      this.tableFilter.emit({
        "columnIndex": columnIndex,
        "value": select.value
      });
    }

    // Yep, it's our job.
    else {
      this.contents.head.rows[0].cells[columnIndex].filtering.value = (select.selectedIndex == 0) ? "" : select.value;
      this.iLoveJSX = !this.iLoveJSX;
    }

    this.setFiltersActiveFlag();
    
  }



  handleDateFilterChange(picker: YetiDatePicker, columnIndex: number) {

    // First make sure we're supposed to do this ourselves
    if (!this.filterSelf) {

      // Reset pagination current page to 0;
      this.paginationComponent.selectedPage = 1;

      this.tableFilter.emit({
        "columnIndex": columnIndex,
        "value": picker.value
      });
    }

    // Yep, it's our job.
    else {
      this.contents.head.rows[0].cells[columnIndex].filtering.value = picker.value;
      this.iLoveJSX = !this.iLoveJSX;
    }

    this.setFiltersActiveFlag();
    
  }



  handleMultiselectFilterChange(multiselect: YetiMultiselect, columnIndex: number) {

    // First make sure we're supposed to do this ourselves
    if (!this.filterSelf) {

      // Reset pagination current page to 0;
      this.paginationComponent.selectedPage = 1;

      this.tableFilter.emit({
        "columnIndex": columnIndex,
        "value": multiselect.value
      });
    }

    // Yep, it's our job.
    else {
      this.contents.head.rows[0].cells[columnIndex].filtering.value = multiselect.value;
      this.iLoveJSX = !this.iLoveJSX;
    }
    
    this.setFiltersActiveFlag();
    
  }



  handleClearAllFilters() {
    
    // First make sure we're supposed to do this ourselves
    if (!this.filterSelf) {

      // Reset pagination current page to 0;
      this.paginationComponent.selectedPage = 1;

      this.tableFilter.emit({
        "columnIndex": -1,
        "value": "clear"
      });
    }

    // Yep, it's our job.
    else {
      this.iLoveJSX = !this.iLoveJSX;
    }

    this.setDefaultFilterValues();

  }



  doesRowPassFiltering(row: YetiTableRow) {
    // Checks to see if this row should be filtered out or if it's safe to show. Returns true or false.
    if (!this.filterSelf) {
      // If we're not filtering ourselves then pass automatically.
      return true;
    }

    // Check to see if each cell in the row passes filtering.
    for (let i=0; i<row.cells.length; i++) {
      if (!this.doesCellPassFiltering(row.cells[i])) {
        console.error(`row ${row.rowIndex} failed filtering because of cell ${row.cells[i].value}`)
        return false;
      }
    }

    return true;
  }



  doesCellPassFiltering(cell: YetiTableCell) {
    // Checks to see if this cell matches its heading's filters (if they exist).

    if (cell.value == "undefined") {
      cell.value = "";
    }

    // Row heading only tables can't have filtering, so pass them.
    if (!this.contents.head || !this.contents.head.rows || !(this.contents.head.rows.length > 0)) {
      return true;
    }

    let th = this.contents.head.rows[0].cells[cell.columnIndex];

    // First see if filtering is even a thing for this column. If it isn't, we're good.
    if (th && th.filtering && th.filtering.isFilterable && th.filtering.value) {
      
      let filterValue = th.filtering.value;

      // It depends on what type of filter (text, select, date, or multiselect) it is.
      switch (th.filtering.type) {

        case "text": {

          if (cell.value.indexOf(filterValue) >= 0) {
            return true;
          } else {
            return false;
          }
        }


        case "select": {

          if (cell.value.indexOf(filterValue) >= 0 || filterValue == "") {
            return true;
          } else {
            return false;
          }
        }


        case "date": {
          
          if (filterValue == "") {
            return true;
          } else if (new Date(filterValue).getTime() == new Date(cell.value).getTime()) {
            return true;
          } else {
            return false;
          }
        }


        case "multiselect": {

          // First, see if there are no values selected at all, in which case we pass.
          if (filterValue == "") {
            return true;

          // Second, see if the cell's value is in the array.
          } else {
            let filterValuesArray = filterValue.split(",");
            return filterValuesArray.includes(cell.value);
          }

        }


        default:
          console.error("Error in table data: unexpected filtering type supplied.")
          return false;
      }

    // There's no filtering, so it passes by default.
    } else {
      return true;
    }

  }



  getNumberOfRecords() {
    return (this.contents.body && this.contents.body.rows && this.contents.body.rows.length) ? this.contents.body.rows.length : -1;
  }



  renderCell(cell: YetiTableCell) {

    if (!cell.id || cell.id == "") {
      //console.warn("Each table cell should have a unique id.");
      cell.id = utils.generateUniqueId();
    }

    // See if it's a filter clear cell
    if (cell.filtering && cell.filtering.isClearCell) {

      this.tableHasFilters = true;

      return this.renderFilterClearCell(cell);

    }

    // See if it's a row actions cell
    if (cell.rowActions) {

      return this.renderRowActionsCell(cell);

    }

    // See if it's a radio cell
    if (cell.isRadio) {

      return this.renderRadioCell(cell);

    }

    // See if it's a th
    if (cell.isHeading) {

      return this.renderTableHeading(cell);

    // It must be a td
    } else {

      let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';

      if (cell.template) {
        return <td class={'yeti-table-cell' + css} id={cell.id} key={cell.id} innerHTML={cell.template}></td>
      }

      return <td class={'yeti-table-cell' + css} id={cell.id} key={cell.id}>{cell.value}</td>

    }

  }



  renderRowActionsCell(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != "") ? 
      "yeti-table-cell yeti-table-control yeti-table-cell-row_actions" + cell.cssClass : 
      "yeti-table-cell yeti-table-control yeti-table-cell-row_actions";

    let preexistingMenuButtonElement = document.querySelector(`#${cell.id} yeti-menu-button`);

    let controlId;
    let control;
    let timesUpdated;

    // Initialize controlId
    if (preexistingMenuButtonElement && preexistingMenuButtonElement.getAttribute("id")) {
      controlId = preexistingMenuButtonElement.getAttribute("id");
    } else {
      controlId = (cell.id && cell.id !== "") ? `${cell.id}_menuButton` : utils.generateUniqueId();
    }

    // Initialize timesUpdated
    if (preexistingMenuButtonElement && preexistingMenuButtonElement.getAttribute("data-times-updated")) {
      timesUpdated = parseInt( preexistingMenuButtonElement.getAttribute("data-times-updated"));
    } else {
      timesUpdated = 0;
    }

    // Handle the case where the row actions have changed.
    if (this.contents.body.rows[cell.rowIndex].rowActionsJustChanged) {
      
      // If the menu button has been changed previously then it'll have an attribute of data-times-updated
      ++timesUpdated;

      controlId = (cell.id && cell.id !== "") ? `${cell.id}_menuButton_mk${timesUpdated}` : utils.generateUniqueId();
      this.contents.body.rows[cell.rowIndex].rowActionsJustChanged = false;
    
    }

    // Handle the case where there are no actions for this row.
    if (cell.rowActions.length <= 0) {
      return <td class={css} id={cell.id} key={cell.id}></td>
    }

    // Otherwise there are actions for this row.
    else {
      let actions = [];

      for (let i = 0; i < cell.rowActions.length; i++) {

        let action;
        let actionId = `${controlId}_opt${i}`;

        if (cell.rowActions[i].href) {
          action = <yeti-menu-button-option href={cell.rowActions[i].href} id={actionId} key={actionId}>{cell.rowActions[i].label}</yeti-menu-button-option>
        } else {
          action = <yeti-menu-button-option id={actionId} key={actionId}>{cell.rowActions[i].label}</yeti-menu-button-option>
        }

        actions.push(action);
      }

      control = <yeti-menu-button 
        menu-alignment="right" 
        data-row-index={cell.rowIndex} 
        data-times-updated={`${timesUpdated}`}
        id={controlId}
        key={controlId}
        tooltipText="Row actions">{actions}</yeti-menu-button>

      return <td class={css} id={cell.id} key={cell.id}>{control}</td>
      
    }
  }



  renderRadioCell(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != "") ? 
      " " + cell.cssClass : 
      "";

    let radioName = `${this.tableId}_radios`;
    let radioValue = `${radioName}_${cell.rowIndex}`;

    let control = <input type="radio" class="yeti-radio" name={radioName} value={radioValue} id={radioValue} onChange={() => {
      this.handleCellRadioChange(cell);
    }} />;

    return <td class={`yeti-table-cell yeti-table-control ${css}`} id={cell.id} key={cell.id}>{control}</td>
    
  }



  renderFilterClearCell(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != "") ? 
      " " + cell.cssClass : 
      "";

    let control = <yeti-tooltip text="Clear filters">
      <button 
        class="yeti-table-filter-clear-button" 
        onClick={(ev) => { this.handleClearAllFilters(); ev.preventDefault(); }} 
        aria-label="Clear all filters">
        
        <span class="material-icons" aria-hidden="true">cancel</span>
        
      </button>
    </yeti-tooltip>

    return <td class={`yeti-table-heading yeti-table-cell-clear ${css}`} id={cell.id} key={cell.id}>{(this.filtersAreActive) ? control : ""}</td>
      
  }



  renderTableHeading(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';

    // First double-check it's a th
    if (!cell.isHeading) {

      console.error("Error rendering table cell: expected th, got td.");
      return;

    // It's a th
    } else {

      let headingLabelId;

      if (!cell.id || cell.id == "") {
        //console.warn("Table cells with filtering require a unique id.");
        headingLabelId = utils.generateUniqueId();
      } else {
        headingLabelId = `${cell.id}_heading`;
      }

      // It's a th, see if it's sortable or not.
      if (cell.sortDirection) {

        // It's a sortable column heading.
        let sortableHeading: YetiTableCell;
        let filter = "";
        let a11yText: string;
        let iconKey: string;

        cell.sortDirection = cell.sortDirection.toLowerCase();

        switch (cell.sortDirection) {

          case "ascending":

            a11yText = "Sorted ascending";
            iconKey = "expand_less"
            break;


          case "descending":

            a11yText = "Sorted descending";
            iconKey = "expand_more"
            break;
            

          default:

            a11yText = "Sortable";
            iconKey = "unfold_more";
      
        }

        // See if it's sortable and filterable
        if (cell.filtering && cell.filtering.isFilterable) {
          filter =
          <div class="yeti-table-heading-filter">
            {this.renderTableHeadingFilter(cell, headingLabelId)}
          </div>
        }

        sortableHeading =
          <th class={`yeti-table-heading ${css}`} scope={(cell.scope && cell.scope == "row") ? "row" : "col"}>

            <div class="yeti-table-heading-compound">

                <button class="yeti-table-heading-button" onClick={(ev) => { this.handleSort(ev, cell) }}>

                    <div class="yeti-table-heading-button-label" id={headingLabelId}>{cell.value}</div>

                    <span class="yeti-table-heading-button-icon">
                        <span class="yeti-a11y-hidden">{a11yText}</span>
                        <span class="material-icons" aria-hidden="true" title={a11yText}>{iconKey}</span>
                    </span>

                </button>

                { filter ? filter : "" }

            </div>

          </th>

        return sortableHeading;

      // See if it's filterable but not sortable.
      } else if (cell.filtering && cell.filtering.isFilterable) {

        return <th class={'yeti-table-heading' + css} scope={(cell.scope && cell.scope == "row") ? "row" : "col"}>

          <div class="yeti-table-heading-compound">

            <div class="yeti-table-heading-compound-actual" id={headingLabelId}>{cell.value}</div>


            <div class="yeti-table-heading-filter">
              
              {this.renderTableHeadingFilter(cell, headingLabelId)}

            </div>

          </div>

        </th>

      // It must be a simple column heading.
      } else {

        // It's a simple column heading.
        return <th class={'yeti-table-heading' + css} scope={(cell.scope && cell.scope == "row") ? "row" : "col"}>{cell.value}</th>

      }

    }
  }


  
  renderTableHeadingFilter(cell: YetiTableCell, headingLabelId: string) {
    // Returns the JSX for the appropriate filter object (text, select, date picker, or multiselect)

    let filterId = `${cell.id}_filter`;

    switch (cell.filtering.type) {

      case "text":

        return <input 
          type="text" 
          value={cell.filtering.value}
          class="yeti-input yeti-table-heading-filter-input" 
          onKeyUp={(ev) => {
            let that = ev.target as HTMLInputElement;
            this.handleTextFilterChange(that, cell.columnIndex);
          }}
          aria-labelledby={headingLabelId} />;


      case "select":

        let selectOptions = [];

        // See if the multiselect options are supplied (they must be)
        if (cell.filtering.options && cell.filtering.options.length > 0) {

          for (let i = 0; i < cell.filtering.options.length; i++) {

            // Set selected state based on the filtering value
            // First handle the case where the filtering value is empty (default).
            let selected = (i == 0 && cell.filtering.value == "") ? true : false;
            let optionId = `${filterId}_option${i}`;

            // Second handle the case where the filtering value matches this label.
            selected = (cell.filtering.options[i] == cell.filtering.value) ? true : false;

            selectOptions.push(
              <option selected={selected} id={optionId} key={optionId}>{cell.filtering.options[i]}</option>
            )
          }

        // Contents doesn't have options specified, but they're required. Error out.
        } else {

          console.error("Error in table select filter: no options supplied.");
          return false;

        }

        return <select 
          class="yeti-select yeti-table-heading-filter-input" 
          onChange={(ev) => {
            this.handleSelectFilterChange(ev.target as HTMLSelectElement, cell.columnIndex);
          }}
          aria-labelledby={headingLabelId}>
            <option value="" id={`${filterId}_defaultOption`} key={`${filterId}_defaultOption`}>- Any -</option>
            {selectOptions}
          </select>;


      case "date":

        return <yeti-date-picker 
          data-column={cell.columnIndex} 
          labelled-by={headingLabelId} 
          value={cell.filtering.value}
          id={filterId}
          key={filterId}
        ></yeti-date-picker>;


      case "multiselect":

        let multiselectOptions = [];

        // See if the multiselect options are supplied (they must be)
        if (cell.filtering.options && cell.filtering.options.length > 0) {

          for (let i = 0; i < cell.filtering.options.length; i++) {
            
            let optionId = `${filterId}_option${i}`;
            let optionLabel = cell.filtering.options[i];

            let optionIsSelected = (cell.filtering.value && cell.filtering.value.includes(optionLabel)) ? true : false;

            let optionProperties = {
              id: optionId,
              key: optionId
            }

            if (optionIsSelected) {
              optionProperties["selected"] = true;
            }

            multiselectOptions.push(
              <yeti-multiselect-option {...optionProperties}>{optionLabel}</yeti-multiselect-option>
            )

          }

        // Contents doesn't have options specified, but they're required. Error out.
        } else {

          console.error("Error in table multiselect filter: no options supplied.");
          return false;

        }

        return <yeti-multiselect 
            placeholder="- Any -" 
            data-column={cell.columnIndex}
            labelled-by={headingLabelId}
            id={filterId}
            key={filterId}
            value={cell.filtering.value}>
                {multiselectOptions}
          </yeti-multiselect>


      default:
        console.error("Error rendering table filter: unexpected filtering type requested:", cell.filtering.type);
        return "";

    }
  }



  renderRow(row: YetiTableRow) {

    let cells = [];

    row.cells.forEach((cell: YetiTableCell) => {
      cells.push(this.renderCell(cell));
    })

    return cells;

  }



  renderHeaderRow(row: YetiTableRow) {
    
    // Basically the same as renderRow but first checks to see if we need to create a placeholder heading cell.
    if (this.contents.head.rows.length == 0 || !this.contents.head.rows[0].cells || this.contents.head.rows[0].cells.length == 0) {

      //console.warn("All tables should have headers.");

      return <th class="yeti-table-heading" scope="col">No data</th>
    }

    // Base case, just render the row as usual.
    else {
      return this.renderRow(row);
    }
  }



  renderRows(rowStartIndex: number = 0, rowsToDisplay: number = this.contents.body.rows.length) {

    let tbodyContents = [];
    let rowsThatPassFiltering = [];
    let numRowsPassedAfterStartIndex = 0;

    // First make sure there are actual records to render.
    if (this.contents.body.rows.length == 0 || !this.contents.body.rows[0].cells || this.contents.body.rows[0].cells.length == 0) {

      // There are no records, display a placeholder row.
      let colspan = (!this.contents.head.rows[0] || !this.contents.head.rows[0].cells) ? 1 : this.contents.head.rows[0].cells.length;
      
      return <tr class="yeti-table-body-row">
        <td class="yeti-table-cell" colSpan={colspan}>This table has no data.</td>
      </tr>
    }

    for (let i = 0; i < this.contents.body.rows.length; i++) {

      const row = this.contents.body.rows[i];

      if (this.doesRowPassFiltering(row)) {

        rowsThatPassFiltering.push(row);

        // row passes filtering. If...
        if (
          (i >= rowStartIndex) &&                           // This row is on or after the startIndex,...
          (numRowsPassedAfterStartIndex < rowsToDisplay) && // ...and we haven't already found enough rows to display,...
          (rowsThatPassFiltering.length >= rowStartIndex)   // ...and it's not one of the filtered rows short of our quota...
        ) {
        
          if (!row.id || row.id == "") {
            //console.warn("All table rows should have a unique id.");
            row.id = utils.generateUniqueId();
          }

          ++numRowsPassedAfterStartIndex;
          tbodyContents.push( 
            <tr class={"yeti-table-body-row"} id={row.id} key={row.id}>{this.renderRow(row)}</tr>
          );

        }

      }

    }

    this.rowsThatPassFiltering = rowsThatPassFiltering.length;

    // If there's still at least one row to render...
    if (tbodyContents.length > 0) {
      
      return tbodyContents;
    
    }

    // Otherwise, render a placeholder row.
    return <tr class={"yeti-table-body-row"}>
      <td class="yeti-table-cell" colSpan={this.contents.head.rows[0].cells.length}>{this.noMatchesText}</td>
    </tr>;
  }



  componentWillLoad() {

    let componentId = this.el.getAttribute("id");
    let paginationComponentElement = this.el.querySelector("yeti-table-pagination");
    let paginationId;

    // Initialize numRecordsToDisplay
    if (paginationComponentElement) {
      /*
        Note: usually, we let the pagination component tell us what this.numRecordsToDisplay should be. However, on initial render,
        when the pagination finishes rendering and notifies the table what numRecordsToDisplay should be the table is not yet done
        rendering. Since numRecordsToDisplay is a state variable, this will trigger an immediate rerender. To avoid this, we cheat
        a little by peaking at the un-parsed <yeti-table-pagination> tag. If it has <yeti-table-pagination-option>s, then we'll use
        the value of the first one. If not, we'll use 10 (which is the pagination default).
      */

      let firstPaginationOption = paginationComponentElement.querySelector("yeti-table-pagination-option");
      let peekNumber = (firstPaginationOption) ? parseInt(firstPaginationOption.textContent) : 10;

      if (firstPaginationOption) {
        peekNumber = (firstPaginationOption.hasAttribute("all")) ? this.getNumberOfRecords() : peekNumber;
      }

      this.numRecordsToDisplay = (!isNaN(peekNumber)) ? peekNumber : 10;

      // At this point, even if this.numRecordsToDisplay is incorrect, the pagination component will correct it.

    } else {

      this.numRecordsToDisplay = this.getNumberOfRecords();

    }

    if (!componentId || componentId == "") {
      componentId = utils.generateUniqueId();
      this.el.setAttribute("id", componentId);
    }

    this.setHeadingColumnIndices();
    this.setBodyColumnIndices();
    this.watchContentsHandler(this.contents, this.contents);

    this.paginationComponent = this.el.querySelector("yeti-table-pagination") as any;

    if (paginationComponentElement) {
      paginationId = paginationComponentElement.getAttribute("id");
      paginationId = (paginationId && paginationId !== "") ? paginationId : `${componentId}_pagination`;
      paginationComponentElement.setAttribute("id", paginationId);
    }

  }



  componentWillRender() {

    let paginationComponentElement = this.el.querySelector("yeti-table-pagination");

    // If we're not paginating inside the component...
    if (!this.paginateSelf) {

      let recordsOnThisPage = this.paginationComponent.recordsDisplayed;

      // ...then we need to handle the case where we're on the last page, and we don't need to show all the records we got back.
      this.numRecordsToDisplay = recordsOnThisPage;

    }

    if (!paginationComponentElement) {
      // If we're not paginating, then we need to ensure numRecordsDisplayed is equal to the number of total records.
      this.numRecordsToDisplay = this.contents.body.rows.length;
    }

  }



  render() {

    let cssClass = 'yeti-table';

    if (this.tableClass != '') {
      cssClass += ' ' + this.tableClass;
    }

    return (
      
      <table class={cssClass}>

        {( this.contents.head ) ?
        
          <thead class="yeti-table-head">

            <tr class="yeti-table-head-row">

              {( this.contents.head && this.contents.head.rows && this.contents.head.rows.length > 0 && this.contents.head.rows[0].cells && this.contents.head.rows[0].cells.length > 0) ?

                this.contents.head.rows.map((row) => {
                  return this.renderRow(row);
                })

              :

                <th class="yeti-table-heading" scope="col">No data</th>

              }
                
            </tr>

          </thead>

        :

          ""

        }


        <tbody class="yeti-table-body">

          {
            this.renderRows(this.firstRecordIndexToDisplay, this.numRecordsToDisplay)
          }

        </tbody>

    </table>
    );
  }


  componentDidRender() {
    let paginationComponent = this.el.querySelector('yeti-table-pagination');
    
    if (paginationComponent != null) {

      // If we're relying on the component consumer to handle pagination, then we get the record count from them.
      // Otherwise, we use our own count of total rows (that passed filtering).
      paginationComponent.records = (this.paginateSelf) ? this.rowsThatPassFiltering : this.records;

    }

    this.setFiltersActiveFlag(); // In case filters were programmatically updated (usually because the component consumer is keeping track of filter state on their end somehow)

  }

}