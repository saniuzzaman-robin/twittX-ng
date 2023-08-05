import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { Timeline, User } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  tweets: Timeline[] = [];
  followings: User[] = [];
  followers: User[] = [];
  constructor(
    private _route: ActivatedRoute,
    private _userProfileService: UserProfileService
  ) {}
  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      this.fetchUserTweets(this.userId);
      this.fetchUserFollowers(this.userId);
      this.fetchUserFollowings(this.userId);
    });
  }
  fetchUserTweets(id?: string) {
    this._userProfileService.getUserTweets(id).subscribe(res => {
      if (this.userId) {
        this.tweets = [...res?.tweets];
      } else {
        this.tweets = [...res?.my_tweets];
      }
    });
  }
  fetchUserFollowings(id?: string) {
    this._userProfileService.getUserFollowings(id).subscribe(res => {
      this.followings = [...res?.followings];
    });
  }
  fetchUserFollowers(id?: string) {
    this._userProfileService.getUserFollowers(id).subscribe(res => {
      this.followers = [...res?.followers];
    });
  }
}
