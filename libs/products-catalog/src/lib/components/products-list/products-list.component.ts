import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '@products-store-ui/products-catalog-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'products-store-ui-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  public productsList$: Observable<Product[]>;

  public constructor(
    private readonly productService: ProductService,
  ) {
  }

  public ngOnInit(): void {

    this.productsList$ = this.productService.getAll();

  }

}
