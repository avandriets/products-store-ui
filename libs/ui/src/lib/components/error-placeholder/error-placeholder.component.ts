import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'products-store-ui-error-placeholder',
  templateUrl: './error-placeholder.component.html',
  styleUrls: ['./error-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPlaceholderComponent {
  @Input() public error: { message: string } | null;
}
