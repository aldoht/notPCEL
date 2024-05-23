import {Component, OnInit, Output} from '@angular/core';
import {CartProduct, TotalService} from '../total.service';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss'],
})
export class ProductRowComponent  implements OnInit {
  @Output()
  productosArray: CartProduct[] = [];

  constructor(private totService: TotalService) {
  }

  calculateTotal() {
    let total = 0;
    for (let product of this.productosArray) {
      total += product.quantity * product.unitPrice;
    }
    return total;
  }

  async ngOnInit() {
    this.productosArray = await this.totService.getCartProducts();
    this.totService.setSubtotal(this.calculateTotal());
  }

  async get() {
    return this.totService.getCartProducts();
  }

  async subtotal() {

  }
}
