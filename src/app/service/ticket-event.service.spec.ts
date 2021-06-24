import { TestBed } from '@angular/core/testing';

import { TicketEventService } from './ticket-event.service';

describe('TicketEventService', () => {
  let service: TicketEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
