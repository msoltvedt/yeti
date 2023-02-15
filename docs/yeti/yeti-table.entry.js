import { r as registerInstance, h, g as getElement } from './index-77339656.js';
import { u as utils } from './utils-a407a515.js';

const YetiTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tableClass = '';
    this.tableId = utils.generateUniqueId();
    this.contents = {
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
    };
    this.contentsActual = undefined;
    this.isValid = true;
    this.iLoveJSX = true;
  }
  watchContentsHandler(newValue) {
    if (!newValue.body) {
      console.error('Supplied data has no table body.');
      return false;
    }
    else if (!newValue.body.rows) {
      console.error('Supplied data must have rows in table body.');
      return false;
    }
  }
  handlePaginationUpdate() {
    this.iLoveJSX = !this.iLoveJSX; // this.render() doesn't work, and there's no this.forceUpdate() in Stencil
  }
  componentWillLoad() {
    this.watchContentsHandler(this.contents);
    this.setHeadingColumnIndices();
  }
  isValidTableData(data) {
    // Verify that the supplied data is in the correct format.
    if (utils.isValidJSON(data)) {
      // The data is at least JSON
      data = JSON.stringify(data);
      data = JSON.parse(data);
      return true;
    }
    else {
      console.error('Error in yeti-table; supplied data was not valid JSON.');
    }
    return true;
  }
  setHeadingColumnIndices() {
    this.contents.head.rows.forEach((row, rowIndex) => {
      row.rowIndex = rowIndex;
      row.cells.forEach((cell, cellIindex) => {
        cell.columnIndex = cellIindex;
      });
    });
  }
  setSortableOnCellsOtherThanTheOneWithThisIndex(columnIndex) {
    let cells = this.contents.head.rows[0].cells;
    for (let i = 0, cell = cells[0]; i < cells.length; i++, cell = cells[i]) {
      cell.sortDirection = (cell.columnIndex == columnIndex) ? cell.sortDirection : "unsorted";
    }
  }
  handleSort(cell) {
    //let directionToSortIsAscending: boolean = (cell.sortDirection != "ascending") ? true : false;
    this.contents.body.rows.sort((a, b) => {
      // Get values to sort on.
      let aValue = a.cells[cell.columnIndex].value;
      let bValue = b.cells[cell.columnIndex].value;
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
        }
        else {
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
          }
          else {
            return (aValue < bValue) ? (-1 * sortModifier) : (1 * sortModifier);
          }
        }
        case "date": {
          let aDate = new Date(aValue);
          let bDate = new Date(bValue);
          if (aDate == bDate) {
            return 0;
          }
          else {
            return (aDate < bDate) ? (-1 * sortModifier) : (1 * sortModifier);
          }
        }
      }
    });
    cell.sortDirection = (cell.sortDirection == "ascending") ? "descending" : "ascending";
    this.setSortableOnCellsOtherThanTheOneWithThisIndex(cell.columnIndex);
    this.iLoveJSX = !this.iLoveJSX; // this.render() doesn't work, and there's no this.forceUpdate() in Stencil
  }
  renderCell(cell) {
    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';
    cell.id = (cell.id) ? cell.id : utils.generateUniqueId();
    if (cell.isHeading) {
      // It's a th, see if it's sortable or not.
      if (cell.sortDirection) {
        // It's a sortable column heading.
        let sortableHeading;
        let a11yText;
        let iconKey;
        cell.sortDirection = cell.sortDirection.toLowerCase();
        switch (cell.sortDirection) {
          case "ascending":
            a11yText = "Sorted ascending";
            iconKey = "expand_less";
            break;
          case "descending":
            a11yText = "Sorted descending";
            iconKey = "expand_more";
            break;
          default:
            a11yText = "Sortable";
            iconKey = "unfold_more";
        }
        sortableHeading =
          h("th", { class: "yeti-table-heading yeti-table-sortable" }, h("div", { class: "yeti-table-heading-compound" }, h("button", { class: "yeti-table-heading-button", onClick: () => { this.handleSort(cell); } }, h("div", { class: "yeti-table-heading-button-label" }, cell.value), h("span", { class: "yeti-table-heading-button-icon" }, h("span", { class: "yeti-a11y-hidden" }, a11yText), h("span", { class: "material-icons", "aria-hidden": "true", title: a11yText }, iconKey)))));
        return sortableHeading;
      }
      else {
        // It's a simple column heading.
        return h("th", { class: 'yeti-table-heading' + css, key: cell.id }, cell.value);
      }
    }
    else {
      // It's a td.
      return h("td", { class: 'yeti-table-cell' + css, key: cell.id }, cell.value);
    }
  }
  renderRow(row) {
    let cells = [];
    row.cells.map((cell) => {
      cells.push(this.renderCell(cell));
    });
    return cells;
  }
  renderRows(rowStartIndex = 0, rowEndIndex = this.contents.body.rows.length - 1) {
    let tbodyContents = [];
    for (let i = rowStartIndex; i <= rowEndIndex; i++) {
      const row = this.contents.body.rows[i];
      row.id = (row.id) ? row.id : utils.generateUniqueId();
      tbodyContents.push(h("tr", { class: "yeti-table-body-row", key: row.id }, this.renderRow(row)));
    }
    return tbodyContents;
  }
  render() {
    let cssClass = 'yeti-table';
    let paginationComponent = this.el.querySelector('yeti-table-pagination');
    let indexOfFirstRowToDisplay = 0;
    let indexOfLastRowToDisplay = this.contents.body.rows.length - 1;
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
    return (h("table", { class: cssClass }, h("thead", { class: "yeti-table-head" }, h("tr", { class: "yeti-table-head-row" }, this.contents.head.rows.map((row) => {
      return this.renderRow(row);
    }))), h("tbody", { class: "yeti-table-body" }, this.renderRows(indexOfFirstRowToDisplay, indexOfLastRowToDisplay))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "contents": ["watchContentsHandler"]
  }; }
};

export { YetiTable as yeti_table };
