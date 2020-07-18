import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UILayoutStateService } from '../../stores';

@Component({
  selector: 'products-store-ui-route-path-wrapper',
  templateUrl: './route-path-wrapper.component.html',
  styleUrls: ['./route-path-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoutePathWrapperComponent implements OnInit {

  public leftSideBar$!: Observable<boolean>;

  public isAsideCollapsed$!: Observable<boolean>;

  public constructor(
    private route: ActivatedRoute,
    private state: UILayoutStateService,
  ) { }

  public ngOnInit(): void {

    this.leftSideBar$ = this.route.data.pipe(
      map(data => !!data?.leftSideBar),
    );

    this.isAsideCollapsed$ = this.state.isAsideCollapsed$();

  }

  public expandAside(): void {

    this.state.expandAside();

  }

  public collapseAside(): void {

    this.state.collapseAside();

  }

}
