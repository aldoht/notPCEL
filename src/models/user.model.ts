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
}

export class UserModelConverter implements FirestoreDataConverter<UserModel> {
  public toFirestore(modelObject: WithFieldValue<UserModel>): WithFieldValue<DocumentData> {
    return {
      name: modelObject.name,
      authUserId: modelObject.authUserId,
      photoUrl: modelObject.photoUrl
    };
  }


  public fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions | undefined): UserModel {
    let data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data['name'],
      authUserId: data['authUserId'],
      photoUrl: data['photoUrl']
    };
  }
}
