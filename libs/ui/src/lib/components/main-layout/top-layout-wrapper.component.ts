import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'products-store-ui-top-layout-wrapper',
  templateUrl: './top-layout-wrapper.component.html',
  styleUrls: ['./top-layout-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopLayoutWrapperComponent {
}
