import { TestBed } from '@angular/core/testing';

import { SLoginService } from './s-login.service';

describe('SLoginService', () => {
  let service: SLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
