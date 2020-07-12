import { Component, OnInit } from '@angular/core';
import { ApplicationUser, UserStateService } from '@products-store-ui/products-core';
import { Observable } from 'rxjs';
// import { filter, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'products-store-ui-app-layout-container',
  templateUrl: './app-layout-container.component.html',
  styleUrls: ['./app-layout-container.component.scss'],
})
export class AppLayoutContainerComponent implements OnInit {

  /**
   * Holds user.
   */
  public user$!: Observable<ApplicationUser>;

  /**
   * Constructor.
   */
  public constructor(
    private readonly userState: UserStateService,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.user$ = this.userState.getUser$();

    // this.routerState.getParam$('accountId').pipe(
    //   filter(accountId => !accountId),
    //   switchMap(() => this.account$),
    //   take(1),
    //   tap(account => this.routerState.navigate(['/', account.getId()])),
    // ).subscribe();

  }

}
