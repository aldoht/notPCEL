import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  infoUsuario: any = {
    usuario: "",
    correo: "",
    passwd: ""
  }

  constructor(private notService: NotificationsService) {}

  ngOnInit() {
  }

  crearCambios() {
    /** Interactuar con el servicio y modificar esto */
    this.notService.createNotification("Cambios hechos correctamente", "success", 1000);
    this.infoUsuario = {
      usuario: "",
      correo: "",
      passwd: ""
    }
  }

}
