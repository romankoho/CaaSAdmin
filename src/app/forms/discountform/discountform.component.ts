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
import {ActivatedRoute, Router} from "@angular/router";

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
    ["24eeff2c-65c6-4482-b1ac-c6cb5f2d6b84"]: MinProductCountRuleSetting,
    ["0f4e0b04-e32b-4897-804c-92f858468d8a"]: TimeWindowRuleSetting,
    ["68a4020d-a8ac-4a74-8a04-24e449786898"]: FixedValueDiscountActionSettings,
    ["29ad1eea-1cfb-4473-8556-65f86fca0471"]: PercentageDiscountActionSettings,
  }

  discountSetting: DiscountSettingForCreation

  constructor(private fb: FormBuilder, private discountService: DiscountService,
              private toast: NgToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id != "empty") {
      this.updatingDiscount = true
      this.discountService.getById(id).subscribe({
        next:(result) => {
          this.discountSetting = result
          this.name = result.name || ""
          this.rule = result.rule.id
          this.action = result.action.id
          this.ruleSetting = JSON.stringify(result.rule.parameters, null, 2)
          this.actionSetting = JSON.stringify(result.action.parameters, null, 2)

          this.originalRule = result.rule.id
          this.originalAction = result.action.id
          this.originalRuleSetting = JSON.stringify(result.rule.parameters, null, 2)
          this.originalAction = JSON.stringify(result.action.parameters, null, 2)

          this.initForm()
        }
      })
    }

    this.initForm()
  }

  updatingDiscount = false

  name: string = ""
  rule: string = "24eeff2c-65c6-4482-b1ac-c6cb5f2d6b84"
  ruleSetting: string = JSON.stringify(MinProductCountRuleSetting, null, 2)

  originalRule: string = "24eeff2c-65c6-4482-b1ac-c6cb5f2d6b84"
  originalRuleSetting: string

  action: string = "68a4020d-a8ac-4a74-8a04-24e449786898"
  actionSetting: string = JSON.stringify(FixedValueDiscountActionSettings, null, 2)

  originalAction: string = "68a4020d-a8ac-4a74-8a04-24e449786898"
  originalActionSetting: string

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
    if(this.updatingDiscount) {
      if (selectedValue == this.originalRule) {
        this.ruleSetting = this.originalRuleSetting
      } else {
        this.ruleSetting = JSON.stringify(this.placeholders[selectedValue], null, 2)
      }
    } else {
      this.ruleSetting = JSON.stringify(this.placeholders[selectedValue], null, 2)
    }

    this.rule = selectedValue
    this.initForm()
  }

  actionChanged(selectedValue: any) {
    if(this.updatingDiscount) {
      if(selectedValue == this.originalAction) {
        this.actionSetting = this.originalActionSetting
      } else {
        this.actionSetting = JSON.stringify(this.placeholders[selectedValue], null, 2)
      }
    } else {
      this.actionSetting = JSON.stringify(this.placeholders[selectedValue], null, 2)
    }

    this.action = selectedValue
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

    if(this.updatingDiscount) {

     this.discountService.update()
    } else {
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

}
