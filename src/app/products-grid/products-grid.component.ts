import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent  implements OnInit {
  private productIds: string[] = [];

  constructor(private productsService: ProductsService, private router: Router) { }

  async ngOnInit() {
    this.productIds = await this.productsService.findAllIds();
  }

  get ids() {
    return this.productIds;
  }

  navigateToPage(productId: string) {
    this.router.navigate(['/home/products/', productId]);
  }
}
