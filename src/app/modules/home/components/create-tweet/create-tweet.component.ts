import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  textInput: string = '';
  constructor(
    private _homeService: HomeService,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
  }
  postTweet(): void {
    this._homeService.makeTweet(this.textInput).subscribe(res => {
      this.showSnackbarMessage('Tweeted successfully');
      this._homeService.newTweetPosted.next(res?.tweet);
      this.textInput = '';
    });
  }
  showSnackbarMessage(data: string): void {
    this._snackbar.open(data, '', { duration: 2000 });
  }
}
