import { Component, Input } from '@angular/core';
import { } from '@angular/common';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';

import { FamilyMember } from './model/family-member';

@Component({
    selector: 'app-member-detail',
    templateUrl: 'member-detail.component.html'
})
export class MemberDetailComponent {
    @Input() member: FirebaseObjectObservable<any>;
    @Input() key: string;

    constructor(private af: AngularFire) {
    }

    doUpdate() {
        this.af.database.list('/family').update(this.key, this.member);
    }
}
