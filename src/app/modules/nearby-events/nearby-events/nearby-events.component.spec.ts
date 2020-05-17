import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { of } from 'rxjs/internal/observable/of'
import { NearbyEventsService } from '../../../core/services/nearby-events.service'
import { EventFilterModel } from '../../../shared/models/event-filter.model'
import { VenueModel } from '../../../shared/models/venue.model'

import { NearbyEventsComponent } from './nearby-events.component'

describe('NearbyEventsComponent', () => {
  let component: NearbyEventsComponent
  let fixture: ComponentFixture<NearbyEventsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NearbyEventsComponent],
      providers: [
        {
          provide: NearbyEventsService,
          useValue: {
            eventFilter: new BehaviorSubject<EventFilterModel>(new EventFilterModel()),
            getFilteredEvents: (venue: VenueModel) => of([]),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
