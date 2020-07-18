import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApplicationUser } from '@products-store-ui/products-core';

@Component({
  selector: 'products-store-ui-app-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {

  @Input() public user!: ApplicationUser;

}
