import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Color} from "@ionic/core"

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private controller: ToastController) {
  }

  async createNotification(message: string, color: Color, duration: number) {
    let toast = await this.controller.create({
      message: message,
      animated: true,
      color: color,
      position: "top",
      duration: duration,
      swipeGesture: "vertical"
    });

    return toast.present().then(value => toast);
  }

  dismiss(role: string, id?: string) {
    return this.controller.dismiss(null, role, id)
  }
}
