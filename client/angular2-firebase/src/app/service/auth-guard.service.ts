import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanDeactivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private af: AngularFireAuth, private router: Router, private snack: MdSnackBar) {}

  canActivate() {
    const auth = this.af.authState.map(user => {
      if (user) {
        return true;
      } else {
        this.snack.open('Please login first.', 'undo', { duration: 3000 });
        this.router.navigate(['/login']);
        return false;
      }
    });
    return auth;
  }

  canActivateChild() {
    console.log('AuthGuard#canActivateChild called');
    return true;
  }
}
