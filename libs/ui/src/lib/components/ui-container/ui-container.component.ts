import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'products-store-ui-container',
  templateUrl: './ui-container.component.html',
  styleUrls: ['./ui-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
  ],
})
export class UiContainerComponent implements OnInit {

  @Input() public title = '';

  /**
   * Holds ready.
   */
  @Input() public ready = false;

  /**
   * Holds error.
   */
  @Input() public error!: string | null;

  /**
   * [class] attribute for host element
   */
  @HostBinding('class') public cls = 'products-store-ui-container';

  /**
   * Holds pending.
   */
  public pending$!: Observable<boolean>;

  /**
   * Constructor.
   */
  public constructor(
    private loader: LoadingBarService,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.pending$ = this.loader.value$.pipe(
      map(v => v !== 0),
      distinctUntilChanged(),
      debounceTime(800),
    );

  }

}
