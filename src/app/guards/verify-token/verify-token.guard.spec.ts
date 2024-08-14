import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifyTokenGuard } from './verify-token.guard';

describe('verifyTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => verifyTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
