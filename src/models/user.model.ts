import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue
} from "@angular/fire/firestore";

export interface UserModel {
  id: string;
  authUserId: string;
  name: string;
  photoUrl: string;
  favorites: Set<string>;
  cart: Map<string, number>;
  role: 'USER' | 'SUPERUSER';
}

export class UserModelConverter implements FirestoreDataConverter<UserModel> {
  public toFirestore(modelObject: WithFieldValue<UserModel>): WithFieldValue<DocumentData> {
    let favorites = modelObject.favorites as Set<string>;
    let cart = modelObject.cart as Map<string, number>;

    return {
      name: modelObject.name,
      authUserId: modelObject.authUserId,
      photoUrl: modelObject.photoUrl,
      favorites: Array.from(favorites),
      cart: Object.fromEntries(cart),
      role: modelObject.role
    };
  }

  public fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions | undefined): UserModel {
    let data = snapshot.data(options);

    if (data['role'] === null) {
      data['role'] = 'USER'
    }

    if (data['favorites'] === undefined) {
      data['favorites'] = [];
    }

    if(data['cart'] === undefined) {
      data['cart'] = {}
    }

    return {
      id: snapshot.id,
      name: data['name'],
      authUserId: data['authUserId'],
      photoUrl: data['photoUrl'],
      favorites: new Set(data['favorites']),
      cart: new Map(Object.entries(data['cart'])),
      role: data['role']
    };
  }
}
