import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeSectionComponent } from './scope-section.component';

describe('ScopeSectionComponent', () => {
  let component: ScopeSectionComponent;
  let fixture: ComponentFixture<ScopeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
