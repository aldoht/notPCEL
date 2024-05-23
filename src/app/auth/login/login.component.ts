import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {NotificationsService} from "../../notifications.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private notService: NotificationsService, private router: Router) {
  }

  public correo: string = "";
  public passwd: string = "";

  ngOnInit() {
  }

  generar() {
    this.auth.login(this.correo, this.passwd).then(value => {
      if (value.user == null) {
        this.router.navigate(['/auth/setup']);
        return;
      }

      this.notService.createNotification("Inicio de sesión exitoso", "success", 1500);

      this.auth.updateUser(value.user);

      this.router.navigate(['/home/']);
    }).catch(reason => {
      let message;

      switch (reason['code']) {
        case "auth/invalid-email":
          message = "Correo no válido.";
          break;
        case "auth/invalid-credential":
          message = "Las credenciales no son válidas.";
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
