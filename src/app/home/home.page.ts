import {Component, OnInit, Output} from '@angular/core';
import {ProductsService} from "../products.service";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private productIds: string[] = [];

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    this.productIds = await this.productsService.findAllIds();
  }

  get ids() {
    return this.productIds;
  }
}
