import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FamilyMember } from '../model/family-member';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
    results: FirebaseListObservable<any>;
    name: string;
    constructor(private db: AngularFireDatabase) {}

    ngOnInit() {
      
    }
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

    // doDelete() {
    //     this.results = this.db.list('/family', {
    //         query: {
    //             orderByChild: 'name',
    //             equalTo: this.name
    //         }
    //     });

    //     this.results.subscribe(members => {
    //         members.forEach(member => {
    //             // this.af.database.list('/family').remove(member.$key);
    //             this.db.list('/family/' + member.$key).remove();
    //         });
    //     });
    // }
}
