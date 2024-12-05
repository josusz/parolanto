import { TestBed } from '@angular/core/testing';

import { RegraService } from './regra.service';

describe('RegraService', () => {
  let service: RegraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
