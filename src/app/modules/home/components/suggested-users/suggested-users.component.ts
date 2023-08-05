import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from 'src/app/shared/models/shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.component.html',
  styleUrls: ['./suggested-users.component.scss'],
})
export class SuggestedUsersComponent
  implements OnInit, AfterContentInit, OnChanges
{
  @Input() myFollowings: User[] = [];
  users: User[] = [];
  recommendedUsers: User[] = [];
  fetchedRecommendedUsers: boolean = false;
  constructor(
    private _homeService: HomeService,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this._homeService.fetchUsers().subscribe(res => {
      this.users = res?.users;
      this.initRecommendedUsers();
    });
  }
  initRecommendedUsers(): void {
    this.recommendedUsers = [];
    for (let user of this.users) {
      if (this.myFollowings.findIndex(item => item.id === user.id) === -1) {
        this.recommendedUsers.push(user);
      }
      if (this.recommendedUsers.length >= 5) {
        break;
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['myFollowings']?.firstChange) {
      this.initRecommendedUsers();
      this.fetchedRecommendedUsers = true;
    }
  }
  followUser(user: User): void {
    this._homeService.followUser(user.id).subscribe(res => {
      this.showSnackbarMessage('Followed user successfully');
      if (res?.resp) {
        this.myFollowings.push(user);
        this.initRecommendedUsers();
      }
    });
  }
  showSnackbarMessage(data: string): void {
    this._snackbar.open(data, '', { duration: 2000 });
  }
}
