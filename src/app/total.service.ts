import {Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {ProductModel} from "../models/product.model";
import {AuthService} from "./auth.service";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  subtotal: number = 0;
  carritoArray: CartProduct[] = []

  constructor(private authService: AuthService, private productsService: ProductsService, private userService: UsersService) {
  }

  async getCartProducts() : Promise<CartProduct[]> {
    let user = this.authService.user();

    if (user === null) {
      return [];
    }

    let cartProducts: CartProduct[] = [];

    for (let [id, quantity] of user.cart.entries()) {
      let snapshot = await this.productsService.findOne(id);

      if (!snapshot.exists()) {
        continue;
      }

      cartProducts.push(new CartProductImpl(snapshot.data(), quantity))
    }

    return cartProducts;
  }

  cleanCart(): Promise<void> {
    let user = this.authService.user();

    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    user.cart.clear();
    this.authService.updateUser(user);
    return this.userService.save(user)
  }

  addToCart(id: string, quantity: number): Promise<void> {
    let user = this.authService.user();

    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    user.cart.set(id, quantity);
    this.authService.updateUser(user);
    return this.userService.save(user)
  }

  removeFromCart(id: string, quantity?: number): Promise<void> {
    let user = this.authService.user();

    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    if (quantity !== undefined) {
      let prev = user.cart.get(id);

      if (prev !== undefined) {
        if (prev > quantity) {
          prev -= quantity;
          user.cart.set(id, prev);
        }
      } else {
        user.cart.delete(id);
      }
    } else {
      user.cart.delete(id);
    }

    this.authService.updateUser(user);
    return this.userService.save(user)
  }

  async getSubtotal2(): Promise<number> {
    return (await this.getCartProducts())
      .map(value => value.quantity * value.unitPrice)
      .filter(value => value !== null && value !== undefined)
      .reduce((previousValue, currentValue) => previousValue + currentValue)
  }

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


}

class CartProductImpl implements CartProduct {
  description: string;
  name: string;
  photoURL: string;
  quantity: number;
  unitPrice: number;

  get calculatePrice(): number {
    return 0;
  }

  constructor(product: ProductModel, quantity: number) {
    this.description = product.description
    this.name = product.name;
    this.photoURL = product.photoURL
    this.quantity = quantity;
    this.unitPrice = product.unitPrice
  }

}

export interface CartProduct {
  quantity: number,
  name: string,
  description: string,
  unitPrice: number,
  photoURL: string

  get calculatePrice(): number;
}
