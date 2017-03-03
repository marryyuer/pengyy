import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FamilyMember } from './model/family-member';
import { MemberSerivce } from './service/member.service';

@Component({
    moduleId: module.id,
    selector: 'new-member',
    templateUrl: 'new-member.component.html',
    styleUrls: ['new-member.component.css']
})
export class NewMemberComponent implements OnInit {
    member: FamilyMember = new FamilyMember();
    
    memberAddress= [{
        address: 'Beijing',
        index: 0
    },
    {
        address: 'Xian',
        index: 1
    },
    {
        address: 'Zhengzhou',
        index: 2
    },
    {
        address: 'ChongQing',
        index: 3
    }];

    submitted: boolean = false;

    constructor(private router: ActivatedRoute,
                private location: Location,
                private memberService: MemberSerivce) {

    }

    ngOnInit() {
        // this.member.address = '1';
    }
    doSubmit() {
        this.submitted = true;
    }

    doReset() {
        this.member = new FamilyMember();
    }

    goBack() {
        this.location.back();
    }
}
