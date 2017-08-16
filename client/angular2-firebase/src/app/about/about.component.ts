import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  proposals: FirebaseListObservable<any>;
  audio: any;
  constructor(
    private dialog: MdDialog,
    private db: AngularFireDatabase
  ) {
    this.proposals = this.db.list('proposals/advices');
  }

  ngOnInit() { 
    this.audio = new Audio();
    this.audio.src = '../../assets/Guardian Spirits of Pandaria.mp3';
    this.audio.loop = true;
    this.audio.play();
  }

  ngOnDestroy() {
    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  openContact() {
    const config = new MdDialogConfig();
    config.disableClose = true;
    config.width = '600px';
    config.height = '380px';
    this.dialog.open(ContactComponent, config);
  }
}
