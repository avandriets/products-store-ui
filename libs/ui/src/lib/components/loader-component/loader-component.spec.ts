import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TestElementFinder } from '@spectrus-web/util';

import { LoaderComponent as SuT } from './loader-component';

describe('LoaderComponentComponent', () => {

  let fixture: ComponentFixture<SuT>;

  const elements = TestElementFinder.configureTestIdFinder([
    'sk-bounce1',
    'sk-bounce2',
    'sk-bounce3',
  ]);

  beforeEach(async(() => {

    TestBed
      .configureTestingModule({
        declarations: [
          SuT,
        ],
      })
      .compileComponents();

  }));

  it('should create', () => {

    fixture = TestBed.createComponent(SuT);

    fixture.detectChanges();

    const els = elements(fixture);
    expect(els['sk-bounce1'])
      .toBeTruthy();

    expect(els['sk-bounce2'])
      .toBeTruthy();

    expect(els['sk-bounce3'])
      .toBeTruthy();

  });

});
