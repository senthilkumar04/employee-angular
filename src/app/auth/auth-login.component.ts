import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { AppService } from '../app.service';

@Component({
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit, IAuthLoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  loginError = {
    isError: false,
    message: ''
  }

  defaultLogonCredentials;
  
  constructor(private appService: AppService, 
    private route: ActivatedRoute,
    private router: Router) {
    this.defaultLogonCredentials = {
      email: 'test@example.com',
      password: 'test12345'
    }
  }

  ngOnInit() {
    console.log('Auth component is initialozed');
  }

  login() {
    console.log('Handle login', this.loginForm.value);
    this.setLoginError(false, "");
    const { value: { email='', password='' }} = this.loginForm;
    const {email: defaultEmail, password:defaultPassword} = this.defaultLogonCredentials;
    if(email === defaultEmail && password === defaultPassword) {
      console.log('Logged In successfully');
      this.appService.setIsLoggedIn(true);
      this.router.navigate(['employees'], { relativeTo: this.route });
    }
    else {
      this.setLoginError(true, "You have entered an incorrect email or password");
    }
  }

  setLoginError(isError, message) {
    this.loginError.isError = isError;
    this.loginError.message = message;
  }

}

interface IAuthLoginComponent {
  defaultLogonCredentials: {
    email: string;
    password: string;
  };
  loginError: {
    isError: boolean;
    message: string;
  }
  login(): void;
}