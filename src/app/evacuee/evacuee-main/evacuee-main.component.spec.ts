import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvacueeMainComponent } from './evacuee-main.component';

describe('EvacueeMainComponent', () => {
  let component: EvacueeMainComponent;
  let fixture: ComponentFixture<EvacueeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvacueeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvacueeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
