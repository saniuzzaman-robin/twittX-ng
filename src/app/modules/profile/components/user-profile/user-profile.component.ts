import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { Timeline, User } from 'src/app/shared/models/shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookieService } from 'src/app/modules/auth/services/cookie.service';

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
