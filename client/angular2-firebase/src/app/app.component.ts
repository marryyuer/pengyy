import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { FamilyMember } from './model/family-member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showUpdErea = false;
  newTitle = '';
  items: FirebaseListObservable<any[]>;
  constants: FirebaseObjectObservable<any>;

  selectedMember: FirebaseListObservable<any>;
  newItem = new FamilyMember();

  constructor(af: AngularFire) {
    this.items = af.database.list('/family');
    this.constants = af.database.object('/constants');
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
