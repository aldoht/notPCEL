import { DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, SetOptions, SnapshotOptions, WithFieldValue } from "@angular/fire/firestore";

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  unitPrice: string;
  photoURL: string;
}

export class ProductModelConverter implements FirestoreDataConverter<ProductModel, DocumentData> {
  public toFirestore(modelObject: WithFieldValue<ProductModel>): WithFieldValue<DocumentData> {
    return {
      id: modelObject.id,
      name: modelObject.name,
      description: modelObject.description,
      unitPrice: modelObject.unitPrice,
      photoURL: modelObject.photoURL
    };
  }


  public fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options?: SnapshotOptions | undefined): ProductModel {
    let data = snapshot.data(options);
    return {
        id: data['id'],
        name: data['name'],
        description: data['description'],
        unitPrice: data['unitPrice'],
        photoURL: data['photoURL']
    };
  }
}

export const productConverter = {
  toFirestore: (model: ProductModel) => {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      unitPrice: model.unitPrice,
      photoURL: model.photoURL
    };
  }


}
