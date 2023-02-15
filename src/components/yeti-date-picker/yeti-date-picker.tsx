import { Component, Prop, h, State, Listen, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { utils } from '../../utils/utils';

@Component({
  tag: 'yeti-date-picker',
  shadow: false,
})
export class YetiDatePicker {

  @Element() el: HTMLElement;

  @Event({ bubbles: true }) readyToVerifySlow: EventEmitter<CustomEvent>;

  @Prop() inputClass: string = '';

  @Prop() inputId: string = utils.generateUniqueId();

  @Prop() required: boolean = false;

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean;

  @Prop({
    mutable: true,
    reflect: true
  }) value: string = '';

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



  @State() isTouched: boolean = false;

  @State() cursorDate: Date = new Date(); // Defaults to today, but we'll set it to selected if possible

  @State() iLoveJSX: boolean = false;

  @State() isPickerVisible: boolean = false;

  @Listen("click")
  clickHandler(ev: Event) {
    let target = ev.target as Element;
    if (target.classList.contains('yeti-input')) {
        this.isPickerVisible = false;
    }
    ev.stopPropagation();
  }

  @Listen("click", {
    target: "body"
  })
  handleDefocusingClick() {
    this.isPickerVisible = false;
    this.isTouched = true;
    this.watchInputValue();
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
               !this.isPickerVisible) {
        
        // User tabbed from the icon while the picker was closed, which moves focus out of the component entirely.
        this.isTouched = true;
        this.watchInputValue();
    }
  }

  keepFocusOnButton: boolean = false;



  handleFieldBlur(ev) {
    let hyphensToSlashes = ev.target.value.replaceAll("-","/");
    this.isTouched = true;
    this.value = hyphensToSlashes;
  }



  handleIconClick() {
    this.isPickerVisible = !this.isPickerVisible;
  }



  handleSelectDate(e: Event) {
    let td = e.target as Element;
    let dayNumber = parseInt(td.attributes.getNamedItem("data-date").value);
    let justSelectedDate = this.cursorDate;
    let icon = this.el.querySelector('.yeti-date-button') as HTMLElement;
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

        case "ArrowLeft": {

            this.cursorDate.setDate( this.cursorDate.getDate() - 1 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "ArrowRight": {

            this.cursorDate.setDate( this.cursorDate.getDate() + 1 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "ArrowUp": {

            this.cursorDate.setDate( this.cursorDate.getDate() - 7 );
            this.iLoveJSX = !this.iLoveJSX;
            break;

        }

        case "ArrowDown": {

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
    this.watchInputValue();
  }



  componentDidRender() {
    // Set the focus on either the selected date or today's date, in that order of preference.
    if (this.isPickerVisible) {

        let td = this.el.querySelector('.yeti-date-calendar-day[tabindex="0"]') as HTMLElement;
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

    return (

        <div class="yeti-date">

            <input 
                type="text" 
                class={cssClasses} 
                id={this.inputId} 
                value={this.value}
                onBlur={(ev) => this.handleFieldBlur(ev)}
                aria-invalid={!this.isValid}
                placeholder="mm/dd/yyyy"
                {...((this.describedBy != "") ? {"aria-describedby": this.describedBy} : {})}
            />

            <button class="yeti-date-button" aria-label={this.getIconButtonLabel()} onClick={() => { this.handleIconClick(); }}>
                <span class="material-icons yeti-date-button-icon" aria-hidden="true">calendar_today</span>
            </button>

            <div class={(this.isPickerVisible) ? "yeti-date-picker yeti-date-picker__visible" : "yeti-date-picker"}>

                <div class="yeti-date-picker-header">

                    <h2 class="yeti-date-picker-heading" aria-live="polite" id="heading">{utils.getMonthName(this.cursorDate)} {this.cursorDate.getFullYear()}</h2>

                    <ul class="yeti-date-picker-actions">

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button yeti-date-picker-action-button-first" onClick={() => {
                                this.cursorDatePreviousYear();
                            }}>
                                <span class="yeti-a11y-hidden">Previous year</span>
                                <span class="material-icons" aria-hidden="true" title="Previous year">keyboard_double_arrow_left</span>
                            </button>
                        </li>

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button" onClick={() => {
                                this.cursorDatePreviousMonth();
                            }}>
                                <span class="yeti-a11y-hidden">Previous month</span>
                                <span class="material-icons" aria-hidden="true" title="Previous month">keyboard_arrow_left</span>
                            </button>
                        </li>

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button" onClick={() => {
                                this.cursorDateNextMonth();
                            }}>
                                <span class="yeti-a11y-hidden">Next month</span>
                                <span class="material-icons" aria-hidden="true" title="Next month">keyboard_arrow_right</span>
                            </button>
                        </li>

                        <li class="yeti-date-picker-action">
                            <button class="yeti-date-picker-action-button" onClick={() => {
                                this.cursorDateNextYear();
                            }}>
                                <span class="yeti-a11y-hidden">Next year</span>
                                <span class="material-icons" aria-hidden="true" title="Next year">keyboard_double_arrow_right</span>
                            </button>
                        </li>

                    </ul>

                </div>


                <table class="yeti-date-calendar" role="grid" aria-labelledby="heading"
                onKeyUp={(ev) => { this.handleCalendarKeydown(ev) }}>

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