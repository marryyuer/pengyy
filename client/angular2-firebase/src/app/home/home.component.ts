import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as moment from 'moment';

import { MemberInfoComponent } from '../member-info/member-info.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TitleService } from '../service/title.service';
import { FamilyMember } from '../model/family-member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showUpdArea = false;
  newTitle = '';
  selectedIndex = 0;
  items: FirebaseListObservable<any[]>;
  constants: FirebaseObjectObservable<any>;

  selectedMember: FirebaseListObservable<any>;
  newItem = new FamilyMember();

  constructor(private db: AngularFireDatabase,
              private router: Router,
              private dialog: MdDialog,
              private titleService: TitleService) {
    this.items = this.db.list('family');
    this.constants = this.db.object('/constants');
    console.log(moment('05', 'MM').format('MMMM'));
    this.titleService.changeTitle('Home');
  }

  ngOnInit() {
  }

  @HostListener('click')
  toggleMenu() {
    console.log('home click triggered');
    // TODO: hide menu when it's opened currently
  }

  deleteItem(member: any) {
    const config = new MdDialogConfig();
    config.data = {
      icon: 'delete_forever',
      message: 'Are you sure to delete user: ' + member.name + '?'
    };
    config.width = '500px';
    config.height = '210px';
    config.disableClose = true;
    const dialogRef = this.dialog.open(DialogConfirmComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.items.remove(member);
      }
    });
  }

  updateTitle() {
    this.constants.update({'title': this.newTitle}).then(() => {
      this.showUpdArea = false;
    });
  }

  editItem(item: FamilyMember) {
    const config = new MdDialogConfig();
    config.data = item;
    config.disableClose = true;
    this.dialog.open(MemberInfoComponent, config);
  }

  showMemberDetail(member: FamilyMember) {
    const config = new MdDialogConfig();
    config.data = member;
    this.dialog.open(MemberDetailComponent, config);
  }
}