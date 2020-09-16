import { TestBed } from '@angular/core/testing';

import { EvacueeHttpService } from './evacuee-http.service';

describe('EvacueeHttpService', () => {
  let service: EvacueeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvacueeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
