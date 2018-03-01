import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReadingComponent } from './submit-reading.component';

describe('SubmitReadingComponent', () => {
  let component: SubmitReadingComponent;
  let fixture: ComponentFixture<SubmitReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
