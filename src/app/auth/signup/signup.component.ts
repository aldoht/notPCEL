import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {NotificationsService} from 'src/app/notifications.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private notService: NotificationsService, private router: Router) {
  }

  public correo: string = "";
  public passwd: string = "";

  ngOnInit() {
  }

  generar() {
    this.auth.signUp(this.correo, this.passwd).then(value => {
      this.notService.createNotification("Se ha creado la cuenta exitosamente", "success", 1500);

      if (value.user == null) {
        this.router.navigate(['/auth/setup']);
        return;
      }

      this.auth.updateUser(value.user);


      this.router.navigate(['/home/']);
    }).catch(reason => {
      let message;

      switch (reason['reason']) {
        case "auth/invalid-email":
          message = "Correo no válido.";
          break;
        case "auth/invalid-credential":
          message = "Las credenciales no son válidas.";
          break;
        case "auth/weak-password":
          message = "La contraseña debe de tener al menos 6 caracteres."
          break;
        case "auth/email-already-in-use":
          message = "El correo ya fue vinculado a otra cuenta.";
          break;
        default:
          message = "Error desconocido";
          break;
      }

      this.notService.createNotification(message, "danger", 1500);
    })
  }
}
