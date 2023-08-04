import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Timeline } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-tweet-timeline',
  templateUrl: './tweet-timeline.component.html',
  styleUrls: ['./tweet-timeline.component.scss'],
})
export class TweetTimelineComponent implements OnInit {
  fetchedTimeline: boolean = false;
  timelineItems: Timeline[] = [];
  constructor(private _homeService: HomeService) {}
  ngOnInit(): void {
    this.fetchTweetTimelineData();
  }
  fetchTweetTimelineData(): void {
    this._homeService.fetchTimeline().subscribe(res => {
      this.fetchedTimeline = true;
      this.timelineItems = [...res?.timeline];
      console.log(res);
    });
  }
}