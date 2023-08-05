import { TestBed } from '@angular/core/testing';

import { ExploreUsersService } from './explore-users.service';

describe('ExploreUsersService', () => {
  let service: ExploreUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
