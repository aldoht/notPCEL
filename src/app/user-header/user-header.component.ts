import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent  implements OnInit {
  // Prueba
  usuario: any = {
    nombre: "Aldo",
    rutaFoto: "https://sm.ign.com/ign_es/news/b/berserk-ma/berserk-manga-to-continue-after-creators-death_92jx.jpg"
  }

  constructor() { }

  ngOnInit() {}

}
