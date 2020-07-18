import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products-store-ui-app-error-container',
  templateUrl: './main-error-container.component.html',
  styleUrls: ['./main-error-container.component.scss'],
})
export class MainErrorContainerComponent implements OnInit {

  /**
   * Holds type.
   */
  public type$!: Observable<string | null>;

  /**
   * Constructor.
   */
  public constructor(
    private route: ActivatedRoute,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.type$ = this.route.queryParams.pipe(
      map(params => (params && params.type) ? `${params.type}` : null),
    );

  }

}
