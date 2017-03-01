import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { FamilyMember } from './model/family-member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  items: FirebaseListObservable<any[]>;
  selectedMember: FirebaseListObservable<any>;
  newItem = new FamilyMember();
  constructor(af: AngularFire) {
    this.items = af.database.list('/family');
  }

  addItem() {
    this.items.push(this.newItem);
    this.newItem = new FamilyMember();
  }
}
