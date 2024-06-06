import { r as registerInstance, a as createEvent, h, g as getElement } from './index-e3c92518.js';
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
        return (h("div", { key: 'b474dc5635ea9c09523460b20547930829ce349c', class: "yeti-date" }, (this.showErrorTooltip && this.isValid == false) ?
            h("yeti-tooltip", { text: this.tooltipText, position: "below", forceOpen: true }, this.renderInput(cssClasses))
            :
                this.renderInput(cssClasses), h("button", { key: 'abde79dffd60ecc63b4ade592d6b45df2def9aa4', class: "yeti-date-button", "aria-label": this.getIconButtonLabel(), onClick: (ev) => { this.handleIconClick(ev); } }, h("span", { key: '09414db763a2b13c4b4cfcd817c471702039a0a3', class: "material-icons yeti-date-button-icon", "aria-hidden": "true" }, "calendar_today")), h("div", { key: 'fe79eb4aa17b2ae08d2eb16f11c3fa93e928ed82', class: (this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker" }, h("div", { key: '49312a30d3c182586a990acc4bd9122130f535f5', class: "yeti-date-picker-header" }, h("h2", { key: 'e32df0401d4857b1758732ab9472acd6a326f3b0', class: "yeti-date-picker-heading", "aria-live": "polite", id: this.pickerHeading }, utils.getMonthName(this.cursorDate), " ", this.cursorDate.getFullYear()), h("ul", { key: 'ce3987b9f2b9c2b4d5b25e33fa506a2cc1e4bb42', class: "yeti-date-picker-actions" }, h("li", { key: '11e509fc0b776cae0edac7d300da9a6ae4003fb6', class: "yeti-date-picker-action" }, h("button", { key: '8b5542e44b68210d6bd9a418e9fbba7c414c125b', class: "yeti-date-picker-action-button yeti-date-picker-action-button-first", onClick: (ev) => {
                this.cursorDatePreviousYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '85fd0eacb0058d221f4b64d61716223eff4fac0a', class: "yeti-a11y-hidden" }, "Previous year"), h("span", { key: '858210c190e39f31b22be0de858f358112b95468', class: "material-icons", "aria-hidden": "true", title: "Previous year" }, "keyboard_double_arrow_left"))), h("li", { key: 'baac7b02f80d8df21b714be9c4f422be5390112a', class: "yeti-date-picker-action" }, h("button", { key: 'ab7018622ecab3cec6007da8503c25880ab1c42a', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDatePreviousMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '1f63e07407e77581b1a9f4fb9094bcd28b4707f5', class: "yeti-a11y-hidden" }, "Previous month"), h("span", { key: '9a73fc570e607344ef76e354aa13b63fe933179a', class: "material-icons", "aria-hidden": "true", title: "Previous month" }, "keyboard_arrow_left"))), h("li", { key: '5bfb05494931b4dd8bc40762e7421722385425ca', class: "yeti-date-picker-action" }, h("button", { key: 'f01fbcde6af44cf8d272d05b55a0b4e38d0e6376', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '1460abc7779cf8bfb60c6184a17c91d1e0744bfa', class: "yeti-a11y-hidden" }, "Next month"), h("span", { key: '113371b7256a51908a5c78906f438da08de0599c', class: "material-icons", "aria-hidden": "true", title: "Next month" }, "keyboard_arrow_right"))), h("li", { key: '651e570418e51c3cd921e562d1f777587cf905de', class: "yeti-date-picker-action" }, h("button", { key: 'a6aacc09420acf078842c592fec26d93af009d3e', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '3141b926786c53b5b7840f3e023e0ccb55562d0e', class: "yeti-a11y-hidden" }, "Next year"), h("span", { key: 'f983a8191c78af399270fa383e64ebba08c74a0d', class: "material-icons", "aria-hidden": "true", title: "Next year" }, "keyboard_double_arrow_right"))))), h("table", { key: '0c62a214f18824f1787e0ad3483a0e1b16362113', class: "yeti-date-calendar", role: "grid", "aria-labeledby": this.pickerHeading, onKeyDown: (ev) => { this.handleCalendarKeydown(ev); } }, h("thead", { key: '4f73745c848d06ca28e790ac6bdb2273c4207d9b' }, h("tr", { key: 'cd29d66c056c02a41729acc69008db1e3f86bef8' }, h("th", { key: '04802dc114737392651736c05ee89de1015bfb6d', class: "yeti-date-calendar-heading", abbr: "Sunday" }, "Su"), h("th", { key: '6e27d9a8b5e67303ddc0241f0feb6b1364af3c69', class: "yeti-date-calendar-heading", abbr: "Monday" }, "Mo"), h("th", { key: '342624cb3859582fbf1dd6d8d8947babd5d89eea', class: "yeti-date-calendar-heading", abbr: "Tuesday" }, "Tu"), h("th", { key: '5df732f5a6181688dcdb86a741ccb74f896bc0bf', class: "yeti-date-calendar-heading", abbr: "Wednesday" }, "We"), h("th", { key: '7d76f4492c5d9d6ad4ed6fad9745fb4c16ee42ce', class: "yeti-date-calendar-heading", abbr: "Thursday" }, "Th"), h("th", { key: 'fab8804bb557a3b427af0bfe7ca5dac16519ebd7', class: "yeti-date-calendar-heading", abbr: "Friday" }, "Fr"), h("th", { key: '68413bf50d1b8509015d6d1f8f839f5f1fa50018', class: "yeti-date-calendar-heading", abbr: "Saturday" }, "Sa"))), this.renderMonthTBody(this.cursorDate)))));
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