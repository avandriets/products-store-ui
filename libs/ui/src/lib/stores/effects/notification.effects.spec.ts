import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockClass } from '@spectrus-web/util';
import { ReplaySubject, Subject } from 'rxjs';

import { UINotificationService } from '../../services';
import { NotificationActions } from '../actions';

import { NotificationEffects } from './notification.effects';

describe('NotificationEffects', () => {

  let effects: NotificationEffects;
  let notification: MockClass<UINotificationService>;
  let actions$: Subject<any>;
  let subscribe: jest.Mock<any>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        NotificationEffects,
        provideMockActions(() => actions$),
        { provide: UINotificationService, useValue: { show: () => { } } },
      ],
    });

  });

  beforeEach(() => {

    effects      = TestBed.get(NotificationEffects);
    notification = TestBed.get(UINotificationService);
    subscribe    = jest.fn();
    actions$     = new ReplaySubject(1);

  });

  it('should handle success', () => {

    const show = jest.spyOn(notification, 'show');

    effects.handleSuccess$.subscribe(subscribe);

    actions$.next(
      NotificationActions.success({
        message: 'Success', options: { },
      }),
    );

    expect(show)
      .toHaveBeenCalledWith('Success', '', 'success', { });

  });

  it('should handle error', () => {

    const show = jest.spyOn(notification, 'show');

    effects.handleError$.subscribe(subscribe);

    actions$.next(
      NotificationActions.error({
        message: 'Error', options: { },
      }),
    );

    expect(show)
      .toHaveBeenCalledWith('Error', '', 'error', { });

  });

  it('should handle primary', () => {

    const show = jest.spyOn(notification, 'show');

    effects.handlePrimary$.subscribe(subscribe);

    actions$.next(
      NotificationActions.primary({
        message: 'Primary', options: { },
      }),
    );

    expect(show)
      .toHaveBeenCalledWith('Primary', '', 'info', { });

  });

  it('should handle danger', () => {

    const show = jest.spyOn(notification, 'show');

    effects.handleDanger$.subscribe(subscribe);

    actions$.next(
      NotificationActions.danger({
        message: 'Danger', options: { },
      }),
    );

    expect(show)
      .toHaveBeenCalledWith('Danger', '', 'error', { });

  });

  it('should handle warning', () => {

    const show = jest.spyOn(notification, 'show');

    effects.handleWarning$.subscribe(subscribe);

    actions$.next(
      NotificationActions.warning({
        message: 'Warning', options: { },
      }),
    );

    expect(show)
      .toHaveBeenCalledWith('Warning', '', 'info', { });

  });

});
