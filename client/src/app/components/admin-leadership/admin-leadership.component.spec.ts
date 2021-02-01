import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeadershipComponent } from './admin-leadership.component';

describe('AdminLeadershipComponent', () => {
  let component: AdminLeadershipComponent;
  let fixture: ComponentFixture<AdminLeadershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeadershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
