import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'products-store-ui-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UILayoutComponent {
}
