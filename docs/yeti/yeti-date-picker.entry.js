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
        return (h("div", { key: '62a81710236c9ab3b32907099203eaefb86c2dc8', class: "yeti-date" }, (this.showErrorTooltip && this.isValid == false) ?
            h("yeti-tooltip", { text: this.tooltipText, position: "below", forceOpen: true }, this.renderInput(cssClasses))
            :
                this.renderInput(cssClasses), h("button", { key: '6a357fb1b835cdd3f53cd548ea6f838b4255834c', class: "yeti-date-button", "aria-label": this.getIconButtonLabel(), onClick: (ev) => { this.handleIconClick(ev); } }, h("span", { key: '8834a8da9d15ccbdf4a4d734474f2eaf7d499de9', class: "material-icons yeti-date-button-icon", "aria-hidden": "true" }, "calendar_today")), h("div", { key: 'c6e81767fd2b4d58101d93762579a8c371e537e5', class: (this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker" }, h("div", { key: '21e6fa8ec135d984520fddd76eccf583a04eb81c', class: "yeti-date-picker-header" }, h("h2", { key: 'cef76683b47ddf20e81fbfb349ed953a2859f08b', class: "yeti-date-picker-heading", "aria-live": "polite", id: this.pickerHeading }, utils.getMonthName(this.cursorDate), " ", this.cursorDate.getFullYear()), h("ul", { key: 'a70f160669e0019ba91a5a83853a68dfaa99dabd', class: "yeti-date-picker-actions" }, h("li", { key: '262b4c0b865ee5db792e78f0e9bbf672dc8a8b1a', class: "yeti-date-picker-action" }, h("button", { key: '551e64baa0a9efbd84e42996eeba553bbfec6b3d', class: "yeti-date-picker-action-button yeti-date-picker-action-button-first", onClick: (ev) => {
                this.cursorDatePreviousYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: 'd494b1e2a36ac457bf87ad0c1f998533857a94dc', class: "yeti-a11y-hidden" }, "Previous year"), h("span", { key: '23b1edcfa4e0a3b930a5035e9b7aaabf4a29c9e8', class: "material-icons", "aria-hidden": "true", title: "Previous year" }, "keyboard_double_arrow_left"))), h("li", { key: '8a692191bb1dd75ba8fb33005c9d5a72cb50b5ca', class: "yeti-date-picker-action" }, h("button", { key: 'aedcb83d82876bd0caa0f1d9cb88f54490bfa23f', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDatePreviousMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: 'e3cc533db4b3477459be97993eddb68e980a0125', class: "yeti-a11y-hidden" }, "Previous month"), h("span", { key: 'aedb5e3b73570c986f027ef36013f14d1722ec97', class: "material-icons", "aria-hidden": "true", title: "Previous month" }, "keyboard_arrow_left"))), h("li", { key: '5b500e8c42b2936e25f9418ebe960046f739c447', class: "yeti-date-picker-action" }, h("button", { key: '14d75fb0984f1b74dd51a9ac4d589ccb2b28ea98', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextMonth();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '08492844d4c7722ed5a714162021baa545bde3b5', class: "yeti-a11y-hidden" }, "Next month"), h("span", { key: 'a0a449a1572528e6a9a076d7d3f9ad45d5f4af8f', class: "material-icons", "aria-hidden": "true", title: "Next month" }, "keyboard_arrow_right"))), h("li", { key: '575ec2bd44c3e66d3aa97438e24da775a47e636e', class: "yeti-date-picker-action" }, h("button", { key: '39c5e229fa162912339d1554fe5a5bb00bba5c58', class: "yeti-date-picker-action-button", onClick: (ev) => {
                this.cursorDateNextYear();
                ev.preventDefault();
                ev.stopPropagation();
            } }, h("span", { key: '51881b2d76d55b16adc2398f735d5fa01f820a60', class: "yeti-a11y-hidden" }, "Next year"), h("span", { key: 'dd8159b5311ce3bd7a2b3deab866fb47a7074e42', class: "material-icons", "aria-hidden": "true", title: "Next year" }, "keyboard_double_arrow_right"))))), h("table", { key: '8a62cb9c5d51317d102ed60c9833fd33b0e12cb2', class: "yeti-date-calendar", role: "grid", "aria-labeledby": this.pickerHeading, onKeyDown: (ev) => { this.handleCalendarKeydown(ev); } }, h("thead", { key: '046f2f1f4cedb996217ed5fe0423c9fed2427994' }, h("tr", { key: 'fd69dace113a2bf27b5074f29dcd4310886eaa8b' }, h("th", { key: '1bfcebd35d39341cdbbfe03a693d110aac2422e8', class: "yeti-date-calendar-heading", abbr: "Sunday" }, "Su"), h("th", { key: 'cf42de454d5660b769c1049fe113bab6cfcdbc7c', class: "yeti-date-calendar-heading", abbr: "Monday" }, "Mo"), h("th", { key: '931f7f0855851727b8927d82982139e5ad470312', class: "yeti-date-calendar-heading", abbr: "Tuesday" }, "Tu"), h("th", { key: '911ae9006a440eea219d3dff2a320b9ce79387ff', class: "yeti-date-calendar-heading", abbr: "Wednesday" }, "We"), h("th", { key: 'b78ac249fc99a8d7dcf9fc6f93f18491dc4ec0e4', class: "yeti-date-calendar-heading", abbr: "Thursday" }, "Th"), h("th", { key: 'bfaf5bc16182d88bb563b55b573fd9e20714e0f3', class: "yeti-date-calendar-heading", abbr: "Friday" }, "Fr"), h("th", { key: 'b26967da12b52e18d668eda9e3c8048899f2d50b', class: "yeti-date-calendar-heading", abbr: "Saturday" }, "Sa"))), this.renderMonthTBody(this.cursorDate)))));
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