import { TestBed } from '@angular/core/testing';

import { UsageStorageService } from './usage-storage.service';

describe('UsageStorageService', () => {
  let service: UsageStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
