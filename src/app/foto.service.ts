import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  constructor() {
  }

  public async takePhoto() {
    let capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      saveToGallery: true,
      quality: 100
    });

    return capturedPhoto
  }

}

