import { Component, Input } from '@angular/core';
import { } from '@angular/common';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { FamilyMember } from './model/family-member';

@Component({
    selector: 'app-member-detail',
    templateUrl: 'member-detail.component.html'
})
export class MemberDetailComponent {
    @Input() member: FirebaseObjectObservable<any>;
    @Input() family: FirebaseListObservable<any[]>;

    doUpdate() {
        // this.family.update(this.member.$key, this.member);
    }
}
