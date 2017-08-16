import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmailValidator } from '../validators/emailValidator';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private dialogRef: MdDialogRef<ContactComponent>,
    private snack: MdSnackBar
  ) {
    this.contactForm = this.fb.group({
      'title': ['', Validators.required],
      'detail': ['', [Validators.required, Validators.maxLength(3000)]],
      'email': ['', EmailValidator.isValid]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('form submit action detected');
    this.db.list('proposals/advices').push({
      'title': this.contactForm.controls.title.value,
      'email': this.contactForm.controls.email.value,
      'detail': this.contactForm.controls.detail.value
    }).then(() => {
      this.snack.open('message has been successfully submitted.', 'OK', { duration: 3000});
      this.dialogRef.close();
    }).catch(err => {
      this.snack.open('Error happened while submitting message!');
      console.error(err.message, err.stack);
    });
  }
}
