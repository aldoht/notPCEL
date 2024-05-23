import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {AuthService} from "../auth.service";
import {UsersService} from "../users.service";
import {updateEmail} from "@angular/fire/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  infoUsuario: any = {
    usuario: "",
    correo: "",
    passwd: "",
    newPasswd: ""
  }

  constructor(private notService: NotificationsService, private authService: AuthService, private userService: UsersService) {
  }

  ngOnInit() {
  }

  get allowChanges(): boolean {
    if (this.infoUsuario.passwd === "") {
      return false;
    }

    if (this.infoUsuario.usuario !== "" || this.infoUsuario.correo !== "" || this.infoUsuario.newPasswd !== "") {
      return true;
    }

    return false;
  }

  crearCambios() {
    let user = this.authService.user();

    if (user === null) {
      return
    }

    if(this.infoUsuario.usuario !== "") {
      user.name = this.infoUsuario.usuario;
    }

    if (this.infoUsuario.correo !== "") {
      this.authService.updateMail(this.infoUsuario.correo).then(value => {
        if(user !== null && this.authService.authUser() !== null) {
          // @ts-ignore
          user.authUserId = this.authService.authUser().uid
          this.userService.save(user);
        }
      }).catch(reason => {
        this.notService.createNotification("Hubo un error al realizar tu cambio de correo", "error", 1000);
      });
    }

    if (this.infoUsuario.newPasswd !== "") {
      this.authService.updatePasswd(this.infoUsuario.newPasswd).catch(reason => {
        this.notService.createNotification("Hubo un error al realizar tu cambio de contraseña", "error", 1000);
      });
    }

    this.userService.save(user);

    this.notService.createNotification("Cambios hechos correctamente", "success", 1000);
    this.infoUsuario = {
      usuario: "",
      correo: "",
      passwd: "",
      newPasswd: ""
    }
  }

}
