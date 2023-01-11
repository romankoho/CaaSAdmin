import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/product.service";
import {ProductDetail} from "../../models/product/productDetail";
import {ProductErrorMessages} from "./ProductErrorMessages";
import {ProductForUpdate} from "../../models/product/productForUpdate";
import {ProductForCreation} from "../../models/product/productForCreation";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'wea5-productform',
  templateUrl: './productform.component.html',
  styles: [
  ]
})
export class ProductformComponent implements OnInit {
  productForm: FormGroup;
  errors: { [key: string]: string } = {};
  product: ProductDetail = {
    id: "",
    name: "",
    shopId: "",
    price: 0,
    concurrencyToken: "0"
  }
  updating: boolean = false

  constructor(private fb: FormBuilder, private productService: ProductService,
              private toast: NgToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id != "empty") {
      this.updating = true
      this.productService.findById(id).subscribe({
        next:(res) => {
          this.product = res
          this.initForm()
        }
      })
    }

    this.initForm()
  }

  private initForm() {
   this.productForm = this.fb.group({
     name: [this.product.name, Validators.required],
     price: [this.product.price, [Validators.required, Validators.min(0.01), Validators.max(999999)]],
     description: [this.product.description]
   })

    this.productForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of ProductErrorMessages) {
      const control = this.productForm.get(message.forControl);
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

    if(this.updating) {
      let productForUpdate: ProductForUpdate =
      {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        concurrencyToken: this.product.concurrencyToken
      }
      this.productService.update(this.product.id, productForUpdate).subscribe({
        next:(res) => {
          this.toast.success({detail: "Product Created", duration:5000})
          this.router.navigateByUrl("/products")
        },
        error:(e) => {
          this.toast.success({detail: "Error Updating!", duration:5000})
        }
      })
    } else {
      let productForCreation: ProductForCreation = {
        id: uuidv4(),
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price
      }

      this.productService.saveProduct(productForCreation).subscribe({
        next:(res) => {
        this.toast.success({detail: "Product Created!", duration:5000})
        this.router.navigateByUrl("/products")
      },
        error:(e) => {
          this.toast.success({detail: "Error Creating Product!", duration:5000})
        }
      })
    }
  }
}
