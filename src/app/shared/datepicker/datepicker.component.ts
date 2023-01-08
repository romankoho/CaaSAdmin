import {Component, OnInit, } from '@angular/core';
import {DatepickerOptions} from "ng2-datepicker";


@Component({
  selector: 'wea5-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [
  ]
})
export class DatepickerComponent implements OnInit {

  date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
