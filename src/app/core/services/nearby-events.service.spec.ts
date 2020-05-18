import { TestBed } from '@angular/core/testing'

import { of } from 'rxjs/internal/observable/of'

import { getDistance } from '../../shared/helpers/distance.helper'
import { EventFilterModel } from '../../shared/models/event-filter.model'
import { EventModel } from '../../shared/models/event.model'
import { VenueModel } from '../../shared/models/venue.model'

import { EVENTS_WITH_DURATION } from '../mocks/events-with-duration'
import { FILTERED_NEARBY_EVENTS } from '../mocks/filtered-nearby-events'
import { NEARBY_EVENTS } from '../mocks/nearby-events'
import { VENUE_DETAIL } from '../mocks/venue-detail'
import { NearbyEventsService } from './nearby-events.service'
import { VenueService } from './venue.service'

describe('NearbyEventsService', () => {
  let service: NearbyEventsService
  const venueDetail = new VenueModel(JSON.parse(VENUE_DETAIL))
  const nearbyEvents = JSON.parse(NEARBY_EVENTS).map((x) => {
    const ev = new EventModel(x)
    ev.setVenueDistance(getDistance(venueDetail.location, ev.location))
    return ev
  })
  const filteredEvents = JSON.parse(FILTERED_NEARBY_EVENTS).map((x) => {
    const ev = new EventModel(x)
    ev.setVenueDistance(getDistance(venueDetail.location, ev.location))
    return ev
  })
  const eventsWithDuration = JSON.parse(EVENTS_WITH_DURATION).map((x) => new EventModel(x))

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: VenueService,
          useValue: {
            getVenue: (venueId: string) => of(venueDetail),
          },
        },
      ],
    })
    service = TestBed.inject(NearbyEventsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('getNearbyEvents() should return ordered events close to venue', () => {
    const venueId = '10977bdb-b449-4eee-9213-d1e1c3689485'
    service.getNearbyEvents(venueId).subscribe((res) => {
      expect(res).toEqual(nearbyEvents)
    })
  })

  it('getFilteredEvents() should return filtered nearby with filter', () => {
    const eventFilter = new EventFilterModel({
      name: 'TON',
      month: 3,
      year: 2014,
    })
    service.eventFilter.next(eventFilter)

    service.getFilteredEvents(nearbyEvents).subscribe((res) => {
      expect(res).toEqual(filteredEvents)
    })
  })

  it('getFilteredEvents() should return filtered nearby with filter (event duration test)', () => {
    const eventFilter = new EventFilterModel({
      name: '',
      month: 7,
      year: null,
    })
    service.eventFilter.next(eventFilter)

    service.getFilteredEvents(eventsWithDuration).subscribe((res) => {
      expect(res).toEqual(eventsWithDuration)
    })
  })
})
