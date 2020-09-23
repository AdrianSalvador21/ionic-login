import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(public authentication: AngularFireAuth) { }

  loginGoogle() {
    return this.doAuth(new firebase.auth.GoogleAuthProvider());
  }

  loginEmail(user) {
    return this.authentication.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.authentication.signOut();
  }

  registerUser(user) {
    return this.authentication.createUserWithEmailAndPassword(user.email, user.password);
  }

  doAuth(provider: any) {
    if (!( window as any).cordova) {
      return this.authentication.signInWithPopup(provider);
    } else {
      this.authentication.signInWithRedirect(provider)
        .then(() => {
          return this.authentication.getRedirectResult();
        });
    }
  }

}
