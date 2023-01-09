import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DiscountErrorMessages} from "./DiscountErrorMessages";

@Component({
  selector: 'wea5-discountform',
  templateUrl: './discountform.component.html',
  styles: [
  ]
})
export class DiscountformComponent implements OnInit {

  discountForm!: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.discountForm = this.fb.group({
      name: ["", Validators.required],
      rule: ["", Validators.required],
      ruleSetting: ["", Validators.required]
    });

    this.discountForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of DiscountErrorMessages) {
      const control = this.discountForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors != null &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm(){
    
  }

}
