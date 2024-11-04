import { TestBed } from '@angular/core/testing';

import { DefinicaoService } from './definicao.service';

describe('DefinicaoService', () => {
  let service: DefinicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
