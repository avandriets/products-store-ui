import { ComponentType, ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable, Injector } from '@angular/core';
import { PopoverConfig } from '@products-store-ui/ui';

import { UIPopoverOverlayRef } from './overlay-ref';
import { UI_POPOVER_DATA } from './tokens';

const defaultConfig: PopoverConfig = {
  backdropClass: 'cdk-overlay-transparent-backdrop',
  disableClose: false,
  panelClass: '',
  arrowOffset: 30,
  arrowSize: 20,
};

@Injectable()
export class UIPopoverService {

  /**
   * Constructor.
   */
  public constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) { }

  /**
   * Create and open popover from Component.
   */
  public openPopover(connectPosition: ElementRef | HTMLElement | { x: number; y: number; },
                     config: Partial<PopoverConfig> = { },
                     popoverComponentType: ComponentType<any>): UIPopoverOverlayRef {

    const popoverConfig: PopoverConfig = { ...defaultConfig, ...config };

    const arrowSize = popoverConfig.arrowSize ? popoverConfig.arrowSize : 0;
    const arrowOffset = popoverConfig.arrowOffset ? popoverConfig.arrowOffset : 0;
    const panelOffset = arrowSize / 2;

    const positions: ConnectionPositionPair[] = popoverConfig.positions ?? [
      // top center
      {
        overlayX: 'center',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'center'],
        offsetY: panelOffset * -1,
      },
      // top left
      {
        overlayX: 'start',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'left'],
        offsetX: arrowOffset * -1,
        offsetY: panelOffset * -1,
      },
      // top right
      {
        overlayX: 'end',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'right'],
        offsetX: arrowOffset,
        offsetY: panelOffset * -1,
      },
      // bottom center
      {
        overlayX: 'center',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'center'],
        offsetY: panelOffset,
      },
      // bottom left
      {
        overlayX: 'start',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'left'],
        offsetX: arrowOffset * -1,
        offsetY: panelOffset,
      },
      // bottom right
      {
        overlayX: 'end',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'right'],
        offsetX: arrowOffset,
        offsetY: panelOffset,
      },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(connectPosition)
      .withPositions(positions);

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: popoverConfig.backdropClass,
      panelClass: popoverConfig.panelClass,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const popoverOverlayRef = new UIPopoverOverlayRef(overlayRef, positionStrategy, popoverConfig);

    this.attachPopoverContainer(overlayRef, config, popoverOverlayRef, popoverComponentType);

    return popoverOverlayRef;

  }

  /**
   * Attach container to overlay.
   */
  private attachPopoverContainer(overlayRef: OverlayRef,
                                 popoverConfig: Partial<PopoverConfig>,
                                 popoverOverlayRef: UIPopoverOverlayRef,
                                 popoverComponentType: ComponentType<any>): any {

    const popoverInjector = this.createInjector(popoverConfig, popoverOverlayRef);

    const containerPortal = new ComponentPortal(popoverComponentType, null, popoverInjector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef.instance;

  }

  /**
   * Create popover injector.
   */
  private createInjector(config: Partial<PopoverConfig>, popoverRef: UIPopoverOverlayRef): Injector {

    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: UIPopoverOverlayRef, useValue: popoverRef },
        { provide: UI_POPOVER_DATA, useValue: config.data },
      ],

    });

  }

}
