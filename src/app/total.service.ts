import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  subtotal: number = 0;
  carritoArray: CartProduct[] = [
  ]

  getArrayCarrito() {
    return this.carritoArray;
  }

  setSubtotal(subtotal: number) {
    if (subtotal < 0)
      return;
    this.subtotal = subtotal;
  }

  getSubtotal() {
    return this.subtotal;
  }

  limpiarCarrito() {
    let size = this.carritoArray.length;
    for (let I = 0; I < size; I++) {
      this.carritoArray.pop();
    }
  }

  constructor() { }
}

export interface CartProduct {
  quantity: number,
  name: string,
  description: string,
  unitPrice: number,
  photoURL: string
}
