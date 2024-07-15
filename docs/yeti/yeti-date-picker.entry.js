import { r as registerInstance, a as createEvent, h, g as getElement } from './index-a229effc.js';
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
        return (h("div", { key: '8f6f22ca87b1cc41c8e0396c5f184da1205e4af0', class: "yeti-date" }, (this.showErrorTooltip && this.isValid == false) ?
            h("yeti-tooltip", { text: this.tooltipText, position: "below", forceOpen: true }, this.renderInput(cssClasses))
            :
                this.renderInput(cssClasses), h("button", { key: 'ed36acd1aa1f26bffc9552492773cb32bd225f8a', class: "yeti-date-button", "aria-label": this.getIconButtonLabel(), onClick: (ev) => { this.handleIconClick(ev); } }, h("span", { key: 'f3db894346eb4c617d4117598b5feb6ce9b2f2e5', class: "material-icons yeti-date-button-icon", "aria-hidden": "true" }, "calendar_today")), h("div", { key: '6ec07541ffa1a0ebfb8daae5e75b5430208cd1bb', class: (this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker" }, h("div", { key: '3ad7e3131e91df744804aa9cf1b05073ca6fd230', class: "yeti-date-picker-header" }, h("h2", { key: 'bee2551caadf4518014d350a73f161ef7cfc6673', class: "yeti-date-picker-heading", "aria-live": "polite", id: this.pickerHeading }, utils.getMonthName(this.cursorDate), " ", this.cursorDate.getFullYear()), h("ul", { key: 'e3222dc52d9bf959b43615f79c703eba9df83b80', class: "yeti-date-picker-actions" }, h("li", { key: 'ac192d72c8c15cc52208beef8dfd9d2ce5a02ee4', class: "yeti-date-picker-action" }, h("button", { key: '02f38ade0ab5ae11a6b0a6020e07128828b930e4', class: "yeti-date-picker-action-button yeti-date-picker-action-button-first", onClick: (ev) => {
                this.cursorDatePreviousYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '10de068d3c304cca1167109c1dc5fdd79d5f0d27', class: "yeti-a11y-hidden" }, "Previous year"), h("span", { key: '66c61a89808442bc2ca58446a0bada9b52383868', class: "material-icons", "aria-hidden": "true", title: "Previous year" }, "keyboard_double_arrow_left"))), h("li", { key: '22202131544b0b1a35de9adb8d19ca951cd6cc44', class: "yeti-date-picker-action" }, h("button", { key: '9df124c05e34f6a49a382ae1281c2e2a083df93e', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDatePreviousMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '07be60e058315a4600ee0c0b2fcecd3f11bbb0d5', class: "yeti-a11y-hidden" }, "Previous month"), h("span", { key: '07a2475931d98d4ae056a890b564369dd5b8ddeb', class: "material-icons", "aria-hidden": "true", title: "Previous month" }, "keyboard_arrow_left"))), h("li", { key: 'e9027aaa4e67901778a04aab6639d062901cae3b', class: "yeti-date-picker-action" }, h("button", { key: 'b3a0837889bb634383801d1adee0bf7407529719', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '9e731d6c982caddbb37f69dc25930118de0b688a', class: "yeti-a11y-hidden" }, "Next month"), h("span", { key: '17ab4f79ec0610feef8b33f942932d36f0e1b7c2', class: "material-icons", "aria-hidden": "true", title: "Next month" }, "keyboard_arrow_right"))), h("li", { key: 'f23599ec45b16befd593b3907ea4d4164d73e988', class: "yeti-date-picker-action" }, h("button", { key: '5fd0de6c7f9400cf3c1f6540b6a7236a688c3f5a', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '648d20d69e246a9725ce5eab674f5cbbac06eea4', class: "yeti-a11y-hidden" }, "Next year"), h("span", { key: '6270bbeaee0be4a902abb9a2690b6c1de529b2cc', class: "material-icons", "aria-hidden": "true", title: "Next year" }, "keyboard_double_arrow_right"))))), h("table", { key: '1145b8ad1cf7b1117c0dd27d4bcc639a82c915b9', class: "yeti-date-calendar", role: "grid", "aria-labeledby": this.pickerHeading, onKeyDown: (ev) => { this.handleCalendarKeydown(ev); } }, h("thead", { key: '320161c9c72817fe16668cef5568214a0c63fe2b' }, h("tr", { key: '3b10171565b76ccc7cdcfd14fe3bc83937325e86' }, h("th", { key: '4f121c97c6b38deb26d76430d6d41339e912dabf', class: "yeti-date-calendar-heading", abbr: "Sunday" }, "Su"), h("th", { key: '086627305f6e3c5c08f35b309785f1906a478286', class: "yeti-date-calendar-heading", abbr: "Monday" }, "Mo"), h("th", { key: '84d85adaad245aae58ba1c3e31290bcb4d7837ac', class: "yeti-date-calendar-heading", abbr: "Tuesday" }, "Tu"), h("th", { key: 'cc8f8a9f804a05382db0d121ad4ef4003d6aaefd', class: "yeti-date-calendar-heading", abbr: "Wednesday" }, "We"), h("th", { key: '7f147543c196441a2c739e6fe7f0caa447e6ad19', class: "yeti-date-calendar-heading", abbr: "Thursday" }, "Th"), h("th", { key: '248c7cde900642827b85d168d31976b942437826', class: "yeti-date-calendar-heading", abbr: "Friday" }, "Fr"), h("th", { key: '7b5901b4cebd64022a62122bd2b725804e01a68a', class: "yeti-date-calendar-heading", abbr: "Saturday" }, "Sa"))), this.renderMonthTBody(this.cursorDate)))));
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