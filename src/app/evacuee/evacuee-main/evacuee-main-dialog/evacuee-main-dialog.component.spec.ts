import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvacueeMainDialogComponent } from './evacuee-main-dialog.component';

describe('EvacueeMainDialogComponent', () => {
  let component: EvacueeMainDialogComponent;
  let fixture: ComponentFixture<EvacueeMainDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvacueeMainDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvacueeMainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
