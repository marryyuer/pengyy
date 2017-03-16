import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FamilyMember } from './model/family-member';

@Component({
    selector: 'app-member-search',
    templateUrl: 'member-search.component.html'
})
export class MemberSearchComponent {
    results: FirebaseListObservable<any>;
    name: string;
    constructor(private af: AngularFire) {}

    doSearch() {
        this.results = this.af.database.list('/family', {
            query: {
                orderByChild: 'name',
                equalTo: this.name
            }
        });
        this.results.subscribe(items => {
            console.log(items);
        });
    }

    doDelete() {
        this.results = this.af.database.list('/family', {
            query: {
                orderByChild: 'name',
                equalTo: this.name
            }
        });

        this.results.subscribe(members => {
            members.forEach(member => {
                // this.af.database.list('/family').remove(member.$key);
                this.af.database.list('/family/' + member.$key).remove();
            });
        });
    }
}