import { Component, Input, OnInit, ViewChild, Optional, Inject, forwardRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HomeComponent } from '../home/home.component';
import { MapComponent } from '../map/map.component';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { MdDialog, MdDialogConfig, MdDialogRef, MdSnackBar, MD_DIALOG_DATA} from '@angular/material';
import { EmailValidator } from '../validators/emailValidator';
import { AsyncValidatorService } from '../service/validator.service';
import { FamilyMember } from '../model/family-member';

import * as moment from 'moment';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  infoForm: FormGroup;
  member: FamilyMember;
  @ViewChild("form") form;
  action: string;
  autocomplete: google.maps.places.Autocomplete;
  constructor(private fb: FormBuilder,
              @Optional() @Inject(forwardRef(() => HomeComponent)) private homeComponent: HomeComponent,
              @Optional() @Inject(MD_DIALOG_DATA) public data: any,
              @Optional() private dialogRef: MdDialogRef<MemberInfoComponent>,
              private dialog: MdDialog,
              private cdr: ChangeDetectorRef,
              private db: AngularFireDatabase,
              private snack: MdSnackBar) {
    if (!this.data) {
      this.action = 'ADD';
    } else {
      this.action = 'UPDATE';
      this.member = this.data;
    }

    this.infoForm = this.fb.group({
      name: [this.member ? this.member.name : '', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)]), AsyncValidatorService.duplicateUserName(this.db)],
      birthday: [this.member ? this.member.birthday : '', Validators.required],
      email: [this.member ? this.member.email : '', Validators.compose([Validators.required, EmailValidator.isValid])],
      location: [this.member ? this.member.location : ''],
      test: ['']
    });
  }

  ngOnInit() {

  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }

  placeChanged(place: any) {

  }

  submit() {
    if (this.action === 'ADD') {
      this.doAdd();
    } else {
      this.doUpdate();
    }
  }

  showMap() {
    const config = new MdDialogConfig();
    config.disableClose = true;
    const mapDialog = this.dialog.open(MapComponent, config);
    mapDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  doAdd() {
    if (!this.infoForm.valid) {
      this.snack.open('Invalid input, please confirm again!', '', { duration: 3000});
      return false;
    }

    this.member = new FamilyMember();
    this.member.name = this.infoForm.controls.name.value;
    this.member.birthday = this.infoForm.controls.birthday.value;
    this.member.age = moment().diff(this.infoForm.controls.birthday.value, 'years');
    this.member.email = this.infoForm.controls.email.value;
    this.member.location = this.infoForm.controls.location.value;

    this.db.list('/family').push(this.member)
        .then(() => {
          this.snack.open('Welcome our new member: ' + this.member.name, 'OK', { duration: 5000});
          // this.infoForm.reset();
          this.form.resetForm();
          console.log(this.homeComponent.selectedIndex);
          // this.homeComponent.selectedIndex = 0;
          this.cdr.detectChanges();
          this.dialogRef.close('saved');
        })
        .catch(err => {
          this.snack.open(err.message, 'OK', { duration: 3000});
        });
  }

  reset() {
    this.form.reset();
  }

  doUpdate() {
    this.member.name = this.infoForm.controls.name.value;
    this.member.birthday = this.infoForm.controls.birthday.value;
    this.member.age = moment().diff(this.infoForm.controls.birthday.value, 'years');
    this.member.email = this.infoForm.controls.email.value;
    this.member.location = this.infoForm.controls.location.value;

    this.db.list('/family').update(this.data.$key, this.member)
        .then(() => {
          this.snack.open('Member information updating succeed!', 'OK', { duration: 5000});
          this.dialogRef.close('OK');
        })
        .catch(err => {
          this.snack.open('Member information updating failed!', 'OK', { duration: 5000});
        })
  }
}
