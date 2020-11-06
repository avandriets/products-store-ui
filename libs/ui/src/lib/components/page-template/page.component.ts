import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'products-store-ui-page-template',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTemplateComponent {
  @Input() public header = true;
  @HostBinding('class') public cls = 'products-store-ui-page-template';
}
