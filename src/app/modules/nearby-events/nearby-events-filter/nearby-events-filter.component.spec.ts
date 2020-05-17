import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { NearbyEventsService } from '../../../core/services/nearby-events.service'
import { EventFilterModel } from '../../../shared/models/event-filter.model'

import { NearbyEventsFilterComponent } from './nearby-events-filter.component'

describe('NearbyEventsFilterComponent', () => {
  let component: NearbyEventsFilterComponent
  let fixture: ComponentFixture<NearbyEventsFilterComponent>

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
      declarations: [NearbyEventsFilterComponent],
      providers: [
        FormBuilder,
        {
          provide: NearbyEventsService,
          useValue: {
            eventFilter: new BehaviorSubject(new EventFilterModel()),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyEventsFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
