import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FamilyMember } from './model/family-member';
import { AuthService } from './service/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginStatus = false;
  items = [
    {
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
  constructor(private auth: AngularFireAuth,
              private router: Router,
              private authService: AuthService) {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.loginStatus = false;
      } else {
        this.loginStatus = true;
      }
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
}
