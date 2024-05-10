import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent  implements OnInit {
  // Prueba
  usuario: UserModel = {
    id: "prueba",
    name: "Aldo",
    photoUrl: "https://sm.ign.com/ign_es/news/b/berserk-ma/berserk-manga-to-continue-after-creators-death_92jx.jpg"
  }

  constructor() { }

  ngOnInit() {}

}
