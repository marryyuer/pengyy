import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as moment from 'moment';

import { FamilyMember } from '../model/family-member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showUpdErea = false;
  newTitle = '';
  items: FirebaseListObservable<any[]>;
  constants: FirebaseObjectObservable<any>;

  selectedMember: FirebaseListObservable<any>;
  newItem = new FamilyMember();

  constructor(db: AngularFireDatabase) {
    // this.items = af.database.list('/family');
    this.items = db.list('/family');
    this.constants = db.object('/constants');
    console.log(moment('05', 'MM').format('MMMM'));
  }

  ngOnInit() {
  }

  addItem() {
    this.items.push(this.newItem);
    this.newItem = new FamilyMember();
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  updateTitle() {
    this.constants.update({'title': this.newTitle}).then(() => {
      this.showUpdErea = false;
    });
  }
}