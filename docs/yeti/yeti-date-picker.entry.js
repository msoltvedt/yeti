import { r as registerInstance, a as createEvent, h, g as getElement } from './index-81029423.js';
import { u as utils } from './utils-90cea6cb.js';

const YetiDatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
        // Used to manage focus when paging through different calendar month views via keyboard shortcuts
        this.keepFocusOnButton = false;
        this.pickerHeading = utils.generateUniqueId();
        this.inputClass = '';
        this.inputId = "";
        this.inputName = "";
        this.required = false;
        this.isValid = undefined;
        this.value = '';
        this.labelledBy = "";
        this.describedBy = "";
        this.showErrorTooltip = false;
        this.tooltipText = "Enter the date in mm/dd/yyyy format.";
        this.isTouched = false;
        this.cursorDate = new Date();
        this.iLoveJSX = false;
        this.isPickerVisible = false;
        this.pickerJustOpened = false;
    }
    watchInputValue() {
        let re = /(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;
        if (this.value.match(re) == null) {
            // User typed in an invalid value.
            this.isValid = false;
        }
        else {
            // User typed in a valid value.
            this.isValid = (this.value == '' && this.required && this.isTouched) ? false : true; // Empty fields are valid by default, invalid if required.
            this.cursorDate = (this.value == '') ? new Date() : new Date(this.value);
        }
        if (this.isTouched) {
            this.readyToVerifySlow.emit();
        }
    }
    clickHandler(ev) {
        let target = ev.target;
        if (target.classList.contains('yeti-input')) {
            this.isPickerVisible = false;
        }
    }
    handleDefocusingClick() {
        if (this.isPickerVisible && !this.pickerJustOpened) {
            this.isPickerVisible = false;
            this.isTouched = true;
            this.watchInputValue();
        }
        this.pickerJustOpened = false;
    }
    listenForTabOut(ev) {
        if (ev.key == "Tab" &&
            ev.target.classList.contains('yeti-date-calendar-day') &&
            !ev.shiftKey) {
            // User hit tab while focused on the calendar, which moves focus to the next focusable thing after the control.
            this.isPickerVisible = false;
            this.isTouched = true;
            this.watchInputValue();
        }
        else if (ev.key == "Tab" &&
            ev.target.classList.contains('yeti-date-picker-action-button-first') &&
            ev.shiftKey) {
            // User hit shift+tab while focused on the first navigation button, which moves focus out of the picker.
            this.isPickerVisible = false;
            this.isTouched = true;
        }
        else if (ev.key == "Tab" &&
            ev.target.classList.contains('yeti-date-button') &&
            !this.isPickerVisible &&
            !ev.shiftKey) {
            // User normal-tabbed from the icon while the picker was closed, which moves focus out of the component entirely.
            this.isTouched = true;
            this.watchInputValue();
        }
    }
    handleFieldBlur(ev) {
        let hyphensToSlashes = ev.target.value.replaceAll("-", "/");
        this.isTouched = true;
        this.value = hyphensToSlashes;
    }
    handlePotentialEnterKeyPress(ev) {
        // If the user hits enter while in the input field, then want to 
        if (ev.key == "Enter") {
            let hyphensToSlashes = ev.target.value.replaceAll("-", "/");
            this.isTouched = true;
            this.value = hyphensToSlashes;
        }
    }
    handleIconClick(ev) {
        this.isTouched = true;
        this.isPickerVisible = !this.isPickerVisible;
        this.pickerJustOpened = true;
        ev.preventDefault();
    }
    handleSelectDate(e) {
        let td = e.target;
        let dayNumber = parseInt(td.attributes.getNamedItem("data-date").value);
        let justSelectedDate = this.cursorDate;
        let icon = this.el.querySelector('.yeti-date-button');
        e.preventDefault();
        justSelectedDate.setDate(dayNumber);
        this.value = this.convertDateToInputValueString(justSelectedDate);
        this.isPickerVisible = false;
        if (icon) {
            // Return focus to the calendar icon
            icon.focus();
        }
    }
    handleCalendarKeydown(ev) {
        // For navigating the calendar via the keyboard
        switch (ev.key) {
            case "Home": {
                ev.preventDefault();
                this.cursorDate.setDate(this.getFirstDayOfWeek(this.cursorDate));
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "End": {
                ev.preventDefault();
                this.cursorDate.setDate(this.getLastDayOfWeek(this.cursorDate));
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "PageUp": {
                ev.preventDefault();
                let targetDate;
                if (ev.shiftKey) {
                    // Previous Year
                    targetDate = new Date(this.cursorDate.getFullYear() - 1, this.cursorDate.getMonth(), this.cursorDate.getDate()); // Previous month
                }
                else {
                    // Previous Month
                    targetDate = new Date(this.cursorDate.getFullYear(), this.cursorDate.getMonth() - 1, this.cursorDate.getDate());
                }
                this.cursorDate = this.getAnalogousDateInTargetMonthsGrid(this.cursorDate, targetDate);
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "PageDown": {
                ev.preventDefault();
                let targetDate;
                if (ev.shiftKey) {
                    // Previous Year
                    targetDate = new Date(this.cursorDate.getFullYear() + 1, this.cursorDate.getMonth(), this.cursorDate.getDate());
                }
                else {
                    // Previous Month
                    targetDate = new Date(this.cursorDate.getFullYear(), this.cursorDate.getMonth() + 1, this.cursorDate.getDate());
                }
                this.cursorDate = this.getAnalogousDateInTargetMonthsGrid(this.cursorDate, targetDate);
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "ArrowLeft": {
                ev.preventDefault();
                this.cursorDate.setDate(this.cursorDate.getDate() - 1);
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "ArrowRight": {
                ev.preventDefault();
                this.cursorDate.setDate(this.cursorDate.getDate() + 1);
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "ArrowUp": {
                ev.preventDefault();
                this.cursorDate.setDate(this.cursorDate.getDate() - 7);
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "ArrowDown": {
                ev.preventDefault();
                this.cursorDate.setDate(this.cursorDate.getDate() + 7);
                this.iLoveJSX = !this.iLoveJSX;
                break;
            }
            case "Escape": {
                let icon = this.el.querySelector('.yeti-date-button');
                this.isPickerVisible = false;
                if (icon) {
                    // Return focus to the calendar icon
                    icon.focus();
                }
                break;
            }
            case "Tab": {
                // For some reason (maybe a Stencil bug), this only fires when tabbing *into* the td, which is not what we want.
                // We handle this in listenForTabOut instead of here.
                break;
            }
            case " ":
            case "Enter": {
                this.handleSelectDate(ev);
                break;
            }
        }
    }
    getFirstDayOfWeek(date) {
        return (date.getDate() - date.getDay());
    }
    getLastDayOfWeek(date) {
        return (date.getDate() + 6 - date.getDay());
    }
    getAnalogousDateInTargetMonthsGrid(currentDate, targetDate) {
        /*
            This is a weird one, thank the W3 for this. Say the user's looking at the monthly grid of days in the picker and wants to
            see the grid for the previous month. This function will try to select the analogous grid spot in that month (i.e. same row
            and column). If that grid spot doesn't exist, then we need to pick the closest week, and match the column spot in that week.
        */
        let firstOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let dayIndexForFirstOfCurrentMonth = firstOfCurrentMonth.getDay();
        let rowIndex = Math.floor((dayIndexForFirstOfCurrentMonth + currentDate.getDate()) / 7);
        let colIndex = currentDate.getDay();
        let returnDate;
        let proposedDate;
        let daysInTargetMonth;
        targetDate.setDate(1);
        daysInTargetMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        proposedDate = (rowIndex * 7) + colIndex + 1 - targetDate.getDay();
        proposedDate += (proposedDate < 1) ? 7 : 0; // Make sure the proposed date isn't on a leading empty grid cell
        while (proposedDate > daysInTargetMonth) { // Make sure the proposed date isn't on a trailing empty grid cell
            proposedDate -= 7;
        }
        // Now see if the previous month has a date in the grid square at rowIndex + colIndex;
        returnDate = new Date(targetDate);
        returnDate.setDate(proposedDate);
        return returnDate;
    }
    getSelectedDateInThisMonth(month) {
        if (this.value == "") {
            return -1;
        }
        else {
            let properSelectedDate = new Date(this.value);
            if (properSelectedDate.getFullYear() == month.getFullYear() &&
                properSelectedDate.getMonth() == month.getMonth()) {
                return properSelectedDate.getDate();
            }
            else {
                return -1;
            }
        }
    }
    getTodayInThisMonth(month) {
        let today = new Date();
        if (today.getFullYear() == month.getFullYear() &&
            today.getMonth() == month.getMonth()) {
            return today.getDate();
        }
        else {
            return -1;
        }
    }
    cursorDatePreviousYear() {
        this.cursorDate.setFullYear(this.cursorDate.getFullYear() - 1);
        this.keepFocusOnButton = true;
        this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
    }
    cursorDateNextYear() {
        this.cursorDate.setFullYear(this.cursorDate.getFullYear() + 1);
        this.keepFocusOnButton = true;
        this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
    }
    cursorDatePreviousMonth() {
        this.cursorDate.setMonth(this.cursorDate.getMonth() - 1);
        this.keepFocusOnButton = true;
        this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
    }
    cursorDateNextMonth() {
        this.cursorDate.setMonth(this.cursorDate.getMonth() + 1);
        this.keepFocusOnButton = true;
        this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
    }
    convertDateToInputValueString(date) {
        return new Intl.DateTimeFormat('en-US', {
            "month": "2-digit",
            "day": "2-digit",
            "year": "numeric"
        }).format(date);
    }
    getIconButtonLabel() {
        return (this.value == "") ? "Choose date" : `Change date, ${this.value}`;
    }
    renderMonthTBody(day) {
        let firstOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
        let lastMonthDaysVisible = firstOfMonth.getDay();
        let isLeapYear = new Date(day.getFullYear(), 1, 29).getMonth() == 1;
        let daysInMonth = 0; // To be set later.
        let tbody = [];
        let selectedDateInThisMonth = this.getSelectedDateInThisMonth(day);
        let todayInThisMonth = this.getTodayInThisMonth(day);
        // Set daysInMonth
        switch (day.getMonth()) {
            case 3:
            case 5:
            case 8:
            case 10:
                daysInMonth = 30;
                break;
            case 1:
                daysInMonth = isLeapYear ? 29 : 28;
                break;
            default:
                daysInMonth = 31;
        }
        // Add the JSX
        for (let weekOfMonth = 0, gridSlot = 0, dayOfMonth = 1; weekOfMonth < 6; weekOfMonth++) {
            let daysInThisWeek = [];
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++, gridSlot++) {
                if (gridSlot < lastMonthDaysVisible) {
                    // This is an empty slot (this day was in the last month)
                    daysInThisWeek.push(h("td", { class: "yeti-date-calendar-day yeti-date-calendar-day-not_this_month", tabindex: "-1" }));
                }
                else {
                    // This is either a valid date or a trailing empty slot (day in next month)
                    if ((gridSlot - lastMonthDaysVisible) >= daysInMonth) {
                        // This is an empty slot (this day was in the next month)
                        daysInThisWeek.push(h("td", { class: "yeti-date-calendar-day yeti-date-calendar-day-not_this_month", tabindex: "-1" }));
                    }
                    else {
                        // This is a valid date.
                        let css = "yeti-date-calendar-day";
                        let tabIndex = (this.cursorDate.getDate() == dayOfMonth) ? 0 : -1;
                        css += (todayInThisMonth == dayOfMonth && !(selectedDateInThisMonth == dayOfMonth)) ? ' yeti-date-calendar-day-today' : '';
                        css += (selectedDateInThisMonth == dayOfMonth) ? ' yeti-date-calendar-day-selected' : '';
                        daysInThisWeek.push(h("td", { "data-date": dayOfMonth, class: css, tabindex: tabIndex, onClick: (e) => {
                                this.handleSelectDate(e);
                            } }, dayOfMonth));
                    }
                    dayOfMonth++;
                }
            }
            tbody.push(h("tr", { "data-week-of-month": weekOfMonth }, daysInThisWeek));
        }
        return tbody;
    }
    renderInput(cssClasses = 'yeti-input yeti-date-field') {
        return h("input", Object.assign({ type: "text", class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onBlur: (ev) => this.handleFieldBlur(ev), onKeyPress: (ev) => this.handlePotentialEnterKeyPress(ev), "aria-invalid": !this.isValid, placeholder: "mm/dd/yyyy", autocomplete: "off" }, ((this.labelledBy != "") ? { "aria-labelledBy": this.labelledBy } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {})));
    }
    componentWillLoad() {
        // Set up ids
        let componentId = this.el.getAttribute("id");
        if (!componentId || componentId == "") {
            componentId = utils.generateUniqueId();
            this.el.setAttribute("id", componentId);
        }
        this.inputId = (this.inputId != "") ? this.inputId : `${componentId}_input`;
        this.inputName = this.inputId;
        this.pickerHeading = `${componentId}_pickerHeading`;
        this.watchInputValue();
    }
    render() {
        let cssClasses = 'yeti-input yeti-date-field';
        if (this.inputClass != '') {
            cssClasses += ' ' + this.inputClass;
        }
        if (this.isValid == false) {
            cssClasses += ' yeti-input__error';
        }
        return (h("div", { key: 'fbecfd5eb7d9eac00bfcf38fab9a673ddadb18e0', class: "yeti-date" }, (this.showErrorTooltip && this.isValid == false) ?
            h("yeti-tooltip", { text: this.tooltipText, position: "below", forceOpen: true }, this.renderInput(cssClasses))
            :
                this.renderInput(cssClasses), h("button", { key: '65b4563d86dcd114dc2edaed1f1c862e75d74306', class: "yeti-date-button", "aria-label": this.getIconButtonLabel(), onClick: (ev) => { this.handleIconClick(ev); } }, h("span", { key: '41ce3de4e9d3a5c3135aab504511dd376f1fdf9c', class: "material-icons yeti-date-button-icon", "aria-hidden": "true" }, "calendar_today")), h("div", { key: '91e1b9b4b269acd0ea879a6a3122be8b0a844d33', class: (this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker" }, h("div", { key: '027cc12151d2f703cecfed4a4a0470328c5e98ce', class: "yeti-date-picker-header" }, h("h2", { key: '9c4d27d5dea39178d348b2f5a8a3489669dbdaf0', class: "yeti-date-picker-heading", "aria-live": "polite", id: this.pickerHeading }, utils.getMonthName(this.cursorDate), " ", this.cursorDate.getFullYear()), h("ul", { key: '6ba0212ce7d2fb836fcf47cd42c7b341c7200f6a', class: "yeti-date-picker-actions" }, h("li", { key: 'd88dc120037929b44054d212df20c2a441230435', class: "yeti-date-picker-action" }, h("button", { key: '5482a871027be2af034b01c8db8715685a661538', class: "yeti-date-picker-action-button yeti-date-picker-action-button-first", onClick: (ev) => {
                this.cursorDatePreviousYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '9c06c26711a6d8fcbf945b146411e085712cd560', class: "yeti-a11y-hidden" }, "Previous year"), h("span", { key: 'fb17735a4b523bd1e1090d78544afda543d01373', class: "material-icons", "aria-hidden": "true", title: "Previous year" }, "keyboard_double_arrow_left"))), h("li", { key: '07f221c2d29d9111b5d55f9887565fedfe6fda00', class: "yeti-date-picker-action" }, h("button", { key: 'ebbcedcc32c602949a0669c9a80cfc3df41a3d5c', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDatePreviousMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '13aecfa7837b25b18025819389d6a8834091b4c5', class: "yeti-a11y-hidden" }, "Previous month"), h("span", { key: '4476503aeed29a99b4ddc43c52fc6cfbade03379', class: "material-icons", "aria-hidden": "true", title: "Previous month" }, "keyboard_arrow_left"))), h("li", { key: '5c2d5818c9612149f3ec500404ec41c886b0987d', class: "yeti-date-picker-action" }, h("button", { key: '074ad5b51d3e3bd15447f570ece5a705deddb0e8', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: 'f06996c4a4154cdffa01fa474b7e302492894766', class: "yeti-a11y-hidden" }, "Next month"), h("span", { key: 'f7d5da9e7c51da59ac4979b9db8abb7d76ae099c', class: "material-icons", "aria-hidden": "true", title: "Next month" }, "keyboard_arrow_right"))), h("li", { key: '8487f5ce07bae0591d968d066af3e6b00e5735f0', class: "yeti-date-picker-action" }, h("button", { key: '808e509a6afdda631c65ba0ab005483c3bfdf268', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '7039b4a31be5070ba03565a6551b0a9d9bc8c460', class: "yeti-a11y-hidden" }, "Next year"), h("span", { key: 'd6d0bf77ab0e6d7ed907c55d93e093599b2d8bec', class: "material-icons", "aria-hidden": "true", title: "Next year" }, "keyboard_double_arrow_right"))))), h("table", { key: '4150c0719fab91f1270c31f32c2e48953dafb3d4', class: "yeti-date-calendar", role: "grid", "aria-labeledby": this.pickerHeading, onKeyDown: (ev) => { this.handleCalendarKeydown(ev); } }, h("thead", { key: 'f5f112597c92362ad8470b46b9581800c797a462' }, h("tr", { key: '3defa30255a45bd6589407e4225d40ec29cc34c4' }, h("th", { key: '17ab07a328423621857680cc1abc95dbb97edb76', class: "yeti-date-calendar-heading", abbr: "Sunday" }, "Su"), h("th", { key: 'bd199b7f060660729db4110d47b90bc157f0c005', class: "yeti-date-calendar-heading", abbr: "Monday" }, "Mo"), h("th", { key: 'ebb7c80f148524632b82068bb24427a7fc47d004', class: "yeti-date-calendar-heading", abbr: "Tuesday" }, "Tu"), h("th", { key: '9130cdd5dee8b092dfd49e10f88a494451f0da15', class: "yeti-date-calendar-heading", abbr: "Wednesday" }, "We"), h("th", { key: 'c9875002b963c0f6812e5610a0d80c2f3ae12abe', class: "yeti-date-calendar-heading", abbr: "Thursday" }, "Th"), h("th", { key: 'e9fa24db02ed9b488566db76d107b29b5e0a02d0', class: "yeti-date-calendar-heading", abbr: "Friday" }, "Fr"), h("th", { key: 'b852cd51adcfd3b9cf2fc86be49da60ebd239df7', class: "yeti-date-calendar-heading", abbr: "Saturday" }, "Sa"))), this.renderMonthTBody(this.cursorDate)))));
    }
    componentDidRender() {
        // Set the focus on either the selected date or today's date, in that order of preference.
        if (this.isPickerVisible) {
            let td = this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');
            let picker = this.el.querySelector('.yeti-date-picker');
            if (td && !this.keepFocusOnButton) {
                td.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
                td.focus();
            }
            if (this.keepFocusOnButton) {
                this.keepFocusOnButton = false;
            }
            picker.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["watchInputValue"]
    }; }
};

export { YetiDatePicker as yeti_date_picker };

//# sourceMappingURL=yeti-date-picker.entry.js.map