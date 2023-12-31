import { Injectable } from '@angular/core';
import { TwittxQueryService } from './twittx-query.service';
import { TwittxCommandService } from './twittx-command.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _queryService: TwittxQueryService,
    private _commandService: TwittxCommandService
  ) {}
  getUsers(queryParams?: any): Observable<any> {
    return this._queryService.executeAsync(
      environment.commandQueryUrls.getAllUsers,
      {},
      queryParams
    );
  }
  getMyFollowings(queryParams?: any): Observable<any> {
    return this._queryService.executeAsync(
      environment.commandQueryUrls.getMyFollowings,
      {},
      queryParams
    );
  }
  getMyFollowers(queryParams?: any): Observable<any> {
    return this._queryService.executeAsync(
      environment.commandQueryUrls.getMyFollowers,
      {},
      queryParams
    );
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
  getUserFollowings(id?: string, queryParams?: any): Observable<any> {
    let queryUrl = '';
    if (id) {
      queryUrl = environment.commandQueryUrls.getFollwingsByUserId.replace(
        'user_id',
        id
      );
    } else {
      queryUrl = environment.commandQueryUrls.getMyFollowings;
    }
    return this._queryService.executeAsync(queryUrl, {}, queryParams);
  }
  getUserFollowers(id?: string, queryParams?: any): Observable<any> {
    let queryUrl = '';
    if (id) {
      queryUrl = environment.commandQueryUrls.getFollowersByUserId.replace(
        'user_id',
        id
      );
    } else {
      queryUrl = environment.commandQueryUrls.getMyFollowers;
    }
    return this._queryService.executeAsync(queryUrl, {}, queryParams);
  }
}
