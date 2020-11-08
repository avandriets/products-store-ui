import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UILayoutStateService } from '../../stores/states';

@Component({
  selector: 'products-store-ui-left-sidebar-dictionaries',
  templateUrl: './left-sidebar-dictionaries.component.html',
  styleUrls: ['./left-sidebar-dictionaries.component.scss'],
})
export class LeftSidebarDictionariesComponent implements OnInit {

  public expanded$!: Observable<boolean>;

  public constructor(
    private state: UILayoutStateService,
  ) { }

  public ngOnInit(): void {
    this.expanded$ = this.state.isAsideExpanded$();
  }

  public onHeaderClick(expanded: boolean): void {

    if (expanded) {
      this.state.collapseAside();
    } else {
      this.state.expandAside();
    }

  }

}
