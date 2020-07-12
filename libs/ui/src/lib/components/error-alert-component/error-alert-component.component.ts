import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'products-store-ui-error-alert-component',
  templateUrl: './error-alert-component.component.html',
  styleUrls: ['./error-alert-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorAlertComponent {

  /**
   * Holds error.
   */
  @Input() public error: { message: string } | null;

}
