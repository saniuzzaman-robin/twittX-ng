import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import {
  PageConfig,
  Timeline,
  User,
} from 'src/app/shared/models/shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/services/user.service';
import { CookieService } from 'src/app/modules/auth/services/cookie.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  userName: string = '';
  tweets: Timeline[] = [];
  followings: User[] = [];
  followers: User[] = [];
  fetchedTweets: boolean = false;
  fetchedAllTweets: boolean = false;
  fetchedAllFollowings: boolean = false;
  fetchedAllFollowers: boolean = false;
  currentUser: any;
  selectedTabIndex: number = 0;
  tweetsPageConfig: PageConfig = {
    page: 1,
    size: 20,
  };
  followingsPageConfig: PageConfig = {
    page: 1,
    size: 20,
  };
  followersPageConfig: PageConfig = {
    page: 1,
    size: 20,
  };
  constructor(
    private _route: ActivatedRoute,
    private _userProfileService: UserProfileService,
    private _userService: UserService,
    private _snackbar: MatSnackBar,
    private _cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this._route.queryParamMap.subscribe((res: any) => {
      this.userName =
        res?.params?.username ?? this._cookieService.getCookie('username');
    });
    this._route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      this.fetchUserTweets(this.userId);
      this.fetchUserFollowers(this.userId);
      this.fetchUserFollowings(this.userId);
    });
  }
  fetchUserTweets(id?: string) {
    if (this.fetchedAllTweets) {
      return;
    }
    this._userProfileService
      .getUserTweets(id, this.tweetsPageConfig)
      .subscribe(res => {
        if (this.userId) {
          this.tweets = [...this.tweets, ...res?.tweets];
        } else {
          this.tweets = [...this.tweets, ...res?.my_tweets];
        }
        this.fetchedTweets = true;
        if (res?.count < this.tweetsPageConfig.size) {
          this.fetchedAllTweets = true;
        } else {
          this.tweetsPageConfig.page++;
        }
      });
  }
  fetchUserFollowings(id?: string) {
    if (this.fetchedAllFollowings) {
      return;
    }
    this._userService
      .getUserFollowings(id, this.followingsPageConfig)
      .subscribe(res => {
        this.followings = [...this.followings, ...res?.followings];
        if (res?.count < this.followingsPageConfig.size) {
          this.fetchedAllFollowings = true;
        } else {
          this.followingsPageConfig.page++;
        }
      });
  }
  fetchUserFollowers(id?: string) {
    if (this.fetchedAllFollowers) {
      return;
    }
    this._userService
      .getUserFollowers(id, this.followersPageConfig)
      .subscribe(res => {
        this.followers = [...this.followers, ...res?.followers];
        if (res?.count < this.followingsPageConfig.size) {
          this.fetchedAllFollowers = true;
        } else {
          this.followersPageConfig.page++;
        }
      });
  }
  unfollowUser(id: string): void {
    this._userService.unfollowUser(id).subscribe(res => {
      this.followings = this.followings.filter(
        item => item.id.toString() !== id
      );
      this.showSnackbarMessage('Unfollowed user');
    });
  }
  showSnackbarMessage(data: string): void {
    this._snackbar.open(data, '', { duration: 2000 });
  }
  fetchData(): void {
    switch (this.selectedTabIndex) {
      case 0:
        this.fetchUserTweets(this.userId);
        break;
      case 1:
        this.fetchUserFollowers(this.userId);
        break;
      case 2:
        this.fetchUserFollowings(this.userId);
        break;
      default:
        break;
    }
  }
  tabChanged(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }
}
