import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'products-store-ui-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppErrorComponent {

  /**
   * Holds type.
   */
  @Input() public type!: string;

}
