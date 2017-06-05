import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { EmailValidator } from '../validators/emailValidator';
import { AuthService } from '../service/auth.service';

import { ErrorComponent } from '../error/error.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snack: MdSnackBar) {
    this.resetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  ngOnInit() {
  }

  sendReset() {
    if (!this.resetForm.valid) {
      this.snack.open('form validate failed.', 'OK', { duration: 3000 });
    } else {
      this.authService.reset(this.resetForm.controls.email.value)
          .then(() => {
            this.snack.open('reset email has been send successfully.');
            this.router.navigate(['/login']);
          })
          .catch(err => {
            this.snack.open(err.message, 'OK', { duration: 3000 });
          });
    }
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

}
