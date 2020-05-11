import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import { EMPTY } from 'rxjs/internal/observable/empty'
import { catchError } from 'rxjs/operators'

import { VenueModel } from '../../shared/models/venue.model';
import { VenueService } from '../services/venue.service';


@Injectable({ providedIn: 'root' })
export class VenueDetailResolver implements Resolve<VenueModel> {
  constructor(private service: VenueService, private router: Router) {}
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VenueModel> | Observable<never> {
    return this.service.getVenue(route.paramMap.get('id')).pipe(
      catchError(err => {
        this.router.navigate(['/', 'not-found'])
        return EMPTY
      })
    )
  }
}
