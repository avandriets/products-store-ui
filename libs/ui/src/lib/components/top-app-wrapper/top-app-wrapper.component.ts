import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'products-store-ui-top-app-wrapper',
  templateUrl: './top-app-wrapper.component.html',
  styleUrls: ['./top-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
  ],
})
export class TopAppWrapperComponent implements OnInit {

  @Input() public title = '';
  @Input() public ready = false;
  @Input() public error!: string | null;
  @HostBinding('class') public cls = 'products-store-ui-app-wrapper';

  public pending$!: Observable<boolean>;

  public constructor(
    private loader: LoadingBarService,
  ) { }

  public ngOnInit(): void {

    this.pending$ = this.loader.value$.pipe(
      map(v => v !== 0),
      distinctUntilChanged(),
      debounceTime(800),
    );

  }

}
