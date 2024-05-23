import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ProductModel} from "../../models/product.model";
import {FavoritesService} from "../favorites.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  @Output()
  _favoritosArray: ProductModel[] = []

  constructor(private router: Router, private favoriteService: FavoritesService) {
    interval(5000)
      .subscribe(value => {
        return this.favoritos()
      })
  }

  async ngOnInit() {
    this._favoritosArray = await this.favoriteService.favorites();
  }

  navigateToPage(productId: string) {
    this.router.navigate(['/home/products/', productId]);
  }

  get favoritosArray() {
    return this._favoritosArray;
  }

  async favoritos() {
    return this.favoriteService.favorites();
  }
}
