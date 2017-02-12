import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyMember } from './model/family-member';
import { MemberSerivce } from './service/member.service';

@Component({
    moduleId: module.id,
    selector: 'family-member',
    templateUrl: 'member.component.html',
    styleUrls: ['member.component.css']
})
export class FamilyMemberComponent implements OnInit {
    title = 'Families of Peng';
    selectedMember: FamilyMember;
    families: FamilyMember[];
    constructor(private memberService: MemberSerivce,
                private router: Router) {

    }

    ngOnInit() {
        this.getMemberInfo();
    }

    getMemberInfo() {
        this.memberService.getFamilyMembersSlowly().then(members => this.families = members);
    }

    onSelect(member: FamilyMember) {
        this.selectedMember = member;
    }

    gotoDetail() {
        this.router.navigate(['/member-detail', this.selectedMember.id]);
    }
}
