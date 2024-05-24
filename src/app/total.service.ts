import {Injectable} from '@angular/core';
import {ProductsService} from "./products.service";
import {ProductModel} from "../models/product.model";
import {AuthService} from "./auth.service";
import {UsersService} from "./users.service";
import {Observable, Subject} from "rxjs";
import {car} from "ionicons/icons";
import {query} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  private readonly cartProductsObservable: Subject<CartProduct[]>;
  private readonly subtotalObservable: Subject<number>;

  constructor(private authService: AuthService, private productsService: ProductsService, private userService: UsersService) {
    this.cartProductsObservable = new Subject<CartProduct[]>();
    this.subtotalObservable = new Subject<number>();

    this.cartProductsObservable.subscribe(value => {
      this.subtotalObservable.next(this.calculateSubtotal(value));
    })

    this.cartProducts().then(value => {
      this.cartProductsObservable.next(value)
    })
  }

  cartProductsObs(): Observable<CartProduct[]> {
    return this.cartProductsObservable;
  }

  subtotalObs(): Observable<number> {
    return this.subtotalObservable;
  }

  async cartProducts(): Promise<CartProduct[]> {
    let user = this.authService.user();

    if (user === null) {
      return [];
    }

    return this.mapCart(user.cart)
  }

  private async mapCart(cart: Map<string, number>) {
    let cartProducts: CartProduct[] = [];

    for (let [id, quantity] of cart.entries()) {
      let snapshot = await this.productsService.findOne(id);

      if (!snapshot.exists()) {
        continue;
      }

      cartProducts.push(new CartProductImpl(snapshot.data(), quantity))
    }

    return cartProducts
  }

  cleanCart(): Promise<void> {
    let user = this.authService.user();

    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    user.cart.clear();

    this.mapCart(user.cart).then(value => this.cartProductsObservable.next([]))

    this.authService.updateUser(user);
    return this.userService.save(user)
  }

  addToCart(id: string, quantity: number): Promise<void> {
    let user = this.authService.user();

    if (user === null) {
      return new Promise<void>(resolve => resolve());
    }

    let currValue = user.cart.get(id);
    if (currValue !== undefined) {
      user.cart.set(id, quantity + currValue);
    } else {
      user.cart.set(id, quantity);
    }

    this.mapCart(user.cart).then(value => this.cartProductsObservable.next(value))

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

    this.mapCart(user.cart).then(value => this.cartProductsObservable.next(value))

    this.authService.updateUser(user);
    return this.userService.save(user)
  }

  calculateSubtotal(cartProducts: CartProduct[]) {
    return cartProducts
      .map(value => value.calculatePrice)
      .filter(value => value !== null)
      .reduce((previousValue, currentValue) => previousValue + currentValue)
  }

  async getSubtotal2(): Promise<number> {
    return this.calculateSubtotal((await this.cartProducts()))
  }

  isInCart(id: string) {
    let user = this.authService.user();

    if (user === null) {
      return false;
    }

    return user.cart.has(id);
  }
}

class CartProductImpl implements CartProduct {
  description: string;
  name: string;
  photoURL: string;
  quantity: number;
  unitPrice: number;

  get calculatePrice(): number {
    return this.quantity * this.unitPrice;
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
