import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedUsersComponent } from './suggested-users.component';

describe('SuggestedUsersComponent', () => {
  let component: SuggestedUsersComponent;
  let fixture: ComponentFixture<SuggestedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestedUsersComponent]
    });
    fixture = TestBed.createComponent(SuggestedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
