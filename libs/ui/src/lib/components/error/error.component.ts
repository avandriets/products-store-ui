import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'products-store-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent { }
