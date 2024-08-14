import { TestBed } from '@angular/core/testing';

import { VerifyPasswordService } from './verify-password.service';

describe('VerifyPasswordService', () => {
  let service: VerifyPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
