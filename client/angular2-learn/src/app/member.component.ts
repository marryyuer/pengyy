import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyMember } from './model/family-member';
import { MemberService } from './service/member.service';
// import { memberServiceProvider } from './service/member.service.provider';

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

    minAge = 10;
    maxAge = 50;

    constructor(private memberService: MemberService,
                private router: Router) {}

    ngOnInit() {
        this.getMemberInfo();

        // transfer to detail after 5 seconds
        // setTimeout((router: Router) => {
        //     this.router.navigate(['new-member']);
        // }, 5000);
    }

    getMemberInfo() {
        this.memberService.getFamilyMembers().then(members => this.families = members);
    }

    onSelect(member: FamilyMember) {
        this.selectedMember = member;
    }

    doAdd(name: string) {
        name = name.trim();
        if (!name) { return; }

        this.memberService.addFamilyMember(name).then(member => {
            this.families.push(member);
            this.selectedMember = null;
        });
    }

    doDelete(delMember: FamilyMember) {
        this.memberService.deleteFamilyMember(delMember).then(() => {
            this.families = this.families.filter(member => member !== delMember);
            if (this.selectedMember === delMember) { this.selectedMember = null; };
        });
    }

    gotoDetail() {
        this.router.navigate(['/member-detail', this.selectedMember.id]);
    }
}
