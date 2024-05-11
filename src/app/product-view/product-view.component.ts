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

  @Input()
  public id: string = "";

  constructor(private service: ProductsService, private cd:ChangeDetectorRef) { }

  async ngOnInit() {
    let dataSnapshot = (await this.service.findOne(this.id));

    if (!dataSnapshot.exists()) {
        return;
    }

    this.producto = dataSnapshot.data();
    this.cd.detectChanges();
  }


}
