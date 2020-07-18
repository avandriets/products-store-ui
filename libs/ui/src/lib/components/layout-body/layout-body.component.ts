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
