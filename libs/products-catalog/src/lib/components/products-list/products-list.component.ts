import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '@products-store-ui/products-catalog-store';
import { Status } from '@products-store-ui/products-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'products-store-ui-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public status$!: Observable<Status>;

  public constructor(
    private readonly productService: ProductService,
  ) {
  }

  public ngOnInit(): void {

    this.products$ = this.productService.getAll();
    this.status$ = this.productService.status$;

  }

}
