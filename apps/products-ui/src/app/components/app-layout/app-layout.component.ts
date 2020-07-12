import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApplicationUser } from '@products-store-ui/products-core';

@Component({
  selector: 'products-store-ui-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {

  /**
   * Holds user.
   */
  @Input() public user!: ApplicationUser;

}
