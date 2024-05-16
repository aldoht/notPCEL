import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notSetupGuard } from './setup.guard';

describe('setupGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => notSetupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
