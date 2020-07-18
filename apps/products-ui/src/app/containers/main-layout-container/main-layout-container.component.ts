import { Component, OnInit } from '@angular/core';
import { ApplicationUser, UserStateService } from '@products-store-ui/products-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'products-store-ui-main-layout-container',
  templateUrl: './main-layout-container.component.html',
  styleUrls: ['./main-layout-container.component.scss'],
})
export class MainLayoutContainerComponent implements OnInit {

  public user$!: Observable<ApplicationUser>;

  public constructor(
    private readonly userState: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.user$ = this.userState.getUser$();
  }

}
