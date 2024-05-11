import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Sign up successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

  async user(): Promise<string | null> {
    let authUser = await this.afAuth.currentUser;

    return authUser != null ? authUser.uid : null;
  }
}
