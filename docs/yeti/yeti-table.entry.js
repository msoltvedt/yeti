import { r as registerInstance, e as createEvent, h, g as getElement } from './index-63c9e11c.js';
import { u as utils } from './utils-a407a515.js';

const YetiTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.rowActionClick = createEvent(this, "rowActionClick", 7);
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
  handleReadyToVerify(ev) {
    let targetGeneric = ev.target;
    let columnIndex = parseInt(targetGeneric.getAttribute("data-column"));
    switch (targetGeneric.nodeName.toLowerCase()) {
      case "yeti-date-picker":
        let picker = ev.target;
        this.handleDateFilterChange(picker, columnIndex);
        return;
      case "yeti-multiselect":
        let multiselect = ev.target;
        this.handleMultiselectFilterChange(multiselect, columnIndex);
        return;
    }
  }
  handleMenuButtonChange(ev) {
    let menuButton = ev.target;
    let newValue = ev.detail.newValue;
    let rowIndex = menuButton.getAttribute("data-row-index");
    this.rowActionClick.emit({
      "rowIndex": rowIndex,
      "actionLabel": newValue
    });
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
    // First check if there even is a head.
    if (!this.contents.head || !this.contents.head.rows || !(this.contents.head.rows.length > 0)) {
      return;
    }
    this.contents.head.rows.forEach((row, rowIndex) => {
      row.rowIndex = rowIndex;
      row.cells.forEach((cell, cellIndex) => {
        cell.columnIndex = cellIndex;
      });
    });
  }
  setBodyColumnIndices() {
    this.contents.body.rows.forEach((row, rowIndex) => {
      row.rowIndex = rowIndex;
      row.cells.forEach((cell, cellIndex) => {
        cell.columnIndex = cellIndex;
        cell.rowIndex = rowIndex;
      });
    });
  }
  setSortableOnCellsOtherThanTheOneWithThisIndex(columnIndex) {
    let ths = this.contents.head.rows[0].cells;
    for (let i = 0, th = ths[0]; i < ths.length; i++, th = ths[i]) {
      if (th.sortDirection) {
        th.sortDirection = (th.columnIndex == columnIndex) ? th.sortDirection : "unsorted";
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
      });
    });
  }
  handleSort(cell) {
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
  handleTextFilterChange(input, columnIndex) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = input.value;
    this.iLoveJSX = !this.iLoveJSX;
  }
  handleSelectFilterChange(select, columnIndex) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = (select.selectedIndex == 0) ? "" : select.value;
    this.iLoveJSX = !this.iLoveJSX;
  }
  handleDateFilterChange(picker, columnIndex) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = picker.value;
    this.iLoveJSX = !this.iLoveJSX;
  }
  handleMultiselectFilterChange(multiselect, columnIndex) {
    this.contents.head.rows[0].cells[columnIndex].filtering.value = multiselect.value;
    this.iLoveJSX = !this.iLoveJSX;
  }
  handleClearAllFilters() {
    this.setDefaultFilterValues();
    this.iLoveJSX = !this.iLoveJSX;
  }
  doesRowPassFiltering(row) {
    // Checks to see if this row should be filtered out or if it's safe to show. Returns true or false.
    // Check to see if each cell in the row passes filtering.
    for (let i = 0; i < row.cells.length; i++) {
      if (!this.doesCellPassFiltering(row.cells[i])) {
        return false;
      }
    }
    return true;
  }
  doesCellPassFiltering(cell) {
    // Checks to see if this cell matches its heading's filters (if they exist).
    // Row heading only tables can't have filtering, so pass them.
    if (!this.contents.head || !this.contents.head.rows || !(this.contents.head.rows.length > 0)) {
      return true;
    }
    let th = this.contents.head.rows[0].cells[cell.columnIndex];
    // First see if filtering is even a thing for this column. If it isn't, we're good.
    if (th.filtering && th.filtering.isFilterable) {
      let filterValue = th.filtering.value;
      // It depends on what type of filter (text, select, date, or multiselect) it is.
      switch (th.filtering.type) {
        case "text": {
          if (cell.value.indexOf(filterValue) >= 0) {
            return true;
          }
          else {
            return false;
          }
        }
        case "select": {
          if (cell.value.indexOf(filterValue) >= 0 || filterValue == "") {
            return true;
          }
          else {
            return false;
          }
        }
        case "date": {
          if (filterValue == "") {
            return true;
          }
          else if (new Date(filterValue).getTime() == new Date(cell.value).getTime()) {
            return true;
          }
          else {
            return false;
          }
        }
        case "multiselect": {
          // First, see if there are no values selected at all, in which case we pass.
          if (filterValue == "") {
            return true;
            // Second, see if the cell's value is in the array.
          }
          else {
            let filterValuesArray = filterValue.split(",");
            return filterValuesArray.includes(cell.value);
          }
        }
        default:
          console.error("Error in table data: unexpected filtering type supplied.");
          return false;
      }
      // There's no filtering, so it passes by default.
    }
    else {
      return true;
    }
  }
  renderCell(cell) {
    cell.id = (cell.id) ? cell.id : utils.generateUniqueId();
    // See if it's a filter clear cell
    if (cell.filtering && cell.filtering.isClearCell) {
      return this.renderFilterClearCell(cell);
    }
    // See if it's a row actions cell
    if (cell.rowActions) {
      return this.renderRowActionsCell(cell);
    }
    // See if it's a th
    if (cell.isHeading) {
      return this.renderTableHeading(cell);
      // It must be a td
    }
    else {
      let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';
      return h("td", { class: 'yeti-table-cell' + css, key: cell.id }, cell.value);
    }
  }
  renderRowActionsCell(cell) {
    let css = (cell.cssClass && cell.cssClass != "") ?
      "yeti-table-cell yeti-table-control yeti-table-cell-row_actions" + cell.cssClass :
      "yeti-table-cell yeti-table-control yeti-table-cell-row_actions";
    let control;
    // Handle the case where there are no actions for this row.
    if (cell.rowActions.length <= 0) {
      return h("td", { class: css, key: cell.id });
    }
    // Otherwise there are actions for this row.
    else {
      let actions = [];
      for (let i = 0; i < cell.rowActions.length; i++) {
        let action;
        if (cell.rowActions[i].href) {
          action = h("yeti-menu-button-option", { href: cell.rowActions[i].href }, cell.rowActions[i].label);
        }
        else {
          action = h("yeti-menu-button-option", null, cell.rowActions[i].label);
        }
        actions.push(action);
      }
      control = h("yeti-menu-button", { "menu-alignment": "right", "data-row-index": cell.rowIndex, tooltipText: "Row actions" }, actions);
      return h("td", { class: css, key: cell.id }, control);
    }
  }
  renderFilterClearCell(cell) {
    let css = (cell.cssClass && cell.cssClass != "") ?
      " " + cell.cssClass :
      "";
    let control = h("yeti-tooltip", { text: "Clear filters" }, h("button", { class: "yeti-table-filter-clear-button", onClick: () => { this.handleClearAllFilters(); }, "aria-label": "Clear all filters" }, h("span", { class: "material-icons", "aria-hidden": "true" }, "cancel")));
    let atLeastOneFilterActive = false;
    if (this.contents.head && this.contents.head.rows && this.contents.head.rows.length > 0) {
      for (let i = 0; i < this.contents.head.rows[0].cells.length; i++) {
        let cell = this.contents.head.rows[0].cells[i];
        if (cell.filtering && cell.filtering.value && cell.filtering.value != "") {
          atLeastOneFilterActive = true;
          break;
        }
      }
    }
    return h("td", { class: `yeti-table-heading yeti-table-cell-clear ${css}`, key: cell.id }, (atLeastOneFilterActive) ? control : "");
  }
  renderTableHeading(cell) {
    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';
    // First double-check it's a th
    if (!cell.isHeading) {
      console.error("Error rendering table cell: expected th, got td.");
      return;
      // It's a th
    }
    else {
      let headingLabelId = utils.generateUniqueId();
      // It's a th, see if it's sortable or not.
      if (cell.sortDirection) {
        // It's a sortable column heading.
        let sortableHeading;
        let filter = "";
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
        // See if it's sortable and filterable
        if (cell.filtering && cell.filtering.isFilterable) {
          filter =
            h("div", { class: "yeti-table-heading-filter" }, this.renderTableHeadingFilter(cell, headingLabelId));
        }
        sortableHeading =
          h("th", { class: `yeti-table-heading ${css}`, scope: (cell.scope && cell.scope == "row") ? "row" : "col" }, h("div", { class: "yeti-table-heading-compound" }, h("button", { class: "yeti-table-heading-button", onClick: () => { this.handleSort(cell); } }, h("div", { class: "yeti-table-heading-button-label", id: headingLabelId }, cell.value), h("span", { class: "yeti-table-heading-button-icon" }, h("span", { class: "yeti-a11y-hidden" }, a11yText), h("span", { class: "material-icons", "aria-hidden": "true", title: a11yText }, iconKey))), filter ? filter : ""));
        return sortableHeading;
        // See if it's filterable but not sortable.
      }
      else if (cell.filtering && cell.filtering.isFilterable) {
        return h("th", { class: 'yeti-table-heading' + css, key: cell.id, scope: (cell.scope && cell.scope == "row") ? "row" : "col" }, h("div", { class: "yeti-table-heading-compound" }, h("div", { class: "yeti-table-heading-compound-actual", id: headingLabelId }, cell.value), h("div", { class: "yeti-table-heading-filter" }, this.renderTableHeadingFilter(cell, headingLabelId))));
        // It must be a simple column heading.
      }
      else {
        // It's a simple column heading.
        return h("th", { class: 'yeti-table-heading' + css, key: cell.id, scope: (cell.scope && cell.scope == "row") ? "row" : "col" }, cell.value);
      }
    }
  }
  renderTableHeadingFilter(cell, headingLabelId) {
    // Returns the JSX for the appropriate filter object (text, select, date picker, or multiselect)
    switch (cell.filtering.type) {
      case "text":
        return h("input", { type: "text", value: cell.filtering.value, class: "yeti-input yeti-table-heading-filter-input", onKeyUp: (ev) => {
            let that = ev.target;
            this.handleTextFilterChange(that, cell.columnIndex);
          }, "aria-labelledby": headingLabelId });
      case "select":
        let selectOptions = [];
        // See if the multiselect options are supplied (they must be)
        if (cell.filtering.options && cell.filtering.options.length > 0) {
          for (let i = 0; i < cell.filtering.options.length; i++) {
            // Set selected state based on the filtering value
            // First handle the case where the filtering value is empty (default).
            let selected = (i == 0 && cell.filtering.value == "") ? true : false;
            // Second handle the case where the filtering value matches this label.
            selected = (cell.filtering.options[i] == cell.filtering.value) ? true : false;
            selectOptions.push(h("option", { selected: selected }, cell.filtering.options[i]));
          }
          // Contents doesn't have options specified, but they're required. Error out.
        }
        else {
          console.error("Error in table select filter: no options supplied.");
          return false;
        }
        return h("select", { class: "yeti-select yeti-table-heading-filter-input", onChange: (ev) => {
            let that = ev.target;
            this.handleSelectFilterChange(that, cell.columnIndex);
          }, "aria-labelledby": headingLabelId }, h("option", null, "-Any-"), selectOptions);
      case "date":
        return h("yeti-date-picker", { key: utils.generateUniqueId(), "data-column": cell.columnIndex, "labelled-by": headingLabelId, value: cell.filtering.value });
      case "multiselect":
        let multiselectOptions = [];
        // See if the multiselect options are supplied (they must be)
        if (cell.filtering.options && cell.filtering.options.length > 0) {
          for (let i = 0; i < cell.filtering.options.length; i++) {
            multiselectOptions.push(h("yeti-multiselect-option", null, cell.filtering.options[i]));
          }
          // Contents doesn't have options specified, but they're required. Error out.
        }
        else {
          console.error("Error in table multiselect filter: no options supplied.");
          return false;
        }
        return h("yeti-multiselect", { placeholder: "-Any-", "data-column": cell.columnIndex, "labelled-by": headingLabelId, value: cell.filtering.value }, multiselectOptions);
      default:
        console.error("Error rendering table filter: unexpected filtering type requested:", cell.filtering.type);
        return "";
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
    let rowsThatPassFiltering = 0;
    for (let i = rowStartIndex; i <= rowEndIndex; i++) {
      const row = this.contents.body.rows[i];
      if (this.doesRowPassFiltering(row)) {
        ++rowsThatPassFiltering;
        row.id = (row.id) ? row.id : utils.generateUniqueId();
        tbodyContents.push(h("tr", { class: "yeti-table-body-row", key: row.id }, this.renderRow(row)));
      }
    }
    // If there's still at least one row to render...
    if (rowsThatPassFiltering > 0) {
      return tbodyContents;
    }
    // Otherwise, render a placeholder row.
    return h("tr", { class: "yeti-table-body-row" }, h("td", { class: "yeti-table-cell", colSpan: this.contents.head.rows[0].cells.length }, "No matches"));
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
    return (h("table", { class: cssClass }, (this.contents.head && this.contents.head.rows && this.contents.head.rows.length > 0) ?
      h("thead", { class: "yeti-table-head" }, h("tr", { class: "yeti-table-head-row" }, this.contents.head.rows.map((row) => {
        return this.renderRow(row);
      })))
      : '', h("tbody", { class: "yeti-table-body" }, this.renderRows(indexOfFirstRowToDisplay, indexOfLastRowToDisplay))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "contents": ["watchContentsHandler"]
  }; }
};

export { YetiTable as yeti_table };
