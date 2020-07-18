import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'products-store-ui-error-placeholder-component',
  templateUrl: './error-alert-component.component.html',
  styleUrls: ['./error-alert-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPlaceholderComponent {
  @Input() public error: { message: string } | null;
}
