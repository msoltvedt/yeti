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
        return (h("div", { key: 'b81a44b226aae058fc8d17cf11ffa0a58791842e', class: "yeti-date" }, (this.showErrorTooltip && this.isValid == false) ?
            h("yeti-tooltip", { text: this.tooltipText, position: "below", forceOpen: true }, this.renderInput(cssClasses))
            :
                this.renderInput(cssClasses), h("button", { key: '6df85d23ca26dee0705e3db4a300f7fc5f45bbbc', class: "yeti-date-button", "aria-label": this.getIconButtonLabel(), onClick: (ev) => { this.handleIconClick(ev); } }, h("span", { key: '575129c83947f62e85bc46f8b45e2bed897d2302', class: "material-icons yeti-date-button-icon", "aria-hidden": "true" }, "calendar_today")), h("div", { key: '5ff57b71517ede553f386a385ba26ee6a238efa2', class: (this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker" }, h("div", { key: 'd6ce8a8a99aec1471d84907b46d347a1d6c4b254', class: "yeti-date-picker-header" }, h("h2", { key: 'b78ca0dbbfe0ece4454424f646b9ad57c6b35688', class: "yeti-date-picker-heading", "aria-live": "polite", id: this.pickerHeading }, utils.getMonthName(this.cursorDate), " ", this.cursorDate.getFullYear()), h("ul", { key: 'e60aeb791573424c031a2b4ea86ba07308e88be2', class: "yeti-date-picker-actions" }, h("li", { key: '71d65b0246653310fae70e0c6a3ac6159f7aea85', class: "yeti-date-picker-action" }, h("button", { key: '32d5afa9fb0ef78a9cc9bc91e1ac18eed4d8b2ca', class: "yeti-date-picker-action-button yeti-date-picker-action-button-first", onClick: (ev) => {
                this.cursorDatePreviousYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: 'cd782cb711be4ab708b5d51d5bb520373eeec689', class: "yeti-a11y-hidden" }, "Previous year"), h("span", { key: 'e6e09b158082a6ac6c2f2f86a70e5835799b0360', class: "material-icons", "aria-hidden": "true", title: "Previous year" }, "keyboard_double_arrow_left"))), h("li", { key: '995c9b619f041827033e3ff8847cd650af334c28', class: "yeti-date-picker-action" }, h("button", { key: '3161c45020d1b66be70d32e2e5da46eda04be64e', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDatePreviousMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '897dee753fc1f72a44c15f66af2417e75661cd48', class: "yeti-a11y-hidden" }, "Previous month"), h("span", { key: 'f3676c267fa3490c3697bc235a3e226a75222c50', class: "material-icons", "aria-hidden": "true", title: "Previous month" }, "keyboard_arrow_left"))), h("li", { key: '8f9fad2c7c827b56d499596d3cea835cdaf792f8', class: "yeti-date-picker-action" }, h("button", { key: 'baac69ffa0770f022c4803d793846064fd6035bb', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '1c3e42400d73e7fee30c68798635eb9579c114b7', class: "yeti-a11y-hidden" }, "Next month"), h("span", { key: '6e17dee55f9f20d6adaf89336338ba0c54f80391', class: "material-icons", "aria-hidden": "true", title: "Next month" }, "keyboard_arrow_right"))), h("li", { key: 'ffe82b199a1a775db3781fe8b17c47002bf31206', class: "yeti-date-picker-action" }, h("button", { key: 'e78348bf8f7be530a08a1f0fee21b92c6332b7d7', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '193f38e6d5bd83fdfb0e177621c360b7c186c132', class: "yeti-a11y-hidden" }, "Next year"), h("span", { key: '33f8104246c27f3f712b711d3221b650124eac9e', class: "material-icons", "aria-hidden": "true", title: "Next year" }, "keyboard_double_arrow_right"))))), h("table", { key: '44e710fd1d44e72bfa07666ad7d1300512db73b3', class: "yeti-date-calendar", role: "grid", "aria-labeledby": this.pickerHeading, onKeyDown: (ev) => { this.handleCalendarKeydown(ev); } }, h("thead", { key: 'a1c963bd3210ae8f9f3e5b8fd900f30c10033c59' }, h("tr", { key: 'a2afa54b55928aaa0c6a569b9cf213ada50a2e96' }, h("th", { key: '1b709c9e38ca5185aba961027ea5250567cbb18c', class: "yeti-date-calendar-heading", abbr: "Sunday" }, "Su"), h("th", { key: '7fd174543e4f36d5a945432d09d3c0696b1311d4', class: "yeti-date-calendar-heading", abbr: "Monday" }, "Mo"), h("th", { key: '01f78eebdff38f2c3f5329dcef18b00c7568b864', class: "yeti-date-calendar-heading", abbr: "Tuesday" }, "Tu"), h("th", { key: 'cf23d7cdce56e09e5785375839a3e690798fab60', class: "yeti-date-calendar-heading", abbr: "Wednesday" }, "We"), h("th", { key: '8a7c1ebcce740d24b3d3d7ee878731218c64407a', class: "yeti-date-calendar-heading", abbr: "Thursday" }, "Th"), h("th", { key: 'bbcf121ea16a159c74f4c0db45a54ef129c0ce65', class: "yeti-date-calendar-heading", abbr: "Friday" }, "Fr"), h("th", { key: 'e09b673a0fd714b299de0e2640f49f7c8542fec9', class: "yeti-date-calendar-heading", abbr: "Saturday" }, "Sa"))), this.renderMonthTBody(this.cursorDate)))));
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