import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'products-store-ui-loader-component',
  templateUrl: './loader-component.html',
  styleUrls: ['./loader-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {

  @HostBinding('class') public cls = 'products-store-ui-loader-component';

}
