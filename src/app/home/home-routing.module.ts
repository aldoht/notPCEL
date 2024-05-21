import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CarritoPage } from '../carrito/carrito.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'cart',
    component: CarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
