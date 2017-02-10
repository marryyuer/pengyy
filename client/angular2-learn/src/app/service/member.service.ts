import { Injectable } from '@angular/core';
import { FamilyMember } from '../model/family-member';

const Families: FamilyMember[] = [
        {id: 1, name: 'Pengyy', address: 'Beijing'},
        {id: 2, name: 'YuerBaby', address: 'Beijing'},
        {id: 3, name: 'Mama', address: 'Zhengzhou'},
        {id: 4, name: 'Xinxin', address: 'Chongqing'},
    ];

@Injectable()
export class MemberSerivce {
    getFamilyMembers(): Promise<FamilyMember[]> {
        return Promise.resolve(Families);
    };

    getFamilyMembersSlowly(): Promise<FamilyMember[]> {
        return new Promise<FamilyMember[]>(
            resolve => setTimeout(resolve, 2000)
        ).then(() => this.getFamilyMembers());
    };

    getMemberInfoByID(id: number): Promise<FamilyMember> {
        return this.getFamilyMembers().then(members => members.find(member => member.id === id));
    }
}
