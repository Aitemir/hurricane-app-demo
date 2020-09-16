import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvacueeMainQuestionDialogComponent } from './evacuee-main-question-dialog.component';

describe('EvacueeMainQuestionDialogComponent', () => {
  let component: EvacueeMainQuestionDialogComponent;
  let fixture: ComponentFixture<EvacueeMainQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvacueeMainQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvacueeMainQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
