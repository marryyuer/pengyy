import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from '../validators/emailValidator';
import { AuthService } from '../service/auth.service';

import { ErrorComponent } from '../error/error.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snack: MdSnackBar) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      secret: this.fb.group({
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        confirm: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, { validator: this.matchPassword})
    });
  }

  ngOnInit() {
    
  }

  signUp() {
    if (!this.signUpForm.valid) {
      this.snack.open('form validate failed.', 'OK', { duration: 3000 });
    } else {
      this.authService.signup(this.signUpForm.controls.email.value, this.signUpForm.get("secret.password").value)
          .then(() => this.router.navigate(['/home']))
          .catch(err => {
            this.snack.open(err.message, 'OK', { duration: 3000 });
          });
    }
  }

  matchPassword(group: FormGroup) {
    if (group.controls.confirm.value && group.controls.password.value === group.controls.confirm.value) {
      return null;
    } else {
      return { 'mismatch': true };
    }
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
}
