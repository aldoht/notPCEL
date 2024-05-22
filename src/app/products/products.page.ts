import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private service: ProductsService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    /** Conectar servicio de la base de datos
     * para obtener información del producto según la id
     * y llenar el objeto producto
     */
    let dataSnapshot = (await this.service.findOne(this.id));

    if (!dataSnapshot.exists()) {
      this.router.navigate(['/home/404']);
    }

    this.producto.name = dataSnapshot.data()?.name;
    this.producto.description = dataSnapshot.data()?.description;
    this.producto.unitPrice = dataSnapshot.data()?.unitPrice;
    this.producto.photoURL = dataSnapshot.data()?.photoURL;
  }


  /** Si se da click al botón de comprar, usar alguna
   * función para añadirla al carrito del usuario
   * según la cantidad especificada
   */

  /** Si se da click en favoritos, añadir a los favoritos
   * del usuario mediante alguna función
   */

}
