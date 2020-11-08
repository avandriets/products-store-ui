import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductService } from '@products-store-ui/products-catalog-store';
import { RouterStateService, Status } from '@products-store-ui/products-core';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'products-store-ui-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  public form!: FormGroup;
  public isNewObject = true;
  public product$: Observable<Product>;
  public status$!: Observable<Status>;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly routerState: RouterStateService,
    private readonly productService: ProductService,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit(): void {

    this.form = this.fb.group({
      id: [{ value: null, disabled: true }],
      title: [null, [Validators.required, Validators.maxLength(255)]],
      description: [null],
    });

    this.status$ = this.productService.status$;

    this.product$ = this.routerState.getParam$('productId')
      .pipe(
        filter(id => !!id),
        tap(id => this.isNewObject = id === 'add'),
        switchMap(id => this.isNewObject ? this.productService.createNew() : this.productService.getByKey(id)),
        tap(product => this.form.patchValue(product, { emitEvent: false })),
      );

  }

  public onSave(): void {

    this.routerState.getParam$('productId').pipe(
      take(1),
    ).subscribe(productId => {

      this.isNewObject
        ? this.productService.add({ ...this.form.value })
        : this.productService.update({ ...this.form.value, id: productId });

    });

  }

  public onDelete(): void {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: { product: { ...this.form.getRawValue() } },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete({ ...this.form.getRawValue() });
      }
    });

  }

}
