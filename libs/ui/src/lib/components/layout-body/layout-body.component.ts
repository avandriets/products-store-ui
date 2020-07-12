import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UILayoutStateService } from '../../stores';

@Component({
  selector: 'products-store-ui-layout-body',
  templateUrl: './layout-body.component.html',
  styleUrls: ['./layout-body.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UILayoutBodyComponent implements OnInit {

  /**
   * Holds aside.
   */
  public aside$!: Observable<boolean>;

  /**
   * Holds is aside collapsed.
   */
  public isAsideCollapsed$!: Observable<boolean>;

  /**
   * Constructor.
   */
  public constructor(
    private route: ActivatedRoute,
    private state: UILayoutStateService,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.aside$ = this.route.data.pipe(
      map(data => (data ? data.aside : false)),
    );

    this.isAsideCollapsed$ = this.state.isAsideCollapsed$();

  }

  /**
   * Handle expand aside.
   */
  public expandAside(): void {

    this.state.expandAside();

  }

  /**
   * Handle collapse aside.
   */
  public collapseAside(): void {

    this.state.collapseAside();

  }

}
