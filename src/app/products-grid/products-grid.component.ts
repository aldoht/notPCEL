import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent  implements OnInit {
  private productIds: string[] = [];

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    this.productIds = await this.productsService.findAllIds();
  }

  get ids() {
    return this.productIds;
  }
}
