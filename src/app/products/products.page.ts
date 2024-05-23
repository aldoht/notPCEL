import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {ProductsService} from '../products.service';
import {TotalService} from "../total.service";
import {NotificationsService} from "../notifications.service";
import {notSetupGuard} from "../setup.guard";
import {FavoritesService} from "../favorites.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  id: string = "";
  producto: any = {
    id: "-1",
    name: "Gato RTX 4090 miau",
    description: "Es un gato NVIDIA",
    unitPrice: "20",
    photoURL: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    quantity: "1"
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ProductsService,
              private cartService: TotalService,
              private notService: NotificationsService,
              private favService: FavoritesService) {
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    let dataSnapshot = (await this.service.findOne(this.id));

    if (!dataSnapshot.exists()) {
      this.router.navigate(['/home/404']);
    }

    this.producto.name = dataSnapshot.data()?.name;
    this.producto.description = dataSnapshot.data()?.description;
    this.producto.unitPrice = dataSnapshot.data()?.unitPrice;
    this.producto.photoURL = dataSnapshot.data()?.photoURL;
  }

  addToFav() {
    if (this.alreadyFav) {
      this.favService.removeFavorite(this.id)
      this.notService.createNotification("Eliminado producto a la lista de favoritos", "danger", 1500)

      return
    }

    this.favService.addFavorite(this.id)
    this.notService.createNotification("Agregado producto a la lista de favoritos", "success", 1500)
  }

  addToCart() {
    this.cartService.getArrayCarrito().push({
      quantity: this.producto.quantity,
      description: this.producto.desc,
      name: this.producto.name,
      photoURL: this.producto.photoURL,
      unitPrice: this.producto.unitPrice
    })

    this.notService.createNotification("Agregado producto al carrito", "success", 1500)
    this.router.navigate(["../"])
  }

  get alreadyFav() {
    return this.favService.hasFavorite(this.id)
  }
}
