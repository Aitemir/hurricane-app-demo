import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterWarningDialogComponent } from './shelter-warning-dialog.component';

describe('ShelterWarningDialogComponent', () => {
  let component: ShelterWarningDialogComponent;
  let fixture: ComponentFixture<ShelterWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterWarningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
