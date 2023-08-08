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
  getUserTweets(id?: string, queryParams?: any): Observable<any> {
    let queryUrl = '';
    if (id) {
      queryUrl = environment.commandQueryUrls.getTweetsByUserId.replace(
        'user_id',
        id
      );
    } else {
      queryUrl = environment.commandQueryUrls.getMyTweets;
    }
    return this._queryService.executeAsync(queryUrl, {}, queryParams);
  }
}
