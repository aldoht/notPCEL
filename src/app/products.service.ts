import {Injectable} from '@angular/core';
import {DatabaseService} from './database.service';
import {
  CollectionReference,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  getDoc, documentId
} from '@angular/fire/firestore';
import {ProductModel, ProductModelConverter} from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly coll: CollectionReference<ProductModel>;

  constructor(private db: DatabaseService) {
    this.coll = collection(this.db.database, "products").withConverter(new ProductModelConverter);
  }

  public async findOne(id: string) {
    return await getDoc(doc(this.coll, id));
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

  public async save(model: ProductModel) {
    return await setDoc(doc(this.coll, model.id), model)
  }

}
