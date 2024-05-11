import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/models/product.model';
import { ProductsService } from '../products.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent  implements OnInit {

  @Output()
  producto: ProductModel = {
    id: "-1",
    name: "Product not Found",
    description: "N/A",
    unitPrice: "-1",
    photoURL: ""
  }

/*
  producto: ProductModel = {
    id: "1",
    name: "GPU NVIDIA RTX 3090",
    description: "Tarjeta gráfica de gran poder",
    unitPrice: "30,000",
    photoURL: "https://m.media-amazon.com/images/I/61-7uGhZfQL._AC_UF894,1000_QL80_.jpg"
  }
*/

  @Input()
  public id: string = "";

  constructor(private service: ProductsService, private cd:ChangeDetectorRef) { }

  async ngOnInit() {
    let dataSnapshot = (await this.service.find(this.id));

    if (dataSnapshot.empty) {
        return;
    }

    this.producto = dataSnapshot.docs[0].data();
    this.cd.detectChanges();
  }


}
