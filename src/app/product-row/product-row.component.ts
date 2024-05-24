import {Component, OnInit, Output} from '@angular/core';
import {CartProduct, TotalService} from '../total.service';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss'],
})
export class ProductRowComponent implements OnInit {
  @Output()
  productosArray: CartProduct[] = [];

  constructor(private totService: TotalService) {
    totService.cartProductsObs()
      .subscribe(value => {
        this.productosArray = value;
      })
  }

  calculateTotal() {
    return this.totService.calculateSubtotal(this.productosArray);
  }

  async ngOnInit() {
    this.productosArray = await this.totService.cartProducts();

  }
}
