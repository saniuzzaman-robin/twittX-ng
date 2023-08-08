import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PageConfig, User } from 'src/app/shared/models/shared.models';
import { UserService } from 'src/app/shared/services/user.service';
import { ExploreUsersService } from '../../services/explore-users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-users',
  templateUrl: './explore-users.component.html',
  styleUrls: ['./explore-users.component.scss'],
})
export class ExploreUsersComponent implements OnInit {
  users: User[] = [];
  followingList: number[] = [];
  fetchedUsers: boolean = false;
  fetchedAllUsers: boolean = false;
  usersPageConfig: PageConfig = {
    page: 1,
    size: 20,
  };
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
    this.fetchUsers();
    this.exploreUsersForm.controls['textSearch'].valueChanges
      .pipe(debounceTime(500))
      .subscribe((res: string) => {
        this.fetchedAllUsers = false;
        this.usersPageConfig.page = 1;
        this.fetchedUsers = false;
        this.users = [];
        if (res.length > 2) {
          this.fetchUsersBySearch(res);
        } else {
          this.fetchAllUsers();
        }
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
  fetchUsersBySearch(key: string): void {
    if (this.fetchedAllUsers) {
      return;
    }
    this._exploreUsersService
      .searchUser(key, this.usersPageConfig)
      .subscribe(res => {
        this.fetchedUsers = true;
        this.users = [...this.users, ...res?.search_results];
        if (res?.count < this.usersPageConfig.size) {
          this.fetchedAllUsers = true;
        } else {
          this.usersPageConfig.page++;
        }
      });
  }
  fetchAllUsers() {
    if (this.fetchedAllUsers) {
      return;
    }
    this._userService.getUsers(this.usersPageConfig).subscribe(res => {
      this.fetchedUsers = true;
      this.users = [...this.users, ...res?.users];
      if (res?.count < this.usersPageConfig.size) {
        this.fetchedAllUsers = true;
      } else {
        this.usersPageConfig.page++;
      }
    });
  }
  fetchUsers() {
    if (this.exploreUsersForm.controls['textSearch'].value?.length > 2) {
      this.fetchUsersBySearch(
        this.exploreUsersForm.controls['textSearch'].value
      );
    } else {
      this.fetchAllUsers();
    }
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
