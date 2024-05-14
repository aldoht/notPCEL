import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public usuario: string = "";
  public passwd: string = "";

  ngOnInit() {
  }

  generar() {
    this.auth.signUp(this.usuario, this.passwd).then(value => {
      console.log(value)
    }).catch(reason => {
      console.log(reason)
    })
  }
}
