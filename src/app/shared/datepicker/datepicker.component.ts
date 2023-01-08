import {Component, EventEmitter, OnInit, Output,} from '@angular/core';
import {DatepickerOptions} from "ng2-datepicker";
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';


@Component({
  selector: 'wea5-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [
  ]
})
export class DatepickerComponent implements OnInit {

  date = new Date();

  options: DatepickerOptions = {
    minYear: getYear(new Date()) - 3, // minimum available and selectable year
    maxYear: getYear(new Date()) + 3, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9' // in case you customize you theme, here you define scroll bar color
  };

  @Output() dateChangedEvent = new EventEmitter<Date>()

  constructor() { }

  ngOnInit(): void {

  }

}
