import { TestBed } from '@angular/core/testing';

import { Html2CanvasService } from './html2-canvas.service';

describe('Html2CanvasService', () => {
  let service: Html2CanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Html2CanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
