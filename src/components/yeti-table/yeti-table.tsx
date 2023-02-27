import { Component, Prop, h, State, Watch, Element, Listen } from '@stencil/core';
import { utils, YetiTableContents, YetiTableRow, YetiTableCell } from '../../utils/utils';
import { YetiDatePicker } from '../yeti-date-picker/yeti-date-picker';
import { YetiMultiselect } from '../yeti-multiselect/yeti-multiselect';

@Component({
  tag: 'yeti-table',
  shadow: false,
})

export class YetiTable {

  @Element() el: HTMLElement;

  @Prop() tableClass: string = '';

  @Prop() tableId: string = utils.generateUniqueId();

  @Prop() contents: YetiTableContents = {
    head: {
      rows: [
        {
          cells: [
            {
              value: "Data"
            }
          ]
        }
      ]
    },

    body: {
      rows: [
        {
          cells: [
            {
              value: "This table has no data."
            }
          ]
        }
      ]
    }
  }

  @Watch('contents')
  watchContentsHandler(newValue: YetiTableContents) {

    if (!newValue.body) {
      console.error('Supplied data has no table body.');
      return false;
    } else if (!newValue.body.rows) {
      console.error('Supplied data must have rows in table body.');
      return false;
    }

  }

  @State() contentsActual: YetiTableContents;

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean = true;

  @State() iLoveJSX: boolean = true;

  @Listen('paginationUpdated')
  handlePaginationUpdate() {
    this.iLoveJSX = !this.iLoveJSX; // this.render() doesn't work, and there's no this.forceUpdate() in Stencil
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
        this.handleMultiselectFilterChange(multiselect, columnIndex);
        return;
    }
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
    this.contents.head.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.filtering && !cell.filtering.value) {
          cell.filtering.value = "";
        }
      })
    })
  }


  
  handleSort(cell: YetiTableCell) {
    
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
    this.contents.head.rows[0].cells[columnIndex].filtering.value = input.value;
    this.iLoveJSX = !this.iLoveJSX;
  }



  handleSelectFilterChange(select: HTMLSelectElement, columnIndex: number) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = (select.selectedIndex == 0) ? "" : select.value;
    this.iLoveJSX = !this.iLoveJSX;
  }



  handleDateFilterChange(picker: YetiDatePicker, columnIndex: number) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = picker.value;
    this.iLoveJSX = !this.iLoveJSX;
  }



  handleMultiselectFilterChange(multiselect: YetiMultiselect, columnIndex: number) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = multiselect.value;
    this.iLoveJSX = !this.iLoveJSX;
  }



  doesRowPassFiltering(row: YetiTableRow) {
    // Checks to see if this row should be filtered out or if it's safe to show. Returns true or false.

    // Check to see if each cell in the row passes filtering.
    for (let i=0; i<row.cells.length; i++) {
      if (!this.doesCellPassFiltering(row.cells[i])) {
        return false;
      }
    }

    return true;
  }



  doesCellPassFiltering(cell: YetiTableCell) {
    // Checks to see if this cell matches its heading's filters (if they exist).
    let th = this.contents.head.rows[0].cells[cell.columnIndex];

    // First see if filtering is even a thing for this column. If it isn't, we're good.
    if (th.filtering && th.filtering.isFilterable) {
      
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



  renderCell(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';

    cell.id = (cell.id) ? cell.id : utils.generateUniqueId();

    if (cell.isHeading) {

      return this.renderTableHeading(cell);

    } else {

      return <td class={'yeti-table-cell' + css} key={cell.id}>{cell.value}</td>

    }

  }



  renderTableHeading(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';

    // First double-check it's a th
    if (!cell.isHeading) {

      console.error("Error rendering table cell: expected th, got td.");
      return;

    // It's a th
    } else {

      let headingLabelId = utils.generateUniqueId();

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
          <th class={`yeti-table-heading ${css}`}>

            <div class="yeti-table-heading-compound">

                <button class="yeti-table-heading-button" onClick={() => { this.handleSort(cell) }}>

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

        return <th class={'yeti-table-heading' + css} key={cell.id}>

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
        return <th class={'yeti-table-heading' + css} key={cell.id}>{cell.value}</th>

      }

    }
  }


  
  renderTableHeadingFilter(cell: YetiTableCell, headingLabelId: string) {
    // Returns the JSX for the appropriate filter object (text, select, date picker, or multiselect)
    switch (cell.filtering.type) {

      case "text":

        return <input 
          type="text" 
          value={this.contents.head.rows[0].cells[cell.columnIndex].filtering.value} 
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
            selectOptions.push(
              <option>{cell.filtering.options[i]}</option>
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
            let that = ev.target as HTMLSelectElement;
            this.handleSelectFilterChange(that, cell.columnIndex);
          }}
          aria-labelledby={headingLabelId}>
            <option>-Any-</option>
            {selectOptions}
          </select>;


      case "date":

        return <yeti-date-picker data-column={cell.columnIndex} labelled-by={headingLabelId}></yeti-date-picker>;


      case "multiselect":

        let multiselectOptions = [];

        // See if the multiselect options are supplied (they must be)
        if (cell.filtering.options && cell.filtering.options.length > 0) {

          for (let i = 0; i < cell.filtering.options.length; i++) {
            multiselectOptions.push(
              <yeti-multiselect-option>{cell.filtering.options[i]}</yeti-multiselect-option>
            )
          }

        // Contents doesn't have options specified, but they're required. Error out.
        } else {

          console.error("Error in table multiselect filter: no options supplied.");
          return false;

        }

        return <yeti-multiselect 
          placeholder="-Any-" 
          data-column={cell.columnIndex}
          labelled-by={headingLabelId}>
              {multiselectOptions}
          </yeti-multiselect>


      default:
        console.error("Error rendering table filter: unexpected filtering type requested:", cell.filtering.type);
        return "";

    }
  }



  renderRow(row: YetiTableRow) {

    let cells = [];

    row.cells.map((cell: YetiTableCell) => {
      cells.push(this.renderCell(cell));
    })

    return cells;

  }



  renderRows(rowStartIndex: number = 0, rowEndIndex: number = this.contents.body.rows.length-1) {

    let tbodyContents = [];
    let rowsThatPassFiltering = 0;

    for (let i = rowStartIndex; i <= rowEndIndex; i++) {

      const row = this.contents.body.rows[i];

      if (this.doesRowPassFiltering(row)) {
        ++rowsThatPassFiltering;
        row.id = (row.id) ? row.id : utils.generateUniqueId();
        tbodyContents.push( 
          <tr class={"yeti-table-body-row"} key={row.id}>{this.renderRow(row)}</tr>
        );
      }

    }

    // If there's still at least one row to render...
    if (rowsThatPassFiltering > 0) {
      
      return tbodyContents;
    
    }

    // Otherwise, render a placeholder row.
    return <tr class={"yeti-table-body-row"}>
      <td class="yeti-table-cell" colSpan={this.contents.head.rows[0].cells.length}>No matches</td>
    </tr>;
  }



  componentWillLoad() {
    this.watchContentsHandler(this.contents);
    this.setHeadingColumnIndices();
    this.setBodyColumnIndices();
    this.setDefaultFilterValues();
  }



  render() {

    let cssClass = 'yeti-table';
    let paginationComponent = this.el.querySelector('yeti-table-pagination');
    let indexOfFirstRowToDisplay: number = 0;
    let indexOfLastRowToDisplay: number = this.contents.body.rows.length-1;
    
    if (paginationComponent != null) {
      
      paginationComponent.records = this.contents.body.rows.length;

      paginationComponent.id = paginationComponent.id ? paginationComponent.id : utils.generateUniqueId();

      indexOfFirstRowToDisplay = paginationComponent.startIndex - 1;
      indexOfLastRowToDisplay = paginationComponent.endIndex - 1;

    }

    if (this.tableClass != '') {
      cssClass += ' ' + this.tableClass;
    }

    if (this.isValid == false) {
      cssClass += ' yeti-input__error';
    }

    return (
      
      <table class={cssClass}>

        <thead class="yeti-table-head">

          <tr class="yeti-table-head-row">

              {
                this.contents.head.rows.map((row) => {
                  return this.renderRow(row);
                })
              }

          </tr>

        </thead>


        <tbody class="yeti-table-body">

          {
            this.renderRows(indexOfFirstRowToDisplay, indexOfLastRowToDisplay)
          }

        </tbody>

    </table>
    );
  }

}
