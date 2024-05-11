import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { CollectionReference, DocumentData, collection, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ProductModel, ProductModelConverter } from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private coll: CollectionReference<DocumentData, DocumentData>;

  constructor(private db: DatabaseService) {
    this.coll = collection(this.db.database, "user");
  }

  public async find(id: string) {
    return await getDocs(query(this.coll, where("id", "==", id)).withConverter(new ProductModelConverter));
  }

  public async findAll(id: string) {
    return await getDocs(query(this.coll).withConverter(new ProductModelConverter));
  }

  public async save(model: ProductModel) {
    return await setDoc(doc(this.coll, model.id).withConverter(new ProductModelConverter), model)
  }

}
