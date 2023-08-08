import { Component, OnInit } from '@angular/core';
import {
  PageConfig,
  Timeline,
  User,
} from 'src/app/shared/models/shared.models';
import { UserService } from 'src/app/shared/services/user.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  myFollowings: User[] = [];
  fetchedTimeline: boolean = false;
  fetchedAllData: boolean = false;
  timelineItems: Timeline[] = [];
  pageConfig: PageConfig = {
    page: 1,
    size: 20,
  };
  constructor(
    private _userService: UserService,
    private _homeService: HomeService
  ) {}
  ngOnInit(): void {
    this.fetchTweetTimelineData();
    this._userService.getMyFollowings().subscribe(res => {
      this.myFollowings = res?.followings;
    });
  }
  fetchTweetTimelineData(): void {
    if (this.fetchedAllData) {
      return;
    }
    this._homeService.fetchTimeline(this.pageConfig).subscribe(res => {
      this.fetchedTimeline = true;
      this.timelineItems = [...this.timelineItems, ...res?.timeline];
      if (res?.count < this.pageConfig.size) {
        this.fetchedAllData = true;
      } else {
        this.pageConfig.page++;
      }
    });
  }
}
