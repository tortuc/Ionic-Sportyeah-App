import { TestBed } from '@angular/core/testing';

import { ViewsSponsorService } from './views-sponsor.service';

describe('ViewsSponsorService', () => {
  let service: ViewsSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewsSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
