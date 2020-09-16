import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvacueeMainWarningDialogComponent } from './evacuee-main-warning-dialog.component';

describe('EvacueeMainWarningDialogComponent', () => {
  let component: EvacueeMainWarningDialogComponent;
  let fixture: ComponentFixture<EvacueeMainWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvacueeMainWarningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvacueeMainWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});