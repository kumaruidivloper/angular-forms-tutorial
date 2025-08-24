import { TestBed } from '@angular/core/testing';

import { Idleservice } from './idleservice';

describe('Idleservice', () => {
  let service: Idleservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Idleservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
