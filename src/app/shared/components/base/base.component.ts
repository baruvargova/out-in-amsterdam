import {
  OnDestroy
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs'

export abstract class BaseComponent implements OnDestroy {
  public alive$ = new Subject<boolean>()

  ngOnDestroy(): void {
    this.alive$.next(false)
  }
}
