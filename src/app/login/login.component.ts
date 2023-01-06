import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'wea5-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) { }

  private returnTo: string = '';

  login: any = {
    username: '',
    password: ''
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.returnTo = params['returnUrl'])
  }

  doLogin() {
    this.auth.login()

    /*
    if (this.auth.login()) {
      this.router.navigateByUrl(this.returnTo);
    }
    */
  }
}
