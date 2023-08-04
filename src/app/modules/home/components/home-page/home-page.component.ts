import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { User } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  myFollowings: User[] = [];
  constructor(private _homeService: HomeService) {}
  ngOnInit(): void {
    this._homeService.fetchFollowings().subscribe(res => {
      this.myFollowings = res?.followings;
      console.log(this.myFollowings);
    });
  }
}
