import {Component, OnInit} from '@angular/core';
import {ProductModel} from 'src/models/product.model';
import {ModalController} from "@ionic/angular";
import {ProductsService} from "../products.service";
import {NotificationsService} from "../notifications.service";
import {v4} from "uuid";
import {FotoService} from "../foto.service";

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
    unitPrice: 0,
    photoURL: ""
  }

  photoTaken: boolean = false;

  constructor(private modalController: ModalController,
              private productService: ProductsService,
              private notificationService: NotificationsService,
              private photoService: FotoService) {
  }

  get showURL() {
    return !this.photoTaken
  }

  async takePhoto() {
    let photo = await this.photoService.takePhoto();

    if (photo.base64String != null) {
      this.producto.photoURL = "data:image/jpeg;charset=utf-8;base64," + photo.base64String
      this.photoTaken = true;
    }

  }

  cerrarModal() {
    this.productService.save(this.producto);

    this.producto = {
      id: v4(),
      name: "",
      description: "",
      unitPrice: 0,
      photoURL: ""
    }

    this.notificationService.createNotification("Producto creado correctamente", "success", 3000)

    // usar servicio para cerrar modal ?
    this.modalController.dismiss()
  }

  ngOnInit() {
  }

}
