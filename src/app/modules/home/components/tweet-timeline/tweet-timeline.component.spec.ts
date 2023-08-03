import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetTimelineComponent } from './tweet-timeline.component';

describe('TweetTimelineComponent', () => {
  let component: TweetTimelineComponent;
  let fixture: ComponentFixture<TweetTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetTimelineComponent]
    });
    fixture = TestBed.createComponent(TweetTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
