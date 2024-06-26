import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiTable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.rowActionClick = createEvent(this, "rowActionClick", 7);
        this.cellRadioChange = createEvent(this, "cellRadioChange", 7);
        this.tableSort = createEvent(this, "tableSort", 7);
        this.tableFilter = createEvent(this, "tableFilter", 7);
        this.tablePaginate = createEvent(this, "tablePaginate", 7);
        this.tableHasFilters = false;
        this.rowsThatPassFiltering = 0;
        this.tableClass = '';
        this.tableId = utils.generateUniqueId();
        this.noRecordsText = "No records";
        this.noMatchesText = "No records found matching your filter criteria";
        this.records = 0;
        this.contents = {
            head: {
                rows: []
            },
            body: {
                rows: []
            }
        };
        this.sortSelf = true;
        this.filterSelf = true;
        this.paginateSelf = true;
        this.hasExpandableRows = false;
        this.placeholderText = "";
        this.iLoveJSX = true;
        this.firstRecordIndexToDisplay = 0;
        this.numRecordsToDisplay = 0;
        this.paginationComponent = null;
        this.filtersAreActive = false;
    }
    watchContentsHandler(newValue, oldValue) {
        if (!newValue.body) {
            console.error('Supplied data has no table body.');
            return false;
        }
        else if (!newValue.body.rows) {
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
                "recordsDisplayed": ev.detail.recordsDisplayed,
                "recordsPerPage": ev.detail.recordsPerPage
            });
        }
    }
    handleReadyToVerify(ev) {
        let targetGeneric = ev.target;
        let columnIndex = parseInt(targetGeneric.getAttribute("data-column"));
        switch (targetGeneric.nodeName.toLowerCase()) {
            case "yeti-date-picker":
                let picker = ev.target;
                this.handleDateFilterChange(picker, columnIndex);
                return;
            case "yeti-dropdown":
                let multiselect = ev.target; // Assuming that a yeti-dropdown here must be a multiselect.
                if (ev.type == 'readyToVerifyFast') {
                    this.handleMultiselectFilterChange(multiselect, columnIndex);
                }
                return;
        }
    }
    handleMenuButtonSelectionMade(ev) {
        let menuButton = ev.target;
        let newValue = ev.detail.value;
        let rowIndex = menuButton.getAttribute("data-row-index");
        let parentRowIndex = menuButton.getAttribute("data-parent-row-index");
        this.rowActionClick.emit({
            "rowIndex": rowIndex,
            "parentRowIndex": parentRowIndex,
            "actionLabel": newValue
        });
    }
    handleCellRadioChange(cell) {
        let rows = this.contents.body.rows;
        let row = rows[cell.rowIndex];
        // Unselect the other rows
        rows.forEach(row => row.isSelected = false);
        row.isSelected = true;
        this.iLoveJSX = !this.iLoveJSX;
        this.cellRadioChange.emit({
            "row": row,
            "cell": cell
        });
    }
    setFiltersActiveFlag() {
        if (!this.tableHasFilters) {
            this.filtersAreActive = false;
        }
        else {
            // We know this table has filters. Loop through them all and see if any have a value other than "".
            for (let i = 0; i < this.contents.head.rows[0].cells.length; i++) {
                if (this.contents.head.rows[0].cells[i].filtering
                    && this.contents.head.rows[0].cells[i].filtering.value != ""
                    && this.contents.head.rows[0].cells[i].filtering.value != undefined) {
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
        if (!this.rowExistsAtIndex(0)) {
            // Return if there isn't at least one row.
            return;
        }
        // Loop through each row
        this.contents.body.rows.forEach((row, rowIndex) => {
            // Loop through each cell in that row
            row.cells.forEach((cell, cellIndex) => {
                // See if the cell has row actions, and...
                try {
                    let correspondingCellInOldContents = oldContents.body.rows[rowIndex].cells[cellIndex];
                    // ...if so, if they're the same as what was in oldContents at the same row and column index.
                    if (this.hasRowActions(cell) && !utils.isEqual(cell.rowActions, correspondingCellInOldContents.rowActions)) {
                        row.rowActionsJustChanged = true;
                    }
                }
                catch (_a) {
                    row.rowActionsJustChanged = true; // For when cell has row actions, but we can't find row actions for the given cell in oldContents
                }
            });
            // Repeat process for childRows.
            if (row.childRows) {
                row.childRows.forEach((childRow, childRowIndex) => {
                    childRow.cells.forEach((childRowCell, childRowCellIndex) => {
                        // See if the cell has row actions, and...
                        try {
                            let correspondingCellInOldContents = oldContents.body.rows[rowIndex].childRows[childRowIndex].cells[childRowCellIndex];
                            // ...if so, if they're the same as what was in oldContents at the same row and column index.
                            if (this.hasRowActions(childRowCell) && !utils.isEqual(childRowCell.rowActions, correspondingCellInOldContents.rowActions)) {
                                childRow.rowActionsJustChanged = true;
                            }
                        }
                        catch (_a) {
                            childRow.rowActionsJustChanged = true; // For when cell has row actions, but we can't find row actions for the given cell in oldContents
                        }
                    });
                });
            }
        });
        // this.contents.body.rows.forEach((row, rowIndex) => {
        //   row.cells.forEach((cell, cellIndex) => {
        //     if (cell.rowActions && cell.rowActions.length && cell.rowActions.length > 0) {
        //       if (oldContents.body && oldContents.body.rows && oldContents.body.rows[rowIndex] && oldContents.body.rows[rowIndex].cells[cellIndex] && !utils.isEqual(cell.rowActions, oldContents.body.rows[rowIndex].cells[cellIndex].rowActions)) {
        //         row.rowActionsJustChanged = true;
        //       }
        //     }
        //   });
        // });
    }
    hasRowActions(cell) {
        // Returns true if cell has at least one row action in it.
        if (cell.rowActions && cell.rowActions.length && cell.rowActions.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    rowExistsAtIndex(rowIndex, childRowIndex = -1, contents = this.contents) {
        // Helper function that returns false unless a valid row object exists at the specified index in the given table contents's body.
        try {
            let potentialRow;
            if (childRowIndex >= 0) {
                potentialRow = contents.body.rows[rowIndex].childRows[childRowIndex];
            }
            else {
                potentialRow = contents.body.rows[rowIndex];
            }
            if (potentialRow != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (_a) {
            return false;
        }
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
            this.setColumnIndicesForRow(row);
            // If row has childRows then we need to index them too.
            if (row.childRows && row.childRows.length && row.childRows.length > 0) {
                // There are childRows. Index them.
                row.childRows.forEach((childRow, childRowIndex) => {
                    childRow.rowIndex = childRowIndex;
                    childRow.parentRow = row;
                    this.setColumnIndicesForRow(childRow, rowIndex);
                });
            }
        });
    }
    setColumnIndicesForRow(row, parentRowIndex = -1) {
        // Assumes row is valid and has a rowIndex already.
        let rowIndex = row.rowIndex;
        row.cells.forEach((cell, cellIndex) => {
            cell.columnIndex = cellIndex;
            cell.rowIndex = rowIndex;
            cell.parentRowIndex = parentRowIndex;
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
        this.filtersAreActive = false;
    }
    handleSort(ev, cell) {
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
        cell.sortDirection = (cell.sortDirection == "ascending") ? "descending" : "ascending";
        this.sortContentsPerHeaderCell(cell);
        this.iLoveJSX = !this.iLoveJSX; // this.render() doesn't work, and there's no this.forceUpdate() in Stencil
    }
    sortContentsPerHeaderCell(cell) {
        this.contents.body.rows.sort((a, b) => {
            // Get values to sort on.
            let aValue = a.cells[cell.columnIndex].value;
            let bValue = b.cells[cell.columnIndex].value;
            // Determine the types of each value.
            let aType = utils.getStringifiedType(aValue);
            let bType = utils.getStringifiedType(bValue);
            // Adjust for sort direction.
            let sortModifier = (cell.sortDirection == "ascending") ? 1 : -1; // Always sort ascending unless we already are.
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
                        return (aValue.toLowerCase() < bValue.toLowerCase()) ? (-1 * sortModifier) : (1 * sortModifier);
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
        this.setSortableOnCellsOtherThanTheOneWithThisIndex(cell.columnIndex);
    }
    handleTextFilterChange(e, input, columnIndex) {
        // We're only interested in the enter key.
        if (e.key != "Enter") {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        // It was enter, so start searching
        this.handleTextFilterSearch(input, columnIndex);
    }
    handleTextFilterSearch(input, columnIndex) {
        // First, make sure we're supposed to do this ourselves
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
    handleTextFilterButtonClick(e, input, columnIndex) {
        e.preventDefault();
        this.handleTextFilterSearch(input, columnIndex);
    }
    handleTextFilterClear(input, columnIndex) {
        input.value = ""; // There may be some lag in updating this from the component side; this is to be sure.
        this.handleTextFilterSearch(input, columnIndex);
    }
    handleSelectFilterChange(select, columnIndex) {
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
    handleDateFilterChange(picker, columnIndex) {
        // First make sure we're supposed to do this ourselves
        if (!this.filterSelf) {
            // Reset pagination current page to 0;
            this.paginationComponent.selectedPage = 1;
            this.tableFilter.emit({
                "columnIndex": columnIndex,
                "value": picker.value,
                "isValid": picker.isValid,
                "control": picker
            });
        }
        // Yep, it's our job.
        else {
            this.contents.head.rows[0].cells[columnIndex].filtering.value = picker.value;
            this.iLoveJSX = !this.iLoveJSX;
        }
        this.setFiltersActiveFlag();
    }
    handleMultiselectFilterChange(multiselect, columnIndex) {
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
    doesRowPassFiltering(row) {
        // Checks to see if this row should be filtered out or if it's safe to show. Returns true or false.
        if (!this.filterSelf) {
            // If we're not filtering ourselves then pass automatically.
            return true;
        }
        // Check to see if each cell in the row passes filtering.
        for (let i = 0; i < row.cells.length; i++) {
            if (!this.doesCellPassFiltering(row.cells[i])) {
                //console.error(`row ${row.rowIndex} failed filtering because of cell ${row.cells[i].value}`)
                return false;
            }
        }
        return true;
    }
    doesCellPassFiltering(cell) {
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
    getNumberOfRecords() {
        return (this.contents.body && this.contents.body.rows && this.contents.body.rows.length) ? this.contents.body.rows.length : -1;
    }
    renderCell(cell) {
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
        }
        else {
            let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';
            return h("td", Object.assign({ class: 'yeti-table-cell' + css, id: cell.id, key: cell.id }, ((cell.template) ? { "innerHTML": cell.template } : {}), ((cell.colspan && typeof cell.colspan == "number") ? { "colspan": cell.colspan } : {}), ((cell.rowspan && typeof cell.rowspan == "number") ? { "rowspan": cell.rowspan } : {})), ((cell.template) ? "" : cell.value) /* Use the cell template if provided; otherwise just use the value as usual. */);
        }
    }
    renderExpandoButton(containingRow) {
        // Render the expando button control. Assumes containingRow is an expandable row, and therefore has childRows.
        let childRowIds = [];
        let childRowIdsAsString = "";
        containingRow.isExpanded = (containingRow.isExpanded == undefined || containingRow.isExpanded == false) ? false : true; // containingRow.isExpanded could be undefined at this point. Default to false.
        let ariaLabelText = (containingRow.isExpanded) ? "Collapse current row" : "Expand current row";
        let iconCode = (containingRow.isExpanded) ? "expand_less" : "expand_more";
        if (!containingRow.id || containingRow.id == "") {
            // Should never get here, but just in case.
            containingRow.id = utils.generateUniqueId();
        }
        // First, get the ids of all the childRows, assigning new ids if necessary.
        containingRow.childRows.forEach((childRow, index) => {
            childRow.id = (!childRow.id || childRow.id == "") ? `${containingRow.id}_child_${index}` : childRow.id;
            childRowIds.push(childRow.id);
        });
        childRowIdsAsString = childRowIds.join(" ");
        return h("button", { type: "button", class: "yeti-table-expando_button", "aria-label": ariaLabelText, "aria-expanded": containingRow.isExpanded, "aria-controls": childRowIdsAsString, onClick: () => {
                containingRow.isExpanded = !containingRow.isExpanded;
                this.iLoveJSX = !this.iLoveJSX;
            } }, h("yeti-icon", { iconCode: iconCode, "aria-hidden": true }));
    }
    renderRowActionsCell(cell) {
        let css = (cell.cssClass && cell.cssClass != "") ?
            "yeti-table-cell yeti-table-control yeti-table-cell-row_actions " + cell.cssClass :
            "yeti-table-cell yeti-table-control yeti-table-cell-row_actions";
        let preexistingMenuButtonElement = document.querySelector(`#${cell.id} yeti-menu-button`);
        let controlId;
        let control;
        let timesUpdated;
        let containingRow = (cell.parentRowIndex >= 0) ? this.contents.body.rows[cell.parentRowIndex].childRows[cell.rowIndex] : this.contents.body.rows[cell.rowIndex];
        // Initialize controlId
        if (preexistingMenuButtonElement && preexistingMenuButtonElement.getAttribute("id")) {
            controlId = preexistingMenuButtonElement.getAttribute("id");
        }
        else {
            controlId = (cell.id && cell.id !== "") ? `${cell.id}_menuButton` : utils.generateUniqueId();
        }
        // Initialize timesUpdated
        if (preexistingMenuButtonElement && preexistingMenuButtonElement.getAttribute("data-times-updated")) {
            timesUpdated = parseInt(preexistingMenuButtonElement.getAttribute("data-times-updated"));
        }
        else {
            timesUpdated = 0;
        }
        // Handle the case where the row actions have changed.
        if (containingRow.rowActionsJustChanged) {
            // If the menu button has been changed previously then it'll have an attribute of data-times-updated
            ++timesUpdated;
            controlId = (cell.id && cell.id !== "") ? `${cell.id}_menuButton_mk${timesUpdated}` : utils.generateUniqueId();
            containingRow.rowActionsJustChanged = false;
        }
        // Handle the case where there are no actions for this row.
        if (cell.rowActions.length <= 0) {
            return h("td", { class: css, id: cell.id, key: cell.id });
        }
        // Otherwise there are actions for this row.
        else {
            let actions = [];
            for (let i = 0; i < cell.rowActions.length; i++) {
                let action;
                let actionId = `${controlId}_opt${i}`;
                if (cell.rowActions[i].href) {
                    action = h("yeti-menu-button-option", Object.assign({ href: cell.rowActions[i].href }, ((cell.rowActions[i].target) ? { "target": cell.rowActions[i].target } : {}), ((cell.rowActions[i].downloadAs && cell.rowActions[i].downloadAs != "") ? { "download-as": cell.rowActions[i].downloadAs } : {}), { id: actionId, key: actionId }), cell.rowActions[i].label);
                }
                else {
                    action = h("yeti-menu-button-option", { id: actionId, key: actionId }, cell.rowActions[i].label);
                }
                actions.push(action);
            }
            control = h("yeti-menu-button", { "menu-alignment": "right", "data-row-index": cell.rowIndex, "data-parent-row-index": cell.parentRowIndex, "data-times-updated": `${timesUpdated}`, id: controlId, key: controlId, tooltipText: "Row actions" }, actions);
            return h("td", { class: css, id: cell.id, key: cell.id }, control);
        }
    }
    renderRadioCell(cell) {
        let css = (cell.cssClass && cell.cssClass != "") ?
            " " + cell.cssClass :
            "";
        let radioName = `${this.tableId}_radios`;
        let radioValue = `${radioName}_${cell.rowIndex}`;
        let row = this.contents.body.rows[cell.rowIndex];
        let isRowChecked = (row.isSelected) ? true : false;
        let control = h("input", Object.assign({ type: "radio", class: "yeti-radio", name: radioName, value: radioValue, id: radioValue, onChange: () => {
                this.handleCellRadioChange(cell);
            } }, (isRowChecked ? { "checked": true } : {})));
        return h("td", { class: `yeti-table-cell yeti-table-control ${css}`, id: cell.id, key: cell.id }, control);
    }
    renderFilterClearCell(cell) {
        let css = (cell.cssClass && cell.cssClass != "") ?
            " " + cell.cssClass :
            "";
        let control = h("yeti-tooltip", { text: "Clear filters" }, h("button", { class: "yeti-table-filter-clear-button", onClick: (ev) => { this.handleClearAllFilters(); ev.preventDefault(); }, "aria-label": "Clear all filters" }, h("span", { class: "material-icons", "aria-hidden": "true" }, "cancel")));
        return h("td", { class: `yeti-table-heading yeti-table-cell-clear ${css}`, id: cell.id, key: cell.id }, (this.filtersAreActive) ? control : "");
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
            let headingLabelId;
            if (!cell.id || cell.id == "") {
                //console.warn("Table cells with filtering require a unique id.");
                headingLabelId = utils.generateUniqueId();
            }
            else {
                headingLabelId = `${cell.id}_heading`;
            }
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
                    h("th", { class: `yeti-table-heading ${css}`, scope: (cell.scope && cell.scope == "row") ? "row" : "col" }, h("div", { class: "yeti-table-heading-compound" }, h("button", { class: "yeti-table-heading-button", onClick: (ev) => { this.handleSort(ev, cell); } }, h("div", { class: "yeti-table-heading-button-label", id: headingLabelId }, cell.value), h("span", { class: "yeti-table-heading-button-icon" }, h("span", { class: "yeti-a11y-hidden" }, a11yText), h("span", { class: "material-icons", "aria-hidden": "true", title: a11yText }, iconKey))), filter ? filter : ""));
                return sortableHeading;
                // See if it's filterable but not sortable.
            }
            else if (cell.filtering && cell.filtering.isFilterable) {
                return h("th", { class: 'yeti-table-heading' + css, scope: (cell.scope && cell.scope == "row") ? "row" : "col" }, h("div", { class: "yeti-table-heading-compound" }, h("div", { class: "yeti-table-heading-compound-actual", id: headingLabelId }, cell.value), h("div", { class: "yeti-table-heading-filter" }, this.renderTableHeadingFilter(cell, headingLabelId))));
                // It must be a simple column heading.
            }
            else {
                // It's a simple column heading.
                return h("th", Object.assign({ class: 'yeti-table-heading' + css, scope: (cell.scope && cell.scope == "row") ? "row" : "col" }, ((cell.template) ? { "innerHTML": cell.template } : {})), ((cell.template) ? "" : cell.value) /* Use the cell template if provided; otherwise just use the value as usual. */);
            }
        }
    }
    renderTableHeadingFilter(cell, headingLabelId) {
        // Returns the JSX for the appropriate filter object (text, select, date picker, or multiselect)
        let filterId = `${cell.id}_filter`;
        switch (cell.filtering.type) {
            case "text":
                let inputIdString = `yeti-table-filter-text-${cell.columnIndex}`;
                return h("div", { class: "yeti-table-heading-filter-input-wrapper" }, h("yeti-input", { type: "search", value: cell.filtering.value, inputClass: 'yeti-table-heading-filter-input', onKeyUp: (ev) => {
                        let that = ev.target;
                        this.handleTextFilterChange(ev, that, cell.columnIndex);
                    }, onSearchFieldClear: () => this.handleTextFilterClear(this.el.querySelector(`#${inputIdString}`), cell.columnIndex), inputId: inputIdString, labeledBy: headingLabelId }), h("button", { class: "yeti-table-heading-filter-input-button", onClick: (ev) => {
                        ev.preventDefault();
                        this.handleTextFilterButtonClick(ev, this.el.querySelector(`#${inputIdString}`), cell.columnIndex);
                    } }, h("span", { class: "material-icons", "aria-hidden": "true" }, "search")));
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
                        selectOptions.push(h("option", { selected: selected, id: optionId, key: optionId }, cell.filtering.options[i]));
                    }
                    // Contents doesn't have options specified, but they're required. Error out.
                }
                else {
                    console.error("Error in table select filter: no options supplied.");
                    return false;
                }
                return h("select", { class: "yeti-select yeti-table-heading-filter-input", onChange: (ev) => {
                        this.handleSelectFilterChange(ev.target, cell.columnIndex);
                    }, "aria-labelledby": headingLabelId }, h("option", { value: "", id: `${filterId}_defaultOption`, key: `${filterId}_defaultOption` }, "- Any -"), selectOptions);
            case "date":
                return h("yeti-date-picker", { "data-column": cell.columnIndex, "labelled-by": headingLabelId, value: cell.filtering.value, id: filterId, key: filterId, showErrorTooltip: true });
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
                        };
                        if (optionIsSelected) {
                            optionProperties["selected"] = true;
                        }
                        multiselectOptions.push(h("yeti-dropdown-option", Object.assign({}, optionProperties), optionLabel));
                    }
                    // Contents doesn't have options specified, but they're required. Error out.
                }
                else {
                    console.error("Error in table multiselect filter: no options supplied.");
                    return false;
                }
                return h("yeti-dropdown", { "is-multiselect": "true", placeholder: "- Any -", "data-column": cell.columnIndex, "labelled-by": headingLabelId, id: filterId, key: filterId, value: cell.filtering.value }, multiselectOptions);
            default:
                console.error("Error rendering table filter: unexpected filtering type requested:", cell.filtering.type);
                return "";
        }
    }
    renderRow(row) {
        let cells = [];
        // Check to see if this row has child rows so we can tell renderCell to add the expand/collapse button.
        let isAnExpandableRow = (row.childRows && row.childRows.length && row.childRows.length > 0) ? true : false;
        if (this.hasExpandableRows) {
            // Need to add a cell to the start of the row.
            let expandoCellId = `${row.id}_expando`;
            // Determine if this is a header row or a body row.
            if (row.cells && row.cells[0] && row.cells[0].isHeading) {
                // It's a header row.
                cells.push(h("th", { class: "yeti-table-heading yeti-table-heading-expando", scope: "col", id: expandoCellId, key: expandoCellId }));
            }
            else {
                // It's a body row.
                // See if it's a child row or a parent row.
                if (isAnExpandableRow) {
                    // It is, add the expando button control.
                    cells.push(h("td", { class: "yeti-table-cell yeti-table-cell-expando", id: expandoCellId, key: expandoCellId }, this.renderExpandoButton(row)));
                }
                else {
                    // It isn't, just add an empty cell.
                    cells.push(h("td", { class: "yeti-table-cell yeti-table-cell-expando", id: expandoCellId, key: expandoCellId }));
                }
            }
        }
        // Handle the rest of the cells.
        row.cells.forEach((cell) => {
            //let needsAnExpandCollapseButton = (isAnExpandableRow && index == 0) ? true : false; // Only the first cell in an expandable row needs an expando button.
            cells.push(this.renderCell(cell));
        });
        return cells;
    }
    renderRows(rowStartIndex = 0, rowsToDisplay = this.contents.body.rows.length) {
        let tbodyContents = [];
        let rowsThatPassFiltering = [];
        let numRowsPassedAfterStartIndex = 0;
        // First make sure there are actual records to render.
        if (this.contents.body.rows.length == 0 || !this.contents.body.rows[0].cells || this.contents.body.rows[0].cells.length == 0) {
            // There are no records, display a placeholder row.
            let colspan = (!this.contents.head.rows[0] || !this.contents.head.rows[0].cells) ? 1 : this.contents.head.rows[0].cells.length;
            return h("tr", { class: "yeti-table-body-row" }, this.hasExpandableRows ? h("td", null) : "", h("td", { class: "yeti-table-cell", colSpan: colspan }, this.placeholderText));
        }
        for (let i = 0; i < this.contents.body.rows.length; i++) {
            const row = this.contents.body.rows[i];
            let rowCSS = "yeti-table-body-row";
            let childRowCSS;
            rowCSS += (row.isSelected) ? " yeti-table-body-row__selected" : "";
            childRowCSS = rowCSS + " yeti-table-body-row-child_row";
            if (this.doesRowPassFiltering(row)) {
                rowsThatPassFiltering.push(row);
                // row passes filtering. If...
                if ((i >= rowStartIndex) && // This row is on or after the startIndex,...
                    (numRowsPassedAfterStartIndex < rowsToDisplay) && // ...and we haven't already found enough rows to display,...
                    (rowsThatPassFiltering.length >= rowStartIndex) // ...and it's not one of the filtered rows short of our quota...
                ) {
                    if (!row.id || row.id == "") {
                        //console.warn("All table rows should have a unique id.");
                        row.id = utils.generateUniqueId();
                    }
                    ++numRowsPassedAfterStartIndex;
                    tbodyContents.push(h("tr", { class: rowCSS, id: row.id, key: row.id }, this.renderRow(row)));
                    // Check to see if this row has child rows, and if so, add them as well.
                    if (row.childRows && row.childRows.length && row.childRows.length > 0) {
                        if (row.isExpanded == undefined) {
                            row.isExpanded = false; // Default to expandable rows being hidden.
                        }
                        if (!row.isExpanded) {
                            childRowCSS += " yeti-table-body-row-child_row__hidden";
                        }
                        for (let c = 0; c < row.childRows.length; c++) {
                            let childRowId = row.childRows[c].id = `${row.id}_child_${c}`;
                            tbodyContents.push(h("tr", { class: childRowCSS, id: childRowId, key: childRowId }, this.renderRow(row.childRows[c])));
                        }
                    }
                }
            }
        }
        this.rowsThatPassFiltering = rowsThatPassFiltering.length;
        // If there's still at least one row to render...
        if (tbodyContents.length > 0) {
            return tbodyContents;
        }
        // Otherwise, render a placeholder row.
        return h("tr", { class: "yeti-table-body-row" }, h("td", { class: "yeti-table-cell", colSpan: this.contents.head.rows[0].cells.length }, this.noMatchesText));
    }
    componentWillLoad() {
        let componentId = this.el.getAttribute("id");
        let paginationComponentElement = this.el.querySelector("yeti-table-pagination");
        let paginationId;
        let headerCells;
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
        }
        else {
            this.numRecordsToDisplay = this.getNumberOfRecords();
        }
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        this.setHeadingColumnIndices();
        this.setBodyColumnIndices();
        this.watchContentsHandler(this.contents, this.contents);
        this.paginationComponent = this.el.querySelector("yeti-table-pagination");
        if (paginationComponentElement) {
            paginationId = paginationComponentElement.getAttribute("id");
            paginationId = (paginationId && paginationId !== "") ? paginationId : `${componentId}_pagination`;
            paginationComponentElement.setAttribute("id", paginationId);
        }
        // Sort contents if necessary
        if (this.sortSelf) {
            if (this.contents &&
                this.contents.head &&
                this.contents.head.rows &&
                this.contents.head.rows[0] &&
                this.contents.head.rows[0].cells) {
                headerCells = this.contents.head.rows[0].cells;
                for (let i = 0; i < headerCells.length; i++) {
                    let cell = headerCells[i];
                    if (cell.sortDirection && (cell.sortDirection == "ascending" || cell.sortDirection == "descending")) {
                        this.sortContentsPerHeaderCell(cell);
                        break; // Only sort via the first one (since there should be only one of them anyway)
                    }
                }
            }
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
        return (h("table", { key: '3bd132f0af98d509546ca4cb8e86d9a03ef8bc4f', class: cssClass }, (this.contents.head) ?
            h("thead", { class: "yeti-table-head" }, h("tr", { class: "yeti-table-head-row" }, (this.contents.head && this.contents.head.rows && this.contents.head.rows.length > 0 && this.contents.head.rows[0].cells && this.contents.head.rows[0].cells.length > 0) ?
                this.contents.head.rows.map((row) => {
                    return this.renderRow(row);
                })
                :
                    h("th", { class: "yeti-table-heading", scope: "col" }, "No data")))
            :
                "", h("tbody", { key: '964334637bdd7074d561391af18e81b8314b2005', class: "yeti-table-body" }, this.renderRows(this.firstRecordIndexToDisplay, this.numRecordsToDisplay))));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "contents": ["watchContentsHandler"]
    }; }
};

export { YetiTable as yeti_table };

//# sourceMappingURL=yeti-table.entry.js.map