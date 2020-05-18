import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { of } from 'rxjs/internal/observable/of'
import { NearbyEventsService } from '../../../core/services/nearby-events.service'
import { EventFilterModel } from '../../../shared/models/event-filter.model'
import { EventModel } from '../../../shared/models/event.model'
import { VenueModel } from '../../../shared/models/venue.model'

import { NearbyEventsComponent } from './nearby-events.component'
import Spy = jasmine.Spy

describe('NearbyEventsComponent', () => {
  let component: NearbyEventsComponent
  let fixture: ComponentFixture<NearbyEventsComponent>
  let nearbyEventService: NearbyEventsService
  const getFilteredEventsValue: EventModel[] = []

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NearbyEventsComponent],
      providers: [
        {
          provide: NearbyEventsService,
          useValue: {
            eventFilter: new BehaviorSubject<EventFilterModel>(new EventFilterModel()),
            getFilteredEvents: (venue: VenueModel) => of(getFilteredEventsValue),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsComponent)
    component = fixture.componentInstance
    nearbyEventService = TestBed.inject(NearbyEventsService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch data (once) on filter change', (done: DoneFn) => {
    const nearbyEventsServiceSpy: Spy = spyOn(nearbyEventService, 'getFilteredEvents').and.callThrough()
  
    nearbyEventService.eventFilter.next(new EventFilterModel())
    fixture.detectChanges()
    
    fixture.whenStable().then(() => {
      expect(nearbyEventsServiceSpy.calls.count()).toBe(1, 'data fetch once - on filter change')
      expect(component.filteredEvents).toEqual(getFilteredEventsValue)
      done()
    })
  })
})
