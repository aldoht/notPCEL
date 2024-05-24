import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ProductModel} from "../models/product.model";
import {ProductsService} from "./products.service";
import {UsersService} from "./users.service";
import {defer, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private obsFavorites: Subject<ProductModel[]>;

  constructor(private authService: AuthService, private productsService: ProductsService, private userService: UsersService) {
    this.obsFavorites = new Subject<ProductModel[]>()
    this.favorites().then(value => this.obsFavorites.next(value))
  }

  favoritesObs(): Observable<ProductModel[]> {
    return this.obsFavorites;
  }

  async favorites(): Promise<ProductModel[]> {
    let user = this.authService.user();

    if (user === null) {
      return [];
    }

    return this.convert(user.favorites)
  }

  private async convert(rawFavorites: Set<string>) {
    let favorites = await Promise.all(Array.from(rawFavorites).map(value => this.productsService.findOne(value)))
    return favorites
      .filter(value => value.exists())
      .map(value => value.data())
      .filter(value => value !== null)
      .map(value => value as ProductModel)
  }

  addFavorite(id: string) {
    let user = this.authService.user();

    if (user === null) {
      throw new Error("User not logged in.")
    }

    user.favorites.add(id);
    this.convert(user.favorites).then(value => {
      this.obsFavorites.next(value)
    })

    this.userService.save(user)
    this.authService.updateUser(user)
  }

  removeFavorite(id: string) {
    let user = this.authService.user();

    if (user === null) {
      throw new Error("User not logged in.")
    }

    user.favorites.delete(id);
    this.convert(user.favorites).then(value => {
      this.obsFavorites.next(value)
    })

    this.userService.save(user)
    this.authService.updateUser(user)
  }

  hasFavorite(id: string) {
    let user = this.authService.user();

    if (user === null) {
      return false
    }

    return user.favorites.has(id)
  }
}
