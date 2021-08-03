import { ChangeDetectorRef, Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UIPopoverOverlayRef } from '../services';

@Directive({
  selector: '[productsStoreUiPopoverArrow]',
})
export class UIPopoverArrowDirective implements OnInit, OnDestroy {

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  public arrowSize: number | undefined;

  @HostBinding('style.top.px')
  public offsetTop: number | null;

  @HostBinding('style.right.px')
  public offsetRight: number | null | undefined;

  @HostBinding('style.bottom.px')
  public offsetBottom: number | null | undefined;

  @HostBinding('style.left.px')
  public offsetLeft: number | null | undefined;

  private subscription = new Subscription();

  /**
   * Constructor.
   */
  public constructor(
    private popoverRef: UIPopoverOverlayRef,
    private cd: ChangeDetectorRef,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.arrowSize = this.popoverRef.config.arrowSize;

    this.subscription = this.popoverRef.positionChanges().subscribe(p => {

      const { offsetX, offsetY } = p.connectionPair;

      this.offsetTop = offsetY && offsetY >= 0 ? offsetY * -1 : null;
      this.offsetLeft = offsetX && offsetX < 0 ? offsetX * -1 : null;
      this.offsetBottom = offsetY && offsetY < 0 ? offsetY : null;
      this.offsetRight = offsetX && offsetX >= 0 ? offsetX : null;

      this.cd.detectChanges();

    });

  }

  /**
   * On Destroy.
   */
  public ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }

}
