import {Component, OnInit, Output} from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {AuthService} from "../auth.service";
import {UsersService} from "../users.service";
import {updateEmail} from "@angular/fire/auth";
import {FotoService} from "../foto.service";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Output()
  infoUsuario: any = {
    usuario: "",
    correo: "",
    passwd: "",
    newPasswd: "",
    photoURL: "https://ionicframework.com/docs/img/demos/avatar.svg"
  }


  constructor(private notService: NotificationsService, private authService: AuthService, private userService: UsersService, public photoService: FotoService) {
  }

  ngOnInit() {
  }

  get allowChanges(): boolean {
    if (this.infoUsuario.passwd === "") {
      return false;
    }

    if (this.infoUsuario.usuario !== "" || this.infoUsuario.correo !== "" || this.infoUsuario.newPasswd !== "" || this.infoUsuario.photoURL !== "" && this.infoUsuario.photoURL !==
      "https://ionicframework.com/docs/img/demos/avatar.svg"
    ) {
      return true;
    }

    return false;
  }

  get photo(): Subject<string> {
    return this.infoUsuario.photoURL === "" ? "https://ionicframework.com/docs/img/demos/avatar.svg" : this.infoUsuario.photoURL;
  }

  async takePhoto() {
    let photo = await this.photoService.takePhoto();

    if (photo.base64String != null) {
      this.infoUsuario.photoURL = "data:image/jpeg;charset=utf-8;base64," + photo.base64String
    }

  }

  crearCambios() {
    let user = this.authService.user();

    if (user === null) {
      return
    }

    if (this.infoUsuario.usuario !== "") {
      user.name = this.infoUsuario.usuario;
    }

    if (this.infoUsuario.correo !== "") {
      this.authService.updateMail(this.infoUsuario.correo).then(value => {
        if (user !== null && this.authService.authUser() !== null) {
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

    if (this.infoUsuario.photoURL !== "" && this.infoUsuario.photoURL !== "https://ionicframework.com/docs/img/demos/avatar.svg") {
      user.photoUrl = this.infoUsuario.photoURL;
    }

    this.userService.save(user);

    this.notService.createNotification("Cambios hechos correctamente", "success", 1000);
    this.infoUsuario = {
      usuario: "",
      correo: "",
      passwd: "",
      newPasswd: "",
      photoURL: "https://ionicframework.com/docs/img/demos/avatar.svg"
    }
  }

}
