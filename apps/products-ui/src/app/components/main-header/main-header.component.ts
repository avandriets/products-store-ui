import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@products-store-ui/products-auth';
import { ApplicationUser } from '@products-store-ui/products-core';

@Component({
  selector: 'products-store-ui-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {

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

  public onLogin(): void {
    this.auth.login();
  }

  public onDocClick(): void {
    this.router.navigate(['/catalog/documents']);
  }

  public onDictionariesClick(): void {
    this.router.navigate(['/catalog/dictionaries']);
  }

}
