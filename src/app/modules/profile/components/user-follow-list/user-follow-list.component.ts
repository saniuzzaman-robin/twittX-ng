import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-user-follow-list',
  templateUrl: './user-follow-list.component.html',
  styleUrls: ['./user-follow-list.component.scss'],
})
export class UserFollowListComponent {
  @Input() users: User[] = [];
  @Input() followingList: boolean = false;
  @Input() followerList: boolean = false;
  @Input() myProfile: boolean = false;
  @Output() unfollowUser: EventEmitter<string> = new EventEmitter();

  unfollow(id: string): void {
    this.unfollowUser.emit(id);
  }
}
