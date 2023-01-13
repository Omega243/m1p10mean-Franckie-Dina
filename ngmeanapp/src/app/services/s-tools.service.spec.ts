import { TestBed } from '@angular/core/testing';

import { SToolsService } from './s-tools.service';

describe('SToolsService', () => {
  let service: SToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
