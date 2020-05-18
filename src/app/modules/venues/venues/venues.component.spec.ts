import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { of } from 'rxjs/internal/observable/of'
import { VENUE_DETAIL } from '../../../core/mocks/venue-detail'
import { VenueService } from '../../../core/services/venue.service'
import { VenueFilterModel } from '../../../shared/models/venue-filter.model'
import { VenueModel } from '../../../shared/models/venue.model'

import { VenuesComponent } from './venues.component'
import Spy = jasmine.Spy

describe('VenuesComponent', () => {
  let component: VenuesComponent
  let fixture: ComponentFixture<VenuesComponent>
  let venueService: VenueService
  const getVenuesValue: VenueModel[] = [new VenueModel(JSON.parse(VENUE_DETAIL))]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VenuesComponent],
      providers: [
        {
          provide: VenueService,
          useValue: {
            venueFilter: new BehaviorSubject<VenueFilterModel>(new VenueFilterModel()),
            getVenues: () => of(getVenuesValue),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesComponent)
    component = fixture.componentInstance
    venueService = TestBed.inject(VenueService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  
  it('should fetch data (once) on filter change', (done: DoneFn) => {
    const nearbyEventsServiceSpy: Spy = spyOn(venueService, 'getVenues').and.callThrough()
  
    venueService.venueFilter.next(new VenueFilterModel())
    fixture.detectChanges()
    
    fixture.whenStable().then(() => {
      expect(nearbyEventsServiceSpy.calls.count()).toBe(1, 'data fetch once - on filter change')
      expect(component.venues).toEqual(getVenuesValue)
      done()
    })
  })
})
