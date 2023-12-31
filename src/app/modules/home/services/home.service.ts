import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageConfig } from 'src/app/shared/models/shared.models';
import { TwittxCommandService } from 'src/app/shared/services/twittx-command.service';
import { TwittxQueryService } from 'src/app/shared/services/twittx-query.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  newTweetPosted: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(
    private _commandService: TwittxCommandService,
    private _queryService: TwittxQueryService
  ) {}
  fetchTimeline(queryParams: PageConfig): Observable<any> {
    return this._queryService.executeAsync(
      environment.commandQueryUrls.getMyTimeline,
      {},
      queryParams
    );
  }
  makeTweet(text: string): Observable<any> {
    return this._commandService.executeAsync(
      environment.commandQueryUrls.makeTweet,
      { content: text }
    );
  }
}
