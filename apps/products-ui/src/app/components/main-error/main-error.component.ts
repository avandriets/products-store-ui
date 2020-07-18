import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'products-store-ui-main-error',
  templateUrl: './main-error.component.html',
  styleUrls: ['./main-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainErrorComponent {
  @Input() public httpStatus!: string;
}
