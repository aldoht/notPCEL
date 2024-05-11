import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: Firestore) {
  }

  get database() {
    return this.db;
  }
}
