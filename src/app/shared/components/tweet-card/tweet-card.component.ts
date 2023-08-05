import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Timeline } from '../../models/shared.models';

@Component({
  selector: 'app-tweet-card',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss'],
})
export class TweetCardComponent {
  @Input() timeline: Timeline | undefined;
  getRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}
