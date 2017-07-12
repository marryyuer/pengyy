import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { FamilyMember } from '../model/family-member';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export class AsyncValidatorService {

    static duplicateUserName(database) {
        return function(control: FormControl): Promise<any> {
            return new Promise((resolve) => {
                let $family = database.list('/family', {
                    query: {
                        orderByChild: 'name',
                        equalTo: control.value
                    }
                });
                $family.debounceTime(1000)
                .distinctUntilChanged()
                .subscribe((result: FamilyMember[]) => {
                    if (result && result.length > 0) {
                        resolve({
                            'duplicateUserName': true
                        });
                    }
                    resolve(null);
                });
            });
        };
    }
}
