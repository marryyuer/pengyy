import { Injectable } from '@angular/core';
import { FamilyMember } from '../model/family-member';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MemberSerivce {

    constructor(private http: Http) {}

    getFamilyMembers(): Promise<FamilyMember[]> {
        // return Promise.resolve(Families);
        return this.http.get('app/families')
                        .toPromise()
                        .then(response => response.json().data as FamilyMember[])
                        .catch(this.handleError);
    };

    getFamilyMembersSlowly(): Promise<FamilyMember[]> {
        return new Promise<FamilyMember[]>(
            resolve => setTimeout(resolve, 2000)
        ).then(() => this.getFamilyMembers());
    };

    getMemberInfoByID(id: number): Promise<FamilyMember> {
        return this.getFamilyMembers().then(members => members.find(member => member.id === id));
    }

    updateFamilyMember(member: FamilyMember): Promise<FamilyMember> {
        let updUrl = 'app/families/${member.id}';
        return this.http.put(updUrl, JSON.stringify(member), {headers: new Headers({'Content-Type': 'application/json'})})
                        .toPromise()
                        .then(() => member)
                        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
