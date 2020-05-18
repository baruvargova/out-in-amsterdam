import { DebugElement } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NgSelectModule } from '@ng-select/ng-select'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { NearbyEventsService } from '../../../core/services/nearby-events.service'
import { EventFilterModel } from '../../../shared/models/event-filter.model'

import { NearbyEventsFilterComponent } from './nearby-events-filter.component'

describe('NearbyEventsFilterComponent', () => {
  let component: NearbyEventsFilterComponent
  let fixture: ComponentFixture<NearbyEventsFilterComponent>
  let nearbyEventService: NearbyEventsService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
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
    nearbyEventService = TestBed.inject(NearbyEventsService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form change should update filter', (done: DoneFn) => {
    const hostElement = fixture.nativeElement
    const nameInput: HTMLInputElement = hostElement.querySelector('#name')
    const ngSelect: DebugElement = fixture.debugElement.query(By.css('ng-select'))
    const yearInput: HTMLInputElement = hostElement.querySelector('#year')
    const nameTestValue = 'Papeneiland'
    const monthIndex = 3 // april
    const yearTestValue = 2018

    // set name
    nameInput.value = nameTestValue
    nameInput.dispatchEvent(new Event('input'))

    // set year
    yearInput.value = yearTestValue.toString()
    yearInput.dispatchEvent(new Event('input'))

    // set month
    ngSelect.triggerEventHandler('keydown', { which: 32, key: '', preventDefault: () => {} }) // open ng-select
    fixture.detectChanges()
    const selectOptions: HTMLElement[] = hostElement.querySelectorAll('.ng-option') // select option
    selectOptions[monthIndex].click()
    fixture.detectChanges()

    fixture.whenStable().then(() => {
      expect(nearbyEventService.eventFilter.value).toEqual(
        new EventFilterModel({
          name: nameTestValue,
          month: monthIndex,
          year: yearTestValue,
        })
      )
      done()
    })
  })
})
