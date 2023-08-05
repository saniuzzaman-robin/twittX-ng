import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowListComponent } from './user-follow-list.component';

describe('UserFollowListComponent', () => {
  let component: UserFollowListComponent;
  let fixture: ComponentFixture<UserFollowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFollowListComponent]
    });
    fixture = TestBed.createComponent(UserFollowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
