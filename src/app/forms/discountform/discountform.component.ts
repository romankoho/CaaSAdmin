import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DiscountErrorMessages} from "./DiscountErrorMessages";
import {v4 as uuidv4} from "uuid";

import {
  FixedValueDiscountActionSettings, PercentageDiscountActionSettings,
  TimeWindowRuleSetting, MinProductCountRuleSetting,
} from "./DiscountSettingPlaceholders";
import {DiscountSettingForCreation} from "../../models/discount/discountSettings";
import {DiscountService} from "../../discount.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'wea5-discountform',
  templateUrl: './discountform.component.html',
  styles: [
  ]
})
export class DiscountformComponent implements OnInit {

  discountForm!: FormGroup;
  errors: { [key: string]: string } = {};

  placeholders: {[key: string]: any} = {
    ["24EEFF2C-65C6-4482-B1AC-C6CB5F2D6B84"]: MinProductCountRuleSetting,
    ["0F4E0B04-E32B-4897-804C-92F858468D8A"]: TimeWindowRuleSetting,
    ["68A4020D-A8AC-4A74-8A04-24E449786898"]: FixedValueDiscountActionSettings,
    ["29AD1EEA-1CFB-4473-8556-65F86FCA0471"]: PercentageDiscountActionSettings,
  }

  constructor(private fb: FormBuilder, private discountService: DiscountService,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.initForm()
  }

  name: string = ""
  rule: string = "24EEFF2C-65C6-4482-B1AC-C6CB5F2D6B84"
  ruleSetting: string = JSON.stringify(MinProductCountRuleSetting, null, 2)

  action: string = "68A4020D-A8AC-4A74-8A04-24E449786898"
  actionSetting: string = JSON.stringify(FixedValueDiscountActionSettings, null, 2)

  initForm() {
    this.discountForm = this.fb.group({
      name: [this.name, Validators.required],
      rule: [this.rule, Validators.required],
      ruleSetting: [this.ruleSetting, Validators.required],
      action: [this.action, Validators.required],
      actionSetting: [this.actionSetting, Validators.required]
    });

    this.discountForm.statusChanges.subscribe(() => this.updateErrorMessages());
    this.discountForm.controls['rule'].valueChanges.subscribe((selectedValue) => this.ruleChanged(selectedValue))
    this.discountForm.controls['action'].valueChanges.subscribe((selectedValue) => this.actionChanged(selectedValue))
    this.discountForm.controls['name'].valueChanges.subscribe((value) => this.nameChanged(value))
  }

  nameChanged(value: any) {
    this.name = value
  }

  ruleChanged(selectedValue: any) {
    this.rule = selectedValue
    this.ruleSetting = JSON.stringify(this.placeholders[selectedValue], null, 2)
    this.initForm()
  }

  actionChanged(selectedValue: any) {
    this.action = selectedValue
    this.actionSetting = JSON.stringify(this.placeholders[selectedValue], null, 2)
    this.initForm()
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

    let newSetting: DiscountSettingForCreation = {
      id: uuidv4(),
      name: this.discountForm.value.name,
      rule: {
        id: this.discountForm.value.rule,
        parameters: JSON.parse(this.discountForm.value.ruleSetting)
      },
      action: {
        id: this.discountForm.value.action,
        parameters: JSON.parse(this.discountForm.value.actionSetting)
      }
    }

    this.discountService.saveDiscountSetting(newSetting).subscribe( {
      next:(res) => {
        this.toast.success({detail: "Discount Setting Created!", duration:5000})
      },
      error:(e) => {
        this.toast.error({detail: e.error.message, duration: 10000})
      }
    })
  }

}
