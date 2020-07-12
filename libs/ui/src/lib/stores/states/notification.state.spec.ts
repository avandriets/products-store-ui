import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockClass, provideMockClass } from '@spectrus-web/util';

import { NotificationActions } from '../actions';

import { UINotificationStateService } from './notification.state';

describe('UINotificationStateService', () => {

  let notificationState: UINotificationStateService;
  let store: MockClass<Store<any>>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        UINotificationStateService,
        provideMockClass(() => Store),
      ],
    });

  });

  beforeEach(() => {

    notificationState = TestBed.get(UINotificationStateService);
    store = TestBed.get(Store);

  });

  it('should display success', () => {

    notificationState.success('success');

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationActions.success({
        message: 'success',
        options: { },
      }),
    );

  });

  it('should display error', () => {

    notificationState.error('error');

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationActions.error({
        message: 'error',
        options: { },
      }),
    );

  });

  it('should display primary', () => {

    notificationState.primary('primary');

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationActions.primary({
        message: 'primary',
        options: { },
      }),
    );

  });

  it('should display danger', () => {

    notificationState.danger('danger');

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationActions.danger({
        message: 'danger',
        options: { },
      }),
    );

  });

  it('should display warning', () => {

    notificationState.warning('warning');

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationActions.warning({
        message: 'warning',
        options: { },
      }),
    );

  });

});
