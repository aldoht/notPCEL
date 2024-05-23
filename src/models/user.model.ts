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
  role: 'USER' | 'SUPERUSER';
}

export class UserModelConverter implements FirestoreDataConverter<UserModel> {
  public toFirestore(modelObject: WithFieldValue<UserModel>): WithFieldValue<DocumentData> {
    let favorites = modelObject.favorites as Set<string>;

    return {
      name: modelObject.name,
      authUserId: modelObject.authUserId,
      photoUrl: modelObject.photoUrl,
      favorites: Array.from(favorites),
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

    return {
      id: snapshot.id,
      name: data['name'],
      authUserId: data['authUserId'],
      photoUrl: data['photoUrl'],
      favorites: new Set(data['favorites']),
      role: data['role']
    };
  }
}
