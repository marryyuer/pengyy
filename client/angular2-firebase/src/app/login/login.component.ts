import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from '../validators/emailValidator';
import { AuthService } from '../service/auth.service';

import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snack: MdSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
        .then(() => this.router.navigate(['/home']))
        .catch(err => {
          this.snack.open(err.message, 'undo', { duration: 3000 });
        });
    }
  }

  resetPassword() {
    this.router.navigateByUrl('/reset');
  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }
}
