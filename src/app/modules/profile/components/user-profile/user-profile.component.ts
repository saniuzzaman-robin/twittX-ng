import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { Timeline, User } from 'src/app/shared/models/shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

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
  currentUser: any;
  constructor(
    private _route: ActivatedRoute,
    private _userProfileService: UserProfileService,
    private _userService: UserService,
    private _snackbar: MatSnackBar,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      this.userName = '';
      this.fetchUserTweets(this.userId);
      this.fetchUserFollowers(this.userId);
      this.fetchUserFollowings(this.userId);
    });
  }
  fetchUserTweets(id?: string) {
    this._userProfileService.getUserTweets(id).subscribe(res => {
      if (this.userId) {
        this.tweets = [...res?.tweets];
        this.userName =
          res?.tweets[0]?.user?.username ??
          this._authService.loggedInUser.value.username;
      } else {
        this.tweets = [...res?.my_tweets];
        this.userName =
          res?.my_tweets[0]?.user?.username ??
          this._authService.loggedInUser.value.username;
      }
      this.userName =
        this.userName ?? this._authService.loggedInUser.value.username;
      this.fetchedTweets = true;
    });
  }
  fetchUserFollowings(id?: string) {
    this._userService.getUserFollowings(id).subscribe(res => {
      this.followings = [...res?.followings];
    });
  }
  fetchUserFollowers(id?: string) {
    this._userService.getUserFollowers(id).subscribe(res => {
      this.followers = [...res?.followers];
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
}
