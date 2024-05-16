import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {UsersService} from "./users.service";
import {UserCredential} from "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ourUser: UserModel | null = null;
  private _ready = false;
  private readonly _readyPromise: Promise<void>;

  constructor(private afAuth: Auth, private service: UsersService) {
   this._readyPromise = new Promise(resolve => {
      afAuth.onAuthStateChanged(async value => {
        if (value == null) {
          return
        }

        let snapshot = (await this.service.findOneByAuthId(value.uid));

        if (!snapshot.empty) {
          this.ourUser = snapshot.docs[0].data()
        }

        this._ready = true;
        resolve()
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
