import { Component, OnInit, numberAttribute } from '@angular/core';
import {CartProduct, TotalService} from '../total.service';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss'],
})
export class ProductRowComponent  implements OnInit {
  productosArray: CartProduct[];

  constructor(private totService: TotalService) {
    this.productosArray = this.totService.getArrayCarrito();
    this.totService.setSubtotal(this.calculateTotal());
  }

  calculateTotal() {
    let total = 0;
    for (let product of this.productosArray) {
      total += product.quantity * product.unitPrice;
    }
    return total;
  }

  ngOnInit() {}

}
