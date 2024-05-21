import { Component, OnInit } from '@angular/core';
import { TotalService } from '../total.service';
import { NotificationsService } from '../notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  informacionEnvio: any = {
    calle: "",
    colonia: "",
    municipio: "",
    estado: "",
    codigoPostal: ""
  }

  constructor(private totService: TotalService, private notService: NotificationsService, private router: Router) { }

  subTotal: number = 0;

  ngOnInit() {
    this.subTotal = this.totService.getSubtotal();
  }

  procesarEnvio() {
    this.notService.createNotification("Pedido enviado", "success", 1000);
    this.router.navigate(["/home/"]);
    this.totService.limpiarCarrito();
    this.informacionEnvio = {
      calle: "",
      colonia: "",
      municipio: "",
      estado: "",
      codigoPostal: ""
    }
    this.subTotal = 0;
  }

}
