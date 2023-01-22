import { TestBed } from '@angular/core/testing';

import { TypedepenseServiceService } from './typedepense-service.service';

describe('TypedepenseServiceService', () => {
  let service: TypedepenseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypedepenseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
