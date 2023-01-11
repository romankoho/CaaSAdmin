import {Component, OnInit} from '@angular/core';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {Direction} from "../models/base/parsed-pagination-token";
import {ProductService} from "../shared/product.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'wea5-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  emptyGuid = "empty"

  pagedResult: ProductPagedResult = {
    firstPage: {
      direction: Direction.Forward
    },
    lastPage: {
      direction: Direction.Forward
    },
    nextPage: {
      direction: Direction.Forward
    },
    previousPage: {
      direction: Direction.Forward
    },
    totalCount: 0,
    totalPages: 0

  }
  currentPage: number = 0
  searchTerm: string = ""
  disablePrevious: boolean = true
  disableNext: boolean = true

  constructor(private productService: ProductService,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.findByTextSearch(null, Direction.Forward, undefined, 10).subscribe((res) => {
      this.pagedResult = res
      this.currentPage = 1
      this.searchTerm = ""
      if(this.pagedResult.nextPage != undefined) {
        this.disableNext = false
      }
    })
  }

  searchTriggered($event: string) {
    if($event.length > 0) {
      this.productService.findByTextSearch($event, Direction.Forward, undefined, 10).subscribe((res) => {
        this.pagedResult = res
        if(this.pagedResult.items?.length == 0) {
          this.toast.error({detail: "So Much Empty", summary:"No Products Found", duration: 5000})
        } else {
          this.currentPage = 1
        }

        this.searchTerm = $event
        if(this.pagedResult.nextPage != undefined) {
          this.disableNext = false
        } else {
          this.disableNext = true
        }
      })
    } else {
      this.getAllProducts()
    }
  }

  navigateToPreviousPage() {
    this.productService.findByTextSearch(this.searchTerm, Direction.Backward, this.pagedResult.previousPage.reference, 10).subscribe((res) => {
      this.pagedResult = res
      this.currentPage--
      if(this.currentPage == 1) {
        this.disablePrevious = true
      }
    })

  }

  navigateToNextPage() {
    this.productService.findByTextSearch(this.searchTerm, Direction.Forward, this.pagedResult.nextPage.reference, 10).subscribe((res) => {
      this.pagedResult = res
      this.currentPage++
      this.disablePrevious = false
    })
  }

  delete(id: string) {

  }
}
