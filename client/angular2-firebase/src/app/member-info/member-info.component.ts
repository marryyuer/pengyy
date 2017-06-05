import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar} from '@angular/material';
import { EmailValidator } from '../validators/emailValidator';
import { FamilyMember } from '../model/family-member';

import * as moment from 'moment';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  infoForm: FormGroup;
  @Input() member: FamilyMember;
  @Input() key: string;

  action: string;
  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private snack: MdSnackBar) {
    if (!this.member) {
      this.action = 'ADD';
    } else {
      this.action = 'UPDATE';
    }

    this.infoForm = this.fb.group({
      name: [this.member ? this.member.name : '', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      birthday: [this.member ? this.member.birthday : '', Validators.required],
      email: [this.member ? this.member.email : '', Validators.compose([Validators.required, EmailValidator.isValid])],
      location: [this.member ? this.member.location : '']
    });
  }

  ngOnInit() {
  }

  add() {
    if (!this.infoForm.valid) {
      this.snack.open('Invalid input, please confirm again!', '', { duration: 3000});
    } else {
      this.member = new FamilyMember();
      this.member.name = this.infoForm.controls.name.value;
      this.member.birthday = this.infoForm.controls.birthday.value;
      this.member.age = moment.duration(this.infoForm.controls.birthday.value, 'years').asYears();
      this.member.email = this.infoForm.controls.email.value;
      this.member.location = this.infoForm.controls.location.value;

      this.db.list('/family').push(this.member)
          .then(() => {
            this.snack.open('Welcome our new member' + this.member.name, 'OK', { duration: 5000});
            this.infoForm.reset();
          })
          .catch(err => {
            this.snack.open(err.message, 'OK', { duration: 3000});
          });
    }
  }

  doUpdate() {
      this.db.list('/family').update(this.key, this.member);
  }
}
