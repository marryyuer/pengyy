import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FamilyMember } from './model/family-member';

@Component({
    selector: 'app-member-search',
    templateUrl: 'member-search.component.html'
})
export class MemberSearchComponent {
    results: FirebaseListObservable<any>;
    name: string;
    constructor(private db: AngularFireDatabase) {}

    doSearch() {
        this.results = this.db.list('/family', {
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
        this.results = this.db.list('/family', {
            query: {
                orderByChild: 'name',
                equalTo: this.name
            }
        });

        this.results.subscribe(members => {
            members.forEach(member => {
                // this.af.database.list('/family').remove(member.$key);
                this.db.list('/family/' + member.$key).remove();
            });
        });
    }
}