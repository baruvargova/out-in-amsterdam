import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { of } from 'rxjs/internal/observable/of'
import { VenueService } from '../../../core/services/venue.service'
import { VenueFilterModel } from '../../../shared/models/venue-filter.model'

import { VenuesComponent } from './venues.component'

describe('VenuesComponent', () => {
  let component: VenuesComponent
  let fixture: ComponentFixture<VenuesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VenuesComponent],
      providers: [
        {
          provide: VenueService,
          useValue: {
            venueFilter: new BehaviorSubject<VenueFilterModel>(new VenueFilterModel()),
            getVenues: () => of([]),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
