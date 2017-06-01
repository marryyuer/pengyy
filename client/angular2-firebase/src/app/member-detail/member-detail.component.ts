import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FamilyMember } from '../model/family-member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

    @Input() member: FirebaseObjectObservable<any>;
    @Input() key: string;

    constructor(private db: AngularFireDatabase, private af: AngularFireAuth) {
    }

    doUpdate() {
        this.db.list('/family').update(this.key, this.member);
    }

    ngOnInit() {
      
    }
}
