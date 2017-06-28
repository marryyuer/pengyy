import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import * as _ from 'lodash';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FamilyMember } from '../model/family-member';

@Component({
    selector: 'app-member-search',
    templateUrl: './member-search.component.html',
    styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
    name: FormControl;
    results: any;

    constructor(private db: AngularFireDatabase) {
        this.name = new FormControl();
        this.name.valueChanges.subscribe(val => {
            if (val) {
                this.doSearch();
            } else {
                this.results = null;
            }
        });
    }

    ngOnInit() { }

    doSearch() {
        this.results = this.db.list('/family', {
            query: {
                orderByChild: 'name',
                equalTo: this.name.value
            }
        });
    }
}
