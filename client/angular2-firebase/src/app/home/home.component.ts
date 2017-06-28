import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as moment from 'moment';

import { FamilyMember } from '../model/family-member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showUpdArea = false;
  newTitle = '';
  selectedIndex = 0;
  items: FirebaseListObservable<any[]>;
  constants: FirebaseObjectObservable<any>;

  selectedMember: FirebaseListObservable<any>;
  newItem = new FamilyMember();

  constructor(private db: AngularFireDatabase, private router: Router) {
    this.items = this.db.list('family');
    this.constants = this.db.object('/constants');
    console.log(moment('05', 'MM').format('MMMM'));
  }

  ngOnInit() {
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  updateTitle() {
    this.constants.update({'title': this.newTitle}).then(() => {
      this.showUpdArea = false;
    });
  }
}