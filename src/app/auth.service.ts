import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserModel} from "../models/user.model";
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: Auth) {
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    return signOut(this.afAuth);
  }

  get isAuthenticated(): boolean {
    return getAuth().currentUser !== null;
  }

  user(): string | null {
    let authUser = getAuth().currentUser;

    return authUser != null ? authUser.uid : null;
  }
}
