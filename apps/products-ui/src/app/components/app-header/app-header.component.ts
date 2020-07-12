import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@products-store-ui/products-auth';
import { ApplicationUser } from '@products-store-ui/products-core';

@Component({
  selector: 'products-store-ui-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {

  @Input() public user: ApplicationUser;

  public constructor(
    private auth: AuthService,
    private readonly router: Router,
  ) { }

  public logout(): void {

    this.auth.logout();

  }

  public onSettings(): void {

    this.router.navigate(['/settings']);

  }

  public onTitle(): void {

    this.router.navigate(['/']);

  }

}
