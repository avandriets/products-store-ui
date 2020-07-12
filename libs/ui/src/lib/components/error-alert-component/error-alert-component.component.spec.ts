import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ErrorAlertComponent as SuT } from './error-alert-component.component';

@Component({
  template: `
    <spectrus-web-error-alert-component [error]="error"></spectrus-web-error-alert-component>
  `,
})
class TestComponent {
  public error: any;
}

describe('ErrorAlertComponent', () => {

  let component: SuT;
  let fixture: ComponentFixture<SuT>;

  beforeEach(async(() => {

    TestBed
      .configureTestingModule({
        declarations: [
          SuT,
          TestComponent,
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
        ],
      })
      .compileComponents();

  }));

  it('should create', () => {

    fixture = TestBed.createComponent(SuT);
    component = fixture.componentInstance;
    component.error = { message: 'test' };

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent)
      .toContain('test');

  });

});
