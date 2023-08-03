import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  textInput: string = '';

  ngOnInit(): void {
    console.log(this.textInput);
  }
}
