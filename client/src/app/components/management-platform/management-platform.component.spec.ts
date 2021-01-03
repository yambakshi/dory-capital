import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPlatformComponent } from './management-platform.component';

describe('ManagementPlatformComponent', () => {
  let component: ManagementPlatformComponent;
  let fixture: ComponentFixture<ManagementPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
