import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadershipSectionComponent } from './leadership-section.component';

describe('LeadershipSectionComponent', () => {
  let component: LeadershipSectionComponent;
  let fixture: ComponentFixture<LeadershipSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadershipSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadershipSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
