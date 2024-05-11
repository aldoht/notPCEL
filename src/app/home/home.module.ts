import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { UserHeaderComponent } from '../user-header/user-header.component';
import { ProductViewComponent } from '../product-view/product-view.component';
import {ProductsGridComponent} from "../products-grid/products-grid.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UserHeaderComponent, ProductViewComponent, ProductsGridComponent]
})
export class HomePageModule {}
