import {
  ConnectedOverlayPositionChange,
  FlexibleConnectedPositionStrategy,
  OverlayRef,
} from '@angular/cdk/overlay';
import { PopoverConfig } from '@products-store-ui/ui';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export class UIPopoverOverlayRef<T = any> {

  /**
   * Holds before close subject.
   */
  private beforeCloseSubject$ = new Subject<T>();

  /**
   * Holds after close subject.
   */
  private afterClosedSubject$ = new Subject<T>();

  /**
   * Constructor.
   */
  public constructor(
    private overlayRef: OverlayRef,
    private positionStrategy: FlexibleConnectedPositionStrategy,
    public config: PopoverConfig,
  ) {

    this.overlayRef.keydownEvents()
      .pipe(
        takeUntil(this.afterClosedSubject$),
        filter(event => event.key === 'Escape'),
      )
      .subscribe(() => this.close());

    this.overlayRef.backdropClick()
      .pipe(
        takeUntil(this.afterClosedSubject$),
      )
      .subscribe(() => this.close());

  }

  /**
   * Close popover.
   */
  public close(data?: T): void {

    this.beforeCloseSubject$.next(data);

    this.overlayRef.dispose();

    this.afterClosedSubject$.next(data);

    this.beforeCloseSubject$.complete();
    this.afterClosedSubject$.complete();

  }

  /**
   * After Close popover.
   */
  public afterClosed(): Observable<T> {

    return this.afterClosedSubject$.asObservable();

  }

  /**
   * Before Close popover.
   */
  public beforeClose(): Observable<T> {

    return this.beforeCloseSubject$.asObservable();

  }

  /**
   * Get position changes observable.
   */
  public positionChanges(): Observable<ConnectedOverlayPositionChange> {

    return this.positionStrategy.positionChanges;

  }

}
