import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent  implements OnInit {

  producto: any = {
    nombre: "GPU NVIDIA RTX 3090",
    precio: "30,000",
    imagenURL: "https://http2.mlstatic.com/D_NQ_NP_718897-MLM75383963225_032024-O.webp",
    descripcion: "Tarjeta gráfica de gran poder"
  }

  constructor() { }

  ngOnInit() {}

}
