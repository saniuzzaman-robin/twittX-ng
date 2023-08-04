import { TestBed } from '@angular/core/testing';

import { TwittxCommandService } from './twittx-command.service';

describe('TwittxCommandService', () => {
  let service: TwittxCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwittxCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
