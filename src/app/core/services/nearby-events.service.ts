import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Observable } from 'rxjs/internal/Observable'
import { of } from 'rxjs/internal/observable/of'
import { map } from 'rxjs/operators'

import { getDistance } from '../../shared/helpers/distance.helper'
import { isNearby, matchEventDate, searchBySubstring } from '../../shared/helpers/find.helper'
import { EventFilterModel } from '../../shared/models/event-filter.model'
import { EventModel } from '../../shared/models/event.model'
import { VenueModel } from '../../shared/models/venue.model'

import { VENUES_DATA } from '../mock-data/venues'
import { VenueService } from './venue.service'

@Injectable({
  providedIn: 'root',
})
export class NearbyEventsService {
  private events: EventModel[]

  public eventFilter = new BehaviorSubject<EventFilterModel>(new EventFilterModel())

  constructor(private venueService: VenueService) {
    this.initDataSet()
  }

  private initDataSet(): void {
    this.events = []
    this.events = JSON.parse(VENUES_DATA).map((x) => new EventModel(x))
  }

  public getNearbyEvents(venueId: string): Observable<EventModel[]> {
    this.eventFilter.next(new EventFilterModel())

    return this.venueService.getVenue(venueId).pipe(
      map((venue: VenueModel) => {
        return this.events
          .filter((event: EventModel) => {
            event.setVenueDistance(getDistance(event.location, venue.location))
            return isNearby(event.venueDistance)
          })
          .sort((a: EventModel, b: EventModel) => a.venueDistance - b.venueDistance)
      })
    )
  }

  public getFilteredEvents(nearbyEvents: EventModel[]): Observable<EventModel[]> {
    const filter = this.eventFilter.value
    return of(
      nearbyEvents
        .filter((x) => searchBySubstring(x.title, filter.name))
        .filter((x) => matchEventDate(x.dates, filter.month, filter.year))
    )
  }
}
