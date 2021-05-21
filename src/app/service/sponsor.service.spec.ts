/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SponsorService } from './sponsor.service';

describe('Service: Sponsor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponsorService]
    });
  });

  it('should ...', inject([SponsorService], (service: SponsorService) => {
    expect(service).toBeTruthy();
  }));
});
