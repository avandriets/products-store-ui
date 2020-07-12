import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';

import { UINotificationService } from './notification.service';

describe('UINotificationService', () => {

  let notification: UINotificationService;

  class ToastrServiceMock {
    public show(): any {
      return {
        message: 'message',
      };
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: UINotificationService, useClass: UINotificationService },
        { provide: ToastrService, useClass: ToastrServiceMock },
      ],
    });

    notification = TestBed.get(UINotificationService);

  });

  it('should show', () => {

    const message = notification.show('some message', 'title', 'error');

    expect(message.message)
      .toBeDefined();

  });

});
