import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  textInput: string = '';
  constructor(private _homeService: HomeService) {}
  ngOnInit(): void {
    console.log(this.textInput);
  }
  postTweet(): void {
    this._homeService.makeTweet(this.textInput).subscribe(res => {
      this._homeService.newTweetPosted.next(res?.tweet);
      this.textInput = '';
    });
  }
}
