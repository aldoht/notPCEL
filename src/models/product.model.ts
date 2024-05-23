import { DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, SetOptions, SnapshotOptions, WithFieldValue } from "@angular/fire/firestore";

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  photoURL: string;
}

export class ProductModelConverter implements FirestoreDataConverter<ProductModel> {
  public toFirestore(modelObject: WithFieldValue<ProductModel>): WithFieldValue<DocumentData> {
    return {
      name: modelObject.name,
      description: modelObject.description,
      unitPrice: modelObject.unitPrice,
      photoURL: modelObject.photoURL
    };
  }


  public fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions | undefined): ProductModel {
    let data = snapshot.data(options);
    return {
        id: snapshot.id,
        name: data['name'],
        description: data['description'],
        unitPrice: data['unitPrice'],
        photoURL: data['photoURL']
    };
  }
}
