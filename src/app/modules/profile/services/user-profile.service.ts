import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TwittxCommandService } from 'src/app/shared/services/twittx-command.service';
import { TwittxQueryService } from 'src/app/shared/services/twittx-query.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private _queryService: TwittxQueryService,
    private _commandService: TwittxCommandService
  ) {}
  getUserTweets(id?: string): Observable<any> {
    let queryUrl = '';
    if (id) {
      queryUrl = environment.commandQueryUrls.getTweetsByUserId.replace(
        'user_id',
        id
      );
    } else {
      queryUrl = environment.commandQueryUrls.getMyTweets;
    }
    return this._queryService.executeAsync(queryUrl);
  }
  getUserFollowings(id?: string): Observable<any> {
    let queryUrl = '';
    if (id) {
      queryUrl = environment.commandQueryUrls.getFollwingsByUserId.replace(
        'user_id',
        id
      );
    } else {
      queryUrl = environment.commandQueryUrls.getMyFollowings;
    }
    return this._queryService.executeAsync(queryUrl);
  }
  getUserFollowers(id?: string): Observable<any> {
    let queryUrl = '';
    if (id) {
      queryUrl = environment.commandQueryUrls.getFollowersByUserId.replace(
        'user_id',
        id
      );
    } else {
      queryUrl = environment.commandQueryUrls.getMyFollowers;
    }
    return this._queryService.executeAsync(queryUrl);
  }
  followUser(id: string): Observable<any> {
    return this._commandService.executeAsync(
      environment.commandQueryUrls.followUser,
      { user_id: id }
    );
  }
  unfollowUser(id: string): Observable<any> {
    return this._commandService.executeAsync(
      environment.commandQueryUrls.unfollowUser,
      { user_id: id }
    );
  }
}
