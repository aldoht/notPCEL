import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  implements OnInit {

  producto: ProductModel = {
    id: "-1",
    name: "",
    description: "",
    unitPrice: "",
    photoURL: ""
  }

  constructor() { }

  cerrarModal() {
    // usar servicio para cerrar modal ?
  }
  ngOnInit() {}

}
