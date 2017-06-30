import { Component, Inject, OnInit } from '@angular/core';
import { FamilyMember } from '../model/family-member';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: FamilyMember;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.member = data;
  }

  ngOnInit() {

  }

}
