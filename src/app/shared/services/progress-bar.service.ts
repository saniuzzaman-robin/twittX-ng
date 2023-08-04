import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  executingNetwrokCall: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}
}
