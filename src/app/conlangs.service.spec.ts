import { TestBed } from '@angular/core/testing';

import { ConlangsService } from './conlangs.service';

describe('ConlangsService', () => {
  let service: ConlangsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConlangsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
