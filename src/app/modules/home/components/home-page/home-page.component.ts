import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/shared.models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  myFollowings: User[] = [];
  constructor(private _userService: UserService) {}
  ngOnInit(): void {
    this._userService.getMyFollowings().subscribe(res => {
      this.myFollowings = res?.followings;
    });
  }
}
