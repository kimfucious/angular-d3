import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
