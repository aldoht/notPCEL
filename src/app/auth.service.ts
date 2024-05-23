import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth, reauthenticateWithCredential, setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateEmail, updatePassword, browserSessionPersistence
} from "@angular/fire/auth";
import {UsersService} from "./users.service";
import {EmailAuthProvider, UserCredential} from "@firebase/auth";
import {PERSISTENCE} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ourUser: UserModel | null = null;
  private _ready = false;
  private readonly _readyPromise: Promise<void>;

  constructor(private afAuth: Auth, private service: UsersService) {
    this._readyPromise = new Promise(resolve => {
      this.afAuth.authStateReady().then(value => {
        let authUser = this.authUser();

        if (authUser === null) {
          resolve()
          return
        }

        let snapshotPromise = this.service.findOneByAuthId(authUser.uid);
        snapshotPromise.then(snapshot => {
          if (!snapshot.empty) {
            this.ourUser = snapshot.docs[0].data()
          }

          this._ready = true;
          resolve()
        })
      })
    })
  }

  readyPromise() {
    return this._readyPromise
  }

  get ready() {
    return this._ready;
  }

  signUp(email: string, password: string): Promise<AuthResponse> {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then(async value => {
        let snapshot = (await this.service.findOneByAuthId(value.user.uid));
        let user = snapshot.empty ? undefined : snapshot.docs[0].data();

        return {
          credentials: value,
          user: user
        };
      });
  }

  login(email: string, password: string): Promise<AuthResponse> {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then(async value => {
        let snapshot = (await this.service.findOneByAuthId(value.user.uid));
        let user = snapshot.empty ? undefined : snapshot.docs[0].data();

        return {
          credentials: value,
          user: user
        };
      });
  }

  refreshLogin(email: string, password: string) {
    let user = this.authUser();
    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    return reauthenticateWithCredential(user, EmailAuthProvider.credential(email, password))
  }

  updateMail(email: string) {
    let user = this.authUser();
    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    return updateEmail(user, email)
  }

  updatePasswd(password: string) {
    let user = this.authUser();
    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    return updatePassword(user, password)
  }

  logout() {
    return signOut(this.afAuth);
  }

  get isAuthenticated(): boolean {
    return this.authUser() !== null;
  }

  get shouldSetup(): boolean {
    return this.isAuthenticated && this.user() === null;
  }

  user(): UserModel | null {
    return this.ourUser;
  }

  authUser() {
    return getAuth().currentUser;
  }

  updateUser(user: UserModel) {
    if (user == null) {
      return
    }

    this.ourUser = user;
  }
}

export interface AuthResponse {
  credentials: UserCredential;
  user?: UserModel;
}
