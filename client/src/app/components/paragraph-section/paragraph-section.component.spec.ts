import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphsSectionComponent } from './paragraph-section.component';

describe('ParagraphsSectionComponent', () => {
  let component: ParagraphsSectionComponent;
  let fixture: ComponentFixture<ParagraphsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
