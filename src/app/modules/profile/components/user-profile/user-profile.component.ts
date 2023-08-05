import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { Timeline, User } from 'src/app/shared/models/shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  tweets: Timeline[] = [];
  followings: User[] = [];
  followers: User[] = [];
  fetchedTweets: boolean = false;
  constructor(
    private _route: ActivatedRoute,
    private _userProfileService: UserProfileService,
    private _snackbar: MatSnackBar
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
      this.fetchedTweets = true;
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
  unfollowUser(id: string): void {
    this._userProfileService.unfollowUser(id).subscribe(res => {
      this.followings = this.followings.filter(
        item => item.id.toString() !== id
      );
      this.showSnackbarMessage('Unfollowed user');
    });
  }
  showSnackbarMessage(data: string): void {
    this._snackbar.open(data, '', { duration: 2000 });
  }
}
