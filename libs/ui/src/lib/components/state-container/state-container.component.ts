import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges, SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Status } from '@products-store-ui/products-core';

export interface UIStateStatusCollection {
  [key: string]: Status;
}

export type UIState = Status | Status[] | UIStateStatusCollection;

@Component({
  selector: 'products-store-ui-state-container',
  templateUrl: './state-container.component.html',
  styleUrls: ['./state-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
    trigger('slideInOut', [
      state('in', style({ transform: 'translate(0, 0)', opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translate(0, 15px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.785, 0.135, 0.15, 0.86)'),
      ]),
      transition(':leave', [
        animate('600ms cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({ transform: 'translate(0, 15px)', opacity: 0 })),
      ]),
    ]),
    trigger('blockInitialRenderAnimation', [
      transition(':enter', []),
    ]),
  ],
})
export class StateContainerComponent implements OnChanges {

  @Input() public resolved?: TemplateRef<any>;
  @Input() public rejected?: TemplateRef<any>;
  @Input() public pending?: TemplateRef<any>;
  @Input() public updating?: TemplateRef<any>;
  @Input() @HostBinding('style.min-height') public height = '200px';
  @Input() @HostBinding('style.height') public maxHeight = '100%';
  @Input() public state?: UIState;
  @HostBinding('class') public cls = 'products-store-ui-state-container';
  @HostBinding('@blockInitialRenderAnimation') public blockInitialRenderAnimation = '';

  public showResolved = false;
  public showRejected = false;
  public showPending = false;
  public showUpdating = false;
  public defaultStatus?: Status;

  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    this.updateFlags(changes);
  }

  private updateFlags(changes: SimpleChanges): void {

    if (!changes.state) {
      return;
    }

    const statuses: Status[] = this.getStatuses();

    this.showResolved = statuses.every(s => s.resolved);
    this.showRejected = statuses.some(s => s.rejected);
    this.defaultStatus = this.showRejected ? statuses.find(s => s.rejected) : statuses.find(s => s.resolved);
    this.showUpdating = this.showResolved && statuses.some(s => s.pending);
    this.showPending = !this.showResolved && statuses.some(s => s.pending);

    this.changeDetectorRef.detectChanges();

  }

  private getStatuses(): Status[] {

    if (!this.state) {
      return [
        {
          resolved: false,
          pending: true,
          rejected: false,
          err: null,
        },
      ];
    }

    if (Array.isArray(this.state)) {
      return this.state as Status[];
    }

    if (
      this.state.hasOwnProperty('resolved') &&
      this.state.hasOwnProperty('rejected') &&
      this.state.hasOwnProperty('pending')
    ) {
      return [this.state] as Status[];
    }

    return Object.values(this.state);

  }

}
