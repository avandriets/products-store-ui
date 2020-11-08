import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LeftSidebarDictionariesComponent } from './left-sidebar-dictionaries.component';

describe('LeftSidebarDictionariesComponent', () => {
  let component: LeftSidebarDictionariesComponent;
  let fixture: ComponentFixture<LeftSidebarDictionariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSidebarDictionariesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarDictionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
