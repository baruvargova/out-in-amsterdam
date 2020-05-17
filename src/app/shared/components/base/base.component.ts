import { OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'

export abstract class BaseComponent implements OnDestroy {
  public alive$ = new Subject<boolean>()

  public ngOnDestroy(): void {
    this.alive$.next(false)
  }
}
