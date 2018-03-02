import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionPanelComponent } from './submission-panel.component';

describe('SubmissionPanelComponent', () => {
  let component: SubmissionPanelComponent;
  let fixture: ComponentFixture<SubmissionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
