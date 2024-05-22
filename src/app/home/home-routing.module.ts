import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CarritoPage } from '../carrito/carrito.page';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductsPage } from '../products/products.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'cart',
    component: CarritoPage
  },
  {
    path: 'products',
    redirectTo: '404'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'products/:id',
    component: ProductsPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
