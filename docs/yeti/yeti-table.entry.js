import { r as registerInstance, h, g as getElement } from './index-9ea89afc.js';
import { u as utils } from './utils-7a1528ce.js';

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
  renderCell(cell) {
    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';
    cell.id = (cell.id) ? cell.id : utils.generateUniqueId();
    if (cell.isHeading) {
      return h("th", { class: 'yeti-table-heading' + css, key: cell.id }, cell.value);
    }
    else {
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
  // renderRows(rows: YetiTableRow[]) {
  //   let tbodyContents = [];
  //   rows.map((row) => {
  //     tbodyContents.push(
  //       <tr class={"yeti-table-body-row"} id={row.id ? row.id : utils.generateUniqueId()}>{this.renderRow(row)}</tr>
  //     );
  //   })
  //   return tbodyContents;
  // }
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
