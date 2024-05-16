import {Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {databaseInstance$} from "@angular/fire/database";
import {
  collection,
  CollectionReference,
  doc,
  documentId,
  getDoc,
  getDocs, limit,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {UserModel, UserModelConverter} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly coll: CollectionReference<UserModel>;

  constructor(private database: DatabaseService) {
    this.coll = collection(this.database.database, "users").withConverter(new UserModelConverter());
  }

  async findOne(id: string) {
    return getDoc(doc(this.coll, id))
  }

  async findOneByAuthId(id: string) {
    return getDocs(query(this.coll, where("authUserId", "==", id), limit(1)))
  }

  public async find(id: string) {
    return await getDocs(query(this.coll, where(documentId(), "==", id)));
  }

  public async findAll() {
    return await getDocs(this.coll);
  }

  public async findAllIds() {
    return await getDocs(this.coll)
      .then(value => value.empty ? [] : value.docs.map(value1 => value1.id));
  }

  public async save(model: UserModel) {
    return await setDoc(doc(this.coll, model.id), model)
  }
}
