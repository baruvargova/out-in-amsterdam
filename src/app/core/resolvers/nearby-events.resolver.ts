import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import { EMPTY } from 'rxjs/internal/observable/empty'
import { catchError } from 'rxjs/operators'

import { EventModel } from '../../shared/models/event.model'

import { NearbyEventsService } from '../services/nearby-events.service'

@Injectable({ providedIn: 'root' })
export class NearbyEventsResolver implements Resolve<EventModel[]> {
  constructor(private service: NearbyEventsService, private router: Router) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<EventModel[]> | Observable<never> {
    return this.service.getNearbyEvents(route.paramMap.get('id')).pipe(catchError((err) => EMPTY))
  }
}
