import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { FamilyMember } from './model/family-member';
import { MemberSerivce } from './service/member.service';

@Component({
    moduleId: module.id,
    selector: 'member-search',
    templateUrl: 'member-search.component.html',
    styleUrls: ['member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
    families: Observable<FamilyMember[]>;
    private searchTerms = new Subject<string>();

    constructor(private router: Router,
                private memberService: MemberSerivce) {}

    ngOnInit() {
        this.families = this.searchTerms.debounceTime(300)
                                        .distinctUntilChanged()
                                        .switchMap(term => term ? this.memberService.searchMember(term) : Observable.of<FamilyMember[]>([]))
                                        .catch(error => {
                                            console.error(error);
                                            return Observable.of<FamilyMember[]>([]);
                                        });
    }

    doSearch(term: string) {
        this.searchTerms.next(term);
    }

    gotoDetail(member: FamilyMember) {
        this.router.navigate(['/member-detail', member.id]);
    }
}
