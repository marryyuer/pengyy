import { Component, Input } from '@angular/core';
import { } from '@angular/common';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { FamilyMember } from './model/family-member';

@Component({
    selector: 'app-member-detail',
    templateUrl: 'member-detail.component.html'
})
export class MemberDetailComponent {
    @Input() member: FirebaseObjectObservable<any>;
    @Input() key: string;

    constructor(private db: AngularFireDatabase) {
    }

    doUpdate() {
        this.db.list('/family').update(this.key, this.member);
    }
}
