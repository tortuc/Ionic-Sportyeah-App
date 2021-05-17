import { TestBed } from '@angular/core/testing';

import { LivescoreService } from './livescore.service';

describe('LivescoreService', () => {
  let service: LivescoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivescoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
