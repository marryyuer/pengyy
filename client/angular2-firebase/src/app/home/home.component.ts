import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { DataSource } from '@angular/cdk';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as moment from 'moment';

import { MemberInfoComponent } from '../member-info/member-info.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TitleService } from '../service/title.service';
import { FamilyMember } from '../model/family-member';
import { TableDataSource } from '../model/TableDataSource';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showTitleArea = true;
  newTitle = '';
  modes = ['table', 'list'];
  displayMode = 'list';
  selectedIndex = 0;
  emitter = new EventEmitter();
  items: FirebaseListObservable<any[]>;
  constants: FirebaseObjectObservable<any>;
  displayedColumns = ['name', 'age', 'location', 'operation'];
  userDataSouce: TableDataSource;
  selectedMember: FirebaseListObservable<any>;
  newItem = new FamilyMember();

  constructor(private db: AngularFireDatabase,
              private router: Router,
              private dialog: MdDialog,
              private titleService: TitleService) {
    this.items = this.db.list('family/members');
    this.constants = this.db.object('/constants');
    console.log(moment('05', 'MM').format('MMMM'));
    this.titleService.changeTitle('Home');
    this.userDataSouce = new TableDataSource(this.db);
  }

  ngOnInit() {
  }

  @HostListener('click')
  toggle() {
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
    if (!this.newTitle) {
      alert('The new title should not be empty!');
      return;
    }
    this.constants.update({'title': this.newTitle}).then(() => {
      this.showTitleArea = true;
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