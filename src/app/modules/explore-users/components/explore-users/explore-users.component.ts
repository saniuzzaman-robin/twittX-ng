import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, forkJoin } from 'rxjs';
import { User } from 'src/app/shared/models/shared.models';
import { UserService } from 'src/app/shared/services/user.service';
import { ExploreUsersService } from '../../services/explore-users.service';
import { cloneDeep } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-users',
  templateUrl: './explore-users.component.html',
  styleUrls: ['./explore-users.component.scss'],
})
export class ExploreUsersComponent implements OnInit {
  users: User[] = [];
  allUsers: User[] = [];
  followingList: number[] = [];
  fetchedUsers: boolean = false;
  exploreUsersForm: FormGroup = new FormGroup({
    textSearch: new FormControl(),
  });
  constructor(
    private _userService: UserService,
    private _exploreUsersService: ExploreUsersService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.initData();
    this.exploreUsersForm.controls['textSearch'].valueChanges
      .pipe(debounceTime(500))
      .subscribe((res: string) => {
        if (res.length > 2) {
          this.fetchUsers(res);
        } else {
          this.users = cloneDeep(this.allUsers);
        }
      });
  }
  initData(): void {
    forkJoin([
      this._userService.getUsers(),
      this._userService.getMyFollowings(),
    ]).subscribe(res => {
      res[1]?.followings?.forEach((item: any) => {
        this.followingList.push(item.id);
      });
      this.users = [...res[0]?.users];
      this.allUsers = cloneDeep(this.users);
      this.fetchedUsers = true;
    });
  }
  follow(id: string): void {
    this._userService.followUser(id).subscribe(res => {
      this.followingList.push(parseInt(id));
      this.showSnackbarMessage('Followed user successfully');
    });
  }
  unfollow(id: string): void {
    this._userService.unfollowUser(id).subscribe(res => {
      this.followingList = this.followingList.filter(
        item => item.toString() !== id
      );
      this.showSnackbarMessage('Unfollowed user');
    });
  }
  fetchUsers(key: string): void {
    this._exploreUsersService.searchUser(key).subscribe(res => {
      this.users = [...res?.search_results];
    });
  }
  showSnackbarMessage(data: string): void {
    this._snackbar.open(data, '', { duration: 2000 });
  }
  navigateToProfile(user: User) {
    this._router.navigate(['profile/', user.id], {
      queryParams: { username: user.username },
    });
  }
}
