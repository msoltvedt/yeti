import { r as registerInstance, e as createEvent, h, g as getElement } from './index-77339656.js';
import { u as utils } from './utils-a407a515.js';

const YetiDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.readyToVerifySlow = createEvent(this, "readyToVerifySlow", 7);
    this.keepFocusOnButton = false;
    this.inputClass = '';
    this.inputId = utils.generateUniqueId();
    this.inputName = this.inputId;
    this.required = false;
    this.isValid = undefined;
    this.value = '';
    this.labelledBy = "";
    this.describedBy = "";
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
      !this.isPickerVisible) {
      // User tabbed from the icon while the picker was closed, which moves focus out of the component entirely.
      this.isTouched = true;
      this.watchInputValue();
    }
  }
  handleFieldBlur(ev) {
    let hyphensToSlashes = ev.target.value.replaceAll("-", "/");
    this.isTouched = true;
    this.value = hyphensToSlashes;
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
  componentWillLoad() {
    this.watchInputValue();
  }
  componentDidRender() {
    // Set the focus on either the selected date or today's date, in that order of preference.
    if (this.isPickerVisible) {
      let td = this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]');
      if (td && !this.keepFocusOnButton) {
        td.focus();
      }
      if (this.keepFocusOnButton) {
        this.keepFocusOnButton = false;
      }
    }
  }
  render() {
    let cssClasses = 'yeti-input yeti-date-field';
    if (this.inputClass != '') {
      cssClasses += ' ' + this.inputClass;
    }
    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }
    return (h("div", { class: "yeti-date" }, h("input", Object.assign({ type: "text", class: cssClasses, id: this.inputId, name: this.inputName, value: this.value, onBlur: (ev) => this.handleFieldBlur(ev), "aria-invalid": !this.isValid, placeholder: "mm/dd/yyyy", autocomplete: "off" }, ((this.labelledBy != "") ? { "aria-labelledBy": this.labelledBy } : {}), ((this.describedBy != "") ? { "aria-describedby": this.describedBy } : {}))), h("button", { class: "yeti-date-button", "aria-label": this.getIconButtonLabel(), onClick: (ev) => { this.handleIconClick(ev); } }, h("span", { class: "material-icons yeti-date-button-icon", "aria-hidden": "true" }, "calendar_today")), h("div", { class: (this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker" }, h("div", { class: "yeti-date-picker-header" }, h("h2", { class: "yeti-date-picker-heading", "aria-live": "polite", id: "heading" }, utils.getMonthName(this.cursorDate), " ", this.cursorDate.getFullYear()), h("ul", { class: "yeti-date-picker-actions" }, h("li", { class: "yeti-date-picker-action" }, h("button", { class: "yeti-date-picker-action-button yeti-date-picker-action-button-first", onClick: (ev) => {
        this.cursorDatePreviousYear();
        ev.preventDefault();
        ev.stopPropagation();
      } }, h("span", { class: "yeti-a11y-hidden" }, "Previous year"), h("span", { class: "material-icons", "aria-hidden": "true", title: "Previous year" }, "keyboard_double_arrow_left"))), h("li", { class: "yeti-date-picker-action" }, h("button", { class: "yeti-date-picker-action-button", onClick: (ev) => {
        this.cursorDatePreviousMonth();
        ev.preventDefault();
        ev.stopPropagation();
      } }, h("span", { class: "yeti-a11y-hidden" }, "Previous month"), h("span", { class: "material-icons", "aria-hidden": "true", title: "Previous month" }, "keyboard_arrow_left"))), h("li", { class: "yeti-date-picker-action" }, h("button", { class: "yeti-date-picker-action-button", onClick: (ev) => {
        this.cursorDateNextMonth();
        ev.preventDefault();
        ev.stopPropagation();
      } }, h("span", { class: "yeti-a11y-hidden" }, "Next month"), h("span", { class: "material-icons", "aria-hidden": "true", title: "Next month" }, "keyboard_arrow_right"))), h("li", { class: "yeti-date-picker-action" }, h("button", { class: "yeti-date-picker-action-button", onClick: (ev) => {
        this.cursorDateNextYear();
        ev.preventDefault();
        ev.stopPropagation();
      } }, h("span", { class: "yeti-a11y-hidden" }, "Next year"), h("span", { class: "material-icons", "aria-hidden": "true", title: "Next year" }, "keyboard_double_arrow_right"))))), h("table", { class: "yeti-date-calendar", role: "grid", "aria-labelledby": "heading", onKeyDown: (ev) => { this.handleCalendarKeydown(ev); } }, h("thead", null, h("tr", null, h("th", { class: "yeti-date-calendar-heading", abbr: "Sunday" }, "Su"), h("th", { class: "yeti-date-calendar-heading", abbr: "Monday" }, "Mo"), h("th", { class: "yeti-date-calendar-heading", abbr: "Tuesday" }, "Tu"), h("th", { class: "yeti-date-calendar-heading", abbr: "Wednesday" }, "We"), h("th", { class: "yeti-date-calendar-heading", abbr: "Thursday" }, "Th"), h("th", { class: "yeti-date-calendar-heading", abbr: "Friday" }, "Fr"), h("th", { class: "yeti-date-calendar-heading", abbr: "Saturday" }, "Sa"))), this.renderMonthTBody(this.cursorDate)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["watchInputValue"]
  }; }
};

export { YetiDatePicker as yeti_date_picker };
