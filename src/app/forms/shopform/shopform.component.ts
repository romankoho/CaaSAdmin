import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ShopFormErrorMessages} from "./shopFormMessages";
import {Shop} from "../../models/shop/shop";
import {ShopForUpdate} from "../../models/shop/shopForUpdate";
import {ShopService} from "../../shared/shop.service";

@Component({
  selector: 'wea5-shopform',
  templateUrl: './shopform.component.html',
  styles: [
  ]
})
export class ShopformComponent implements OnInit, OnChanges {

  shopDetailsForm!: FormGroup;
  errors: { [key: string]: string } = {};

  editing: boolean = false

  @Input() shop: Shop = {
    cartLifetimeMinutes: 0, id: "",
    shopAdmin: {
      id:"",
      shopId: ""
    }
  }

  @Output() shopUpdated = new EventEmitter<Shop>();

  ngOnChanges(changes: SimpleChanges) {
    for(const propName in changes) {
      if(changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'shop' : {
            this.shop = changes["shop"].currentValue
            this.initForm()
          }
        }
      }
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private shopService: ShopService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    console.log(this.shop)

    this.shopDetailsForm = this.fb.group({
      name: [{value: this.shop.name, disabled: true}, Validators.required],
      cartLifetime: [{value: this.shop.cartLifetimeMinutes, disabled:true}, [Validators.required, Validators.min(60), Validators.max(9999)]],
      appKey: [{value: this.shop.appKey, disabled: true}, [Validators.required, Validators.minLength(8)]]
    });

    this.shopDetailsForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  enableForm(){
    this.shopDetailsForm.get("name")?.enable()
    this.shopDetailsForm.get("cartLifetime")?.enable()
    this.shopDetailsForm.get("appKey")?.enable()
    this.editing=true
  }

  cancelEditing(){
    this.shopDetailsForm.get("name")?.disable()
    this.shopDetailsForm.get("cartLifetime")?.disable()
    this.shopDetailsForm.get("appKey")?.disable()
    this.initForm()
    this.editing=false
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of ShopFormErrorMessages) {
      const control = this.shopDetailsForm.get(message.forControl);
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

  submitForm() {
    let shopForUpdate: ShopForUpdate = {
      name: this.shopDetailsForm.value.name,
      cartLifetimeMinutes: this.shopDetailsForm.value.cartLifetime,
      shopAdmin: {
        id: this.shop.shopAdmin.id,
        name: this.shop.shopAdmin.name,
        eMail: this.shop.shopAdmin.eMail
      },
      appKey: this.shopDetailsForm.value.appKey,
      concurrencyToken: this.shop.concurrencyToken,
    }

    this.shopService.updateShop(this.shop.id, shopForUpdate).subscribe(res => {
      this.shop = res
      this.editing = false
      this.shopUpdated.emit(this.shop)
    })
  }


}
