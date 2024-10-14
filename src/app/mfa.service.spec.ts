import { TestBed } from '@angular/core/testing';

import { MFAService } from './mfa.service';

describe('MFAService', () => {
  let service: MFAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MFAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
