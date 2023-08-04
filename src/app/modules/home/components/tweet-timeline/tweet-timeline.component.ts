import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-tweet-timeline',
  templateUrl: './tweet-timeline.component.html',
  styleUrls: ['./tweet-timeline.component.scss'],
})
export class TweetTimelineComponent implements OnInit {
  constructor(private _homeService: HomeService) {}
  ngOnInit(): void {
    this.fetchTweetTimelineData();
  }
  fetchTweetTimelineData(): void {
    this._homeService.fetchTimeline().subscribe(res => {
      console.log(res);
    });
  }
}
