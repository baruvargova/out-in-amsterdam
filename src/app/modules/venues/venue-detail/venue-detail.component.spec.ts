import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { VENUE_DETAIL } from '../../../core/mocks/venue-detail'
import { VenueModel } from '../../../shared/models/venue.model'

import { VenueDetailComponent } from './venue-detail.component'

const testVenue = new VenueModel(JSON.parse(VENUE_DETAIL))

describe('VenueDetailComponent', () => {
  let component: VenueDetailComponent
  let fixture: ComponentFixture<VenueDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      declarations: [VenueDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                venue: testVenue,
                nearbyEvents: [],
              },
            },
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
