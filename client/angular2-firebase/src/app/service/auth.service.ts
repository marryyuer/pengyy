import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string): firebase.Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): firebase.Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  reset(email: string): firebase.Promise<any> {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  logout(): firebase.Promise<any> {
    return this.auth.auth.signOut();
  }
}
