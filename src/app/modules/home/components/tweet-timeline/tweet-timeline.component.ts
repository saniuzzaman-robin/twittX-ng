import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Timeline } from 'src/app/shared/models/shared.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tweet-timeline',
  templateUrl: './tweet-timeline.component.html',
  styleUrls: ['./tweet-timeline.component.scss'],
})
export class TweetTimelineComponent implements OnInit, OnDestroy {
  fetchedTimeline: boolean = false;
  timelineItems: Timeline[] = [];
  subscriptions: Subscription[] = [];
  constructor(private _homeService: HomeService) {}
  ngOnInit(): void {
    this.fetchTweetTimelineData();
    this.subscriptions.push(
      this._homeService.newTweetPosted.subscribe(res => {
        if (res) {
          this.timelineItems = [res, ...this.timelineItems];
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe);
  }
  fetchTweetTimelineData(): void {
    this._homeService.fetchTimeline().subscribe(res => {
      this.fetchedTimeline = true;
      this.timelineItems = [...res?.timeline];
    });
  }
}
