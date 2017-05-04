import { Component, OnInit } from '@angular/core';

import { FamilyMember } from './model/family-member';
import { MemberService } from './service/member.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: `dashboard.component.html`,
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    families: FamilyMember[];

    constructor(private memberService: MemberService) {}

    ngOnInit() {
        this.getMemberInfo();
    }

    getMemberInfo() {
        this.memberService.getFamilyMembers().then(members => {
            this.families = members.slice(0, 4);
        });
    }
}
