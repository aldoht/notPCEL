import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  /** Hay que implementar el servicio para favoritos */
  favoritosArray: any[] = [
    {
      id: 1,
      quantity: "-1",
      name: "NombreProducto",
      description: "N/A",
      unitPrice: "-1",
      photoURL: "https://m.media-amazon.com/images/I/61-7uGhZfQL._AC_UF894,1000_QL80_.jpg"
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {  }

  navigateToPage(productId: string) {
    this.router.navigate(['/home/products/', productId]);
  }
}
