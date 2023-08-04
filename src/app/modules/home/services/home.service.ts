import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TwittxCommandService } from 'src/app/shared/services/twittx-command.service';
import { TwittxQueryService } from 'src/app/shared/services/twittx-query.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private _commandService: TwittxCommandService,
    private _queryService: TwittxQueryService
  ) {}
  fetchTimeline(): Observable<any> {
    return this._queryService.executeAsync(
      environment.commandQueryUrls.getMyTimeline
    );
  }
}
