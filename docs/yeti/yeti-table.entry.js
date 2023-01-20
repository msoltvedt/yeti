import { r as registerInstance, h, g as getElement } from './index-4c7d3552.js';
import { u as utils } from './utils-d2005b2d.js';

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
  }
  watchContentsHandler(newValue) {
    /*if (this.isValidTableData(newValue))
    this.isValidTableData(newValue);
    this.contentsActual = newValue as JSON;*/
    /*try {
      newContents = newValue as TableContents;
      console.log(newContents.body);

      if (!newContents.body) {
        throw new Error('Supplied data has no table body.');
      } else if (!newContents.body.rows) {
        throw new Error('Supplied data must have rows in table body.');
      }
    } catch (e) {
      console.error(e.message);
    }*/
    if (!newValue.body) {
      console.error('Supplied data has no table body.');
      return false;
    }
    else if (!newValue.body.rows) {
      console.error('Supplied data must have rows in table body.');
      return false;
    }
  }
  componentWillLoad() {
    this.watchContentsHandler(this.contents);
  }
  isValidTableData(data) {
    // Verify that the supplied data is in the correct format.
    console.log('isValidJSON returned ', utils.isValidJSON(data));
    if (utils.isValidJSON(data)) {
      // The data is at least JSON
      data = JSON.stringify(data);
      data = JSON.parse(data);
      console.log(Object.keys(data));
      return true;
    }
    else {
      console.error('Error in yeti-table; supplied data was not valid JSON.');
    }
    return true;
  }
  renderCell(cell) {
    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';
    if (cell.isHeading) {
      return h("th", { class: 'yeti-table-heading' + css, id: cell.id ? cell.id : utils.generateUniqueId() }, cell.value);
    }
    else {
      return h("td", { class: 'yeti-table-cell' + css, id: cell.id ? cell.id : utils.generateUniqueId() }, cell.value);
    }
  }
  renderRow(row) {
    let cells = [];
    row.cells.map((cell) => {
      cells.push(this.renderCell(cell));
    });
    return cells;
  }
  renderRows(rows) {
    let tbodyContents = [];
    rows.map((row) => {
      tbodyContents.push(h("tr", { class: "yeti-table-body-row", id: row.id ? row.id : utils.generateUniqueId() }, this.renderRow(row)));
    });
    return tbodyContents;
  }
  render() {
    let cssClass = 'yeti-table';
    if (this.tableClass != '') {
      cssClass += ' ' + this.tableClass;
    }
    if (this.isValid == false) {
      cssClass += ' yeti-input__error';
    }
    return (h("table", { class: cssClass }, h("thead", { class: "yeti-table-head" }, h("tr", { class: "yeti-table-head-row" }, this.contents.head.rows.map((row) => {
      return this.renderRow(row);
    }))), h("tbody", { class: "yeti-table-body" }, this.renderRows(this.contents.body.rows))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "contents": ["watchContentsHandler"]
  }; }
};

export { YetiTable as yeti_table };
