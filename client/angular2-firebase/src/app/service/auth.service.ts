import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { FamilyMember } from '../model/family-member';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user: FamilyMember;
  constructor(private auth: AngularFireAuth) {}

  authenticate() {
    return this.auth.authState;
  }

  login(email: string, password: string): firebase.Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): firebase.Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
               .then(() => {
                const user = this.auth.auth.currentUser;
                 user.sendEmailVerification().then(() => {
                   alert('Please verify your account via email.');
                 });
               });
  }

  reset(email: string): firebase.Promise<any> {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  logout(): firebase.Promise<any> {
    return this.auth.auth.signOut();
  }
}
