import {Component, OnInit} from '@angular/core';
import {ProductModel} from 'src/models/product.model';
import {ModalController} from "@ionic/angular";
import {ProductsService} from "../products.service";
import {NotificationsService} from "../notifications.service";
import {v4} from "uuid";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  producto: ProductModel = {
    id: v4(),
    name: "",
    description: "",
    unitPrice: "",
    photoURL: ""
  }

  constructor(private modalController: ModalController,
              private productService: ProductsService,
              private notificationService: NotificationsService) {
  }

  cerrarModal() {
    this.productService.save(this.producto);

    this.producto = {
      id: v4(),
      name: "",
      description: "",
      unitPrice: "",
      photoURL: ""
    }

    this.notificationService.createNotification("Producto creado correctamente", "success", 3000)

    // usar servicio para cerrar modal ?
    this.modalController.dismiss()
  }

  ngOnInit() {
  }

}
