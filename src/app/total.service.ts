import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  subtotal: number = 0;
  carritoArray: any[] = [
    {
      quantity: "-1",
      name: "NombreProducto",
      description: "N/A",
      unitPrice: "-1",
      photoURL: "https://m.media-amazon.com/images/I/61-7uGhZfQL._AC_UF894,1000_QL80_.jpg"
    },
    {
      quantity: "-1",
      name: "NombreProducto",
      description: "N/A",
      unitPrice: "-1",
      photoURL: "https://m.media-amazon.com/images/I/61-7uGhZfQL._AC_UF894,1000_QL80_.jpg"
    },
    {
      quantity: "-1",
      name: "NombreProducto",
      description: "N/A",
      unitPrice: "-1",
      photoURL: "https://m.media-amazon.com/images/I/61-7uGhZfQL._AC_UF894,1000_QL80_.jpg"
    },
    {
      quantity: "-1",
      name: "NombreProducto",
      description: "N/A",
      unitPrice: "-1",
      photoURL: "https://m.media-amazon.com/images/I/61-7uGhZfQL._AC_UF894,1000_QL80_.jpg"
    }
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
