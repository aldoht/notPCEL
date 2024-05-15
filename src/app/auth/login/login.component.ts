import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {NotificationsService} from "../../notifications.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private notService: NotificationsService) {
  }

  public usuario: string = "";
  public passwd: string = "";

  ngOnInit() {
  }

  generar() {
    this.auth.login(this.usuario, this.passwd).then(value => {
      this.notService.createNotification("Login exitoso", "#aabbcc", 1500);

    }).catch(reason => {
      let message;
      console.log(reason)


      switch (reason['code']) {
        case "auth/invalid-email":
          message = "Usuario no encontrado.";
          break;
        case "auth/user-disabled":
          message = "Tu usuario ha sido deshabilitado."
          break;
        case "auth/user-not-found":
          message = "Usuario no encontrado.";
          break;
        case "auth/wrong-password":
          message = "Contraseña incorrecta";
          break;
        default:
          message = "Error desconocido";
          break;
      }

      this.notService.createNotification(message, "danger", 1500);
    })
  }
}
