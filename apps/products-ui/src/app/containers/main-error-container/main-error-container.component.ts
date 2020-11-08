import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products-store-ui-main-error-container',
  templateUrl: './main-error-container.component.html',
  styleUrls: ['./main-error-container.component.scss'],
})
export class MainErrorContainerComponent implements OnInit {

  public type$!: Observable<string | null>;

  public constructor(
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {

    this.type$ = this.route.queryParams.pipe(
      map(params => (params && params.type) ? `${params.type}` : null),
    );

  }

}
