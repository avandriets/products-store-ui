import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';

import { AppStateService } from './stores/states';

@Component({
  selector: 'products-store-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  /**
   * Holds logo title.
   */
  public title$!: Observable<string>;

  /**
   * Holds ready.
   */
  public ready$!: Observable<boolean>;

  /**
   * Holds error.
   */
  public error$!: Observable<HttpErrorResponse | null>;

  /**
   * Constructor.
   */
  public constructor(
    private router: Router,
    private state: AppStateService,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.title$ = of('Products Store');

    this.state.load();

    // Determine when the application is ready.
    this.ready$ = combineLatest([

      // Ensure the application is ready before continuing.
      this.state.ready$(),

      // Ensure there has been a NavigationEnd event before continuing.
      this.router.events.pipe(filter(e => e instanceof NavigationEnd), take(1)),

    ]).pipe(
      mapTo(true),
    );

    // Determine when an application boot error happened.
    this.error$ = this.state.getError$();

  }

}
