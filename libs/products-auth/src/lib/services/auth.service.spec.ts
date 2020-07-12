import { TestBed } from '@angular/core/testing';

import { AuthService as SuT } from './auth.service';

describe('ProxyClientService', () => {

  let service: SuT;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        SuT,
      ],
    });

  });

  beforeEach(() => {

    service = TestBed.get(SuT);

  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

});
