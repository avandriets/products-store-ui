import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'products-store-ui-loader-component',
  templateUrl: './loader-component.html',
  styleUrls: ['./loader-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {

  /**
   * [class] attribute for host element
   */
  @HostBinding('class') public cls = 'spectrus-web-loader-component';

}
