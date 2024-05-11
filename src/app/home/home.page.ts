import {Component, OnInit, Output} from '@angular/core';
import {ProductsService} from "../products.service";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
