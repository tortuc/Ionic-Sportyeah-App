import { TestBed } from '@angular/core/testing';

import { ViewsProfileService } from './views-profile.service';

describe('ViewsProfileService', () => {
  let service: ViewsProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewsProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
