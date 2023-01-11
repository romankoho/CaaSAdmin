import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'wea5-redirect',
  templateUrl: './redirect.component.html',
  styles: [
  ]
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
        this.router.navigateByUrl("/home")
    }, 2000);
  }
}
