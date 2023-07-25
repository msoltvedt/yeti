import { Component, Prop, h, State, Listen, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-date-picker',
  shadow: false,
})
export class YetiDatePicker {

  @Element() el: HTMLElement;

  /**
   * Fires when the user has chosen or entered a date and left (blurred from) the component.
   */
  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  /**
   * CSS classlist that will be added to the actual HTML input element.
   */
  @Prop() inputClass: string = '';

  /**
   * id that will be assigned to the actual HTML input element. If not provided, the component will assign one on load.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) inputId: string = ""; // Set on load

  /**
   * name that will be assigned to the actual HTML input element. If not provided, the component will use the id.
   */
  @Prop({
    mutable: true
  }) inputName: string = ""; // Set on load

  /**
   * Whether the component is a required field.
   */
  @Prop() required: boolean = false;

  /**
   * Tracks whether the component's current value is valid. The default empty value is valid.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  /**
   * The component's value.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

  /**
   * ID of any related label for the component. Used by aria-labelledby.
   */
  @Prop() labelledBy: string = "";

  /**
   * ID of any related describing element. Used by aria-describedby.
   */
  @Prop() describedBy: string = "";

  @Watch('value')
  watchInputValue() {
    let re = /(^$)|((0\d{1}|1[0-2])([\/-])([0-2]\d{1}|3[0-1])([\/-])(19|20)\d{2})/g;

    if (this.value.match(re) == null) {
        // User typed in an invalid value.
        this.isValid = false;
    } else {
        // User typed in a valid value.
        this.isValid = (this.value == '' && this.required && this.isTouched) ? false : true; // Empty fields are valid by default, invalid if required.
        this.cursorDate = (this.value == '') ? new Date() : new Date( this.value );
    }

    if (this.isTouched) {
        this.readyToVerifySlow.emit();
    }

  }

  /**
   * Tracks whether the user has interacted with the field (even if they don't select a value).
   */
  @State() isTouched: boolean = false;

  /**
   * The default date the highlighted cursor shows when the user toggles the picker open.
   */
  @State() cursorDate: Date = new Date(); // Defaults to today, but we'll set it to selected if possible

  /**
   * Toggle to force a component re-rerender.
   */
  @State() iLoveJSX: boolean = false;

  /**
   * Tracks whether the picker window is open or not.
   */
  @State() isPickerVisible: boolean = false;

  /**
   * Tracks whether the picker has just opened. Used to handle focus and blur in and around the component.
   */
  @State() pickerJustOpened: boolean = false;

  @Listen("click")
  clickHandler(ev: Event) {
    let target = ev.target as Element;
    if (target.classList.contains('yeti-input')) {
        this.isPickerVisible = false;
    }
  }

  @Listen("click", {
    target: "body"
  })
  handleDefocusingClick() {
    if (this.isPickerVisible && !this.pickerJustOpened) {
        this.isPickerVisible = false;
        this.isTouched = true;
        this.watchInputValue();
    }
    this.pickerJustOpened = false;
  }

  @Listen("keydown")
  listenForTabOut(ev) {
    if (ev.key == "Tab" && 
        ev.target.classList.contains('yeti-date-calendar-day') && 
        !ev.shiftKey) {

        // User hit tab while focused on the calendar, which moves focus to the next focusable thing after the control.
        this.isPickerVisible = false;
        this.isTouched = true;
        this.watchInputValue();

    } else if (ev.key == "Tab" && 
               ev.target.classList.contains('yeti-date-picker-action-button-first') && 
               ev.shiftKey) {
        
        // User hit shift+tab while focused on the first navigation button, which moves focus out of the picker.
        this.isPickerVisible = false;
        this.isTouched = true;
    } else if (ev.key == "Tab" &&
               ev.target.classList.contains('yeti-date-button') &&
               !this.isPickerVisible &&
               !ev.shiftKey) {
        
        // User normal-tabbed from the icon while the picker was closed, which moves focus out of the component entirely.
        this.isTouched = true;
        this.watchInputValue();
    }
  }

  // Used to manage focus when paging through different calendar month views via keyboard shortcuts
  keepFocusOnButton: boolean = false;

  pickerHeading: string = utils.generateUniqueId();


  handleFieldBlur(ev) {
    let hyphensToSlashes = ev.target.value.replaceAll("-","/");
    this.isTouched = true;
    this.value = hyphensToSlashes;
  }



  handleIconClick(ev) {
    this.isTouched = true;
    this.isPickerVisible = !this.isPickerVisible;
    this.pickerJustOpened = true;
    ev.preventDefault();
  }



  handleSelectDate(e: Event) {
    let td = e.target as Element;
    let dayNumber = parseInt(td.attributes.getNamedItem("data-date").value);
    let justSelectedDate = this.cursorDate;
    let icon = this.el.querySelector('.yeti-date-button') as HTMLElement;
    e.preventDefault();
    justSelectedDate.setDate(dayNumber);
    this.value = this.convertDateToInputValueString(justSelectedDate);
    this.isPickerVisible = false;
    if (icon) {
        // Return focus to the calendar icon
        icon.focus();
    }
}



  handleCalendarKeydown(ev: KeyboardEvent) {
    // For navigating the calendar via the keyboard

    switch (ev.key) {

        case "Home": {

            ev.preventDefault();
            this.cursorDate.setDate( this.getFirstDayOfWeek( this.cursorDate ) );
            this.iLoveJSX = !this.iLoveJSX;

            break;
        }

        case "End": {

            ev.preventDefault();
            this.cursorDate.setDate( this.getLastDayOfWeek( this.cursorDate ) );
            this.iLoveJSX = !this.iLoveJSX;

            break;
        }

        case "PageUp": {

            ev.preventDefault();
            let targetDate;

            if (ev.shiftKey) {
                // Previous Year
                targetDate = new Date(this.cursorDate.getFullYear()-1, this.cursorDate.getMonth(), this.cursorDate.getDate()); // Previous month
            } else {
                // Previous Month
                targetDate = new Date(this.cursorDate.getFullYear(), this.cursorDate.getMonth()-1, this.cursorDate.getDate());
            }

            this.cursorDate = this.getAnalogousDateInTargetMonthsGrid( this.cursorDate, targetDate );
            this.iLoveJSX = !this.iLoveJSX;

            break;
        }

        case "PageDown": {

            ev.preventDefault();
            let targetDate;

            if (ev.shiftKey) {
                // Previous Year
                targetDate = new Date(this.cursorDate.getFullYear()+1, this.cursorDate.getMonth(), this.cursorDate.getDate());
            } else {
                // Previous Month
                targetDate = new Date(this.cursorDate.getFullYear(), this.cursorDate.getMonth()+1, this.cursorDate.getDate());
            }

            this.cursorDate = this.getAnalogousDateInTargetMonthsGrid( this.cursorDate, targetDate );
            this.iLoveJSX = !this.iLoveJSX;

            break;
        }

        case "ArrowLeft": {

            ev.preventDefault();
            this.cursorDate.setDate( this.cursorDate.getDate() - 1 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "ArrowRight": {

            ev.preventDefault();
            this.cursorDate.setDate( this.cursorDate.getDate() + 1 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "ArrowUp": {

            ev.preventDefault();
            this.cursorDate.setDate( this.cursorDate.getDate() - 7 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "ArrowDown": {

            ev.preventDefault();
            this.cursorDate.setDate( this.cursorDate.getDate() + 7 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "Escape": {
            let icon = this.el.querySelector('.yeti-date-button') as HTMLElement;
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



  getFirstDayOfWeek(date: Date) {
    return (date.getDate() - date.getDay());
  }



  getLastDayOfWeek(date: Date) {
    return (date.getDate() + 6 - date.getDay());
  }



  getAnalogousDateInTargetMonthsGrid(currentDate: Date, targetDate: Date) {
    /*
        This is a weird one, thank the W3 for this. Say the user's looking at the monthly grid of days in the picker and wants to
        see the grid for the previous month. This function will try to select the analogous grid spot in that month (i.e. same row
        and column). If that grid spot doesn't exist, then we need to pick the closest week, and match the column spot in that week.
    */

    let firstOfCurrentMonth = new Date( currentDate.getFullYear(), currentDate.getMonth(), 1 );
    let dayIndexForFirstOfCurrentMonth = firstOfCurrentMonth.getDay();
    let rowIndex = Math.floor( (dayIndexForFirstOfCurrentMonth + currentDate.getDate())  /  7 );
    let colIndex = currentDate.getDay();
    let returnDate;
    let proposedDate;
    let daysInTargetMonth;
    
    targetDate.setDate(1);

    daysInTargetMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    proposedDate = (rowIndex*7) + colIndex + 1 - targetDate.getDay();

    proposedDate += (proposedDate < 1) ? 7 : 0; // Make sure the proposed date isn't on a leading empty grid cell

    while (proposedDate > daysInTargetMonth) { // Make sure the proposed date isn't on a trailing empty grid cell
        proposedDate -= 7;
    }

    // Now see if the previous month has a date in the grid square at rowIndex + colIndex;
    returnDate = new Date(targetDate);
    returnDate.setDate( proposedDate );

    return returnDate;

  }


  getSelectedDateInThisMonth(month: Date) {

    if (this.value == "") {
        return -1;
    } else {
        let properSelectedDate = new Date(this.value);
        if (
            properSelectedDate.getFullYear() == month.getFullYear() &&
            properSelectedDate.getMonth() == month.getMonth()
        ) {
            return properSelectedDate.getDate();
        } else {
            return -1;
        }
    }

  }



  getTodayInThisMonth(month: Date) {
    let today = new Date();

    if (
        today.getFullYear() == month.getFullYear() &&
        today.getMonth() == month.getMonth()
    ) {
        return today.getDate();
    } else {
        return -1;
    }

  }



  cursorDatePreviousYear() {
    this.cursorDate.setFullYear(
        this.cursorDate.getFullYear() - 1
    );
    this.keepFocusOnButton = true;
    this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
  }



  cursorDateNextYear() {
    this.cursorDate.setFullYear(
        this.cursorDate.getFullYear() + 1
    );
    this.keepFocusOnButton = true;
    this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
  }



  cursorDatePreviousMonth() {
    this.cursorDate.setMonth(
        this.cursorDate.getMonth() - 1
    );
    this.keepFocusOnButton = true;
    this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
  }



  cursorDateNextMonth() {
    this.cursorDate.setMonth(
        this.cursorDate.getMonth() + 1
    );
    this.keepFocusOnButton = true;
    this.iLoveJSX = !this.iLoveJSX; // Force re-render since dates are passed by reference.
  }



  convertDateToInputValueString(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        "month": "2-digit",
        "day": "2-digit",
        "year": "numeric"
    }).format(date);
  }



  getIconButtonLabel() {
    return (this.value == "") ? "Choose date" : `Change date, ${this.value}`;
  }



  renderMonthTBody(day: Date) {
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

            if ( gridSlot < lastMonthDaysVisible ) {

                // This is an empty slot (this day was in the last month)
                daysInThisWeek.push(
                    <td class="yeti-date-calendar-day yeti-date-calendar-day-not_this_month" tabindex="-1"></td>
                )

            } else {
                // This is either a valid date or a trailing empty slot (day in next month)

                if ( (gridSlot-lastMonthDaysVisible) >= daysInMonth ) {
                    // This is an empty slot (this day was in the next month)
                    daysInThisWeek.push(
                        <td class="yeti-date-calendar-day yeti-date-calendar-day-not_this_month" tabindex="-1"></td>
                    )
                } else {
                    // This is a valid date.
                    let css = "yeti-date-calendar-day";
                    let tabIndex = (this.cursorDate.getDate() == dayOfMonth) ? 0 : -1;
                    css += (todayInThisMonth == dayOfMonth && !(selectedDateInThisMonth == dayOfMonth)) ? ' yeti-date-calendar-day-today' : '';
                    css += (selectedDateInThisMonth == dayOfMonth) ? ' yeti-date-calendar-day-selected' : '';

                    daysInThisWeek.push(
                        <td data-date={dayOfMonth} class={css} tabindex={tabIndex} onClick={(e) => {
                            this.handleSelectDate(e);
                        }}>{dayOfMonth}</td>
                    )
                }

                dayOfMonth++;

            }

        }

        tbody.push(
            <tr data-week-of-month={weekOfMonth}>{daysInThisWeek}</tr>
        )
    }

    return tbody;

  }



  componentWillLoad() {

    console.log("Hi there.");
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



  componentDidRender() {
    // Set the focus on either the selected date or today's date, in that order of preference.
    if (this.isPickerVisible) {

        let td = this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]') as HTMLElement;
        let picker = this.el.querySelector('.yeti-date-picker') as HTMLElement;

        if (td && !this.keepFocusOnButton) {
            td.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
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



  render() {

    let cssClasses = 'yeti-input yeti-date-field';

    if (this.inputClass != '') {
      cssClasses += ' ' + this.inputClass;
    }

    if (this.isValid == false) {
      cssClasses += ' yeti-input__error';
    }

    return (

        <div class="yeti-date">

            <input 
                type="text" 
                class={cssClasses} 
                id={this.inputId}
                name={this.inputName}
                value={this.value}
                onBlur={(ev) => this.handleFieldBlur(ev)}
                aria-invalid={!this.isValid}
                placeholder="mm/dd/yyyy"
                autocomplete="off"
                {...((this.labelledBy != "") ? {"aria-labelledBy": this.labelledBy} : {})}
                {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
            />

            <button class="yeti-date-button" aria-label={this.getIconButtonLabel()} onClick={(ev) => { this.handleIconClick(ev); }}>
                <span class="material-icons yeti-date-button-icon" aria-hidden="true">calendar_today</span>
            </button>

            <div class={(this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker"}>

                <div class="yeti-date-picker-header">

                    <h2 class="yeti-date-picker-heading" aria-live="polite" id={this.pickerHeading}>{utils.getMonthName(this.cursorDate)} {this.cursorDate.getFullYear()}</h2>

                    <ul class="yeti-date-picker-actions">

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button yeti-date-picker-action-button-first" onClick={(ev) => {
                                this.cursorDatePreviousYear();
                                ev.preventDefault();
                                ev.stopPropagation();
                            }}>
                                <span class="yeti-a11y-hidden">Previous year</span>
                                <span class="material-icons" aria-hidden="true" title="Previous year">keyboard_double_arrow_left</span>
                            </button>
                        </li>

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button" onClick={(ev) => {
                                this.cursorDatePreviousMonth();
                                ev.preventDefault();
                                ev.stopPropagation();
                            }}>
                                <span class="yeti-a11y-hidden">Previous month</span>
                                <span class="material-icons" aria-hidden="true" title="Previous month">keyboard_arrow_left</span>
                            </button>
                        </li>

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button" onClick={(ev) => {
                                this.cursorDateNextMonth();
                                ev.preventDefault();
                                ev.stopPropagation();
                            }}>
                                <span class="yeti-a11y-hidden">Next month</span>
                                <span class="material-icons" aria-hidden="true" title="Next month">keyboard_arrow_right</span>
                            </button>
                        </li>

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button" onClick={(ev) => {
                                this.cursorDateNextYear();
                                ev.preventDefault();
                                ev.stopPropagation();
                            }}>
                                <span class="yeti-a11y-hidden">Next year</span>
                                <span class="material-icons" aria-hidden="true" title="Next year">keyboard_double_arrow_right</span>
                            </button>
                        </li>

                    </ul>

                </div>


                <table class="yeti-date-calendar" role="grid" aria-labelledby={this.pickerHeading}
                onKeyDown={(ev) => { this.handleCalendarKeydown(ev) }}>

                    <thead>
                        <tr>
                            <th class="yeti-date-calendar-heading" abbr="Sunday">Su</th>
                            <th class="yeti-date-calendar-heading" abbr="Monday">Mo</th>
                            <th class="yeti-date-calendar-heading" abbr="Tuesday">Tu</th>
                            <th class="yeti-date-calendar-heading" abbr="Wednesday">We</th>
                            <th class="yeti-date-calendar-heading" abbr="Thursday">Th</th>
                            <th class="yeti-date-calendar-heading" abbr="Friday">Fr</th>
                            <th class="yeti-date-calendar-heading" abbr="Saturday">Sa</th>
                        </tr>
                    </thead>

                    {this.renderMonthTBody(this.cursorDate)}

                </table>

            </div>

        </div>
    );

  }

}