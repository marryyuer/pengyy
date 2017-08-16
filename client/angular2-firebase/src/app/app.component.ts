import { Component, HostListener } from '@angular/core';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';

import { PlatformLocation } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { FamilyMember } from './model/family-member';
import { AuthService } from './service/auth.service';

import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginStatus = false;
  loginItems = [
    {
      icon: 'settings_overscan',
      text: 'Overview',
      url: 'overview',
    }, {
      icon: 'home',
      text: 'HOME',
      url: 'home',
    }, {
      icon: 'info',
      text: 'ABOUT',
      url: 'about'
    }, {
      icon: 'power_settings_new',
      text: 'LogOut',
      url: 'logout'
    }
  ];
  guestItems = [
    {
      icon: 'settings_overscan',
      text: 'OVERVIEW',
      url: 'overview',
    }, {
      icon: 'info',
      text: 'ABOUT',
      url: 'about'
    }, {
      icon: 'vpn_key',
      text: 'LogIn',
      url: 'login'
    }
  ];
  constructor(private router: Router,
              private authService: AuthService,
              private dialog: MdDialog,
              private location: PlatformLocation) {
    this.authService.authenticate().subscribe(user => {
      if (!user) {
        this.loginStatus = false;
      } else {
        this.loginStatus = true;
      }
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
      }
    });
    this.location.onPopState(() => {
      console.log('PopState triggered!');
      console.log(this.location);
    });
  }

  navigate(url: string) {
    if (!url) {
      return false;
    }
    if (url === 'logout') {
      this.authService.logout();
      url = 'login';
    }

    this.router.navigate(['./' + url]);
  }

  @HostListener('window: unload', ['$event'])
  confirm(event) {
    // window.open('https://192.168.5.76:4200', '_blank');
    // window.close();
    return event.returnValue = false;
    // const config = new MdDialogConfig();
    // config.data = {
    //   message: 'Are you sure to leave the site?',
    //   icon: 'info'
    // };
    // let dialogRef = this.dialog.open(DialogConfirmComponent, config);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'cancel') {
    //     event.preventDefault();
    //   }
    // });
  }
}
