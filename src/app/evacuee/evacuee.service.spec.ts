import { TestBed } from '@angular/core/testing';

import { EvacueeService } from './evacuee.service';

describe('EvacueeService', () => {
  let service: EvacueeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvacueeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
