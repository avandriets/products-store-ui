import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';

import { MainFacadeService } from './stores/facades';

@Component({
  selector: 'products-store-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public title$!: Observable<string>;
  public ready$!: Observable<boolean>;
  public error$!: Observable<HttpErrorResponse | null>;

  public constructor(
    private router: Router,
    private facadeAppState: MainFacadeService,
  ) { }

  public ngOnInit(): void {

    this.title$ = of('Products Store');

    this.facadeAppState.load();

    this.ready$ = combineLatest([

      this.facadeAppState.ready$(),

      this.router.events.pipe(filter(e => e instanceof NavigationEnd), take(1)),

    ]).pipe(
      mapTo(true),
    );

    this.error$ = this.facadeAppState.getError$();

  }

}
