import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { FamilyMember } from './model/family-member';
import { MemberSerivce } from './service/member.service';

@Component({
    moduleId: module.id,
    selector: 'member-detail',
    templateUrl: 'member-detail.component.html',
    styleUrls: ['member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
    member: FamilyMember;

    constructor(private memberService: MemberSerivce,
                private router: ActivatedRoute,
                private location: Location) {

    }

    ngOnInit() {
        this.router.params.switchMap((params: Params) => this.memberService.getMemberInfoByID(+params['id']))
                          .subscribe(member => this.member = member);
    }

    goBack() {
        this.location.back();
    }

    doSave() {
        this.memberService.updateFamilyMember(this.member).then(() => this.goBack());
    }
}
