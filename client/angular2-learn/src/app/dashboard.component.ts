import { Component,OnInit } from '@angular/core';

import { FamilyMember } from './model/family-member';
import { MemberSerivce } from './service/member.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: `dashboard.component.html`
})
export class DashboardComponent {
    families: FamilyMember[];

    constructor(private memberService: MemberSerivce) {}

    ngOnInit() {
        this.getMemberInfo();
    }

    getMemberInfo() {
        this.memberService.getFamilyMembers().then(members => this.families = members.slice(0, 4));
    }
}
