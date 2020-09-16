import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterInfoDialogComponent } from './shelter-info-dialog.component';

describe('ShelterInfoDialogComponent', () => {
  let component: ShelterInfoDialogComponent;
  let fixture: ComponentFixture<ShelterInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
