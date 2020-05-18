import { DebugElement } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

import { NgSelectModule } from '@ng-select/ng-select'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { of } from 'rxjs/internal/observable/of'

import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { tap } from 'rxjs/operators'
import { promise } from 'selenium-webdriver'
import { VenueService } from '../../../core/services/venue.service'
import { VenueFilterModel } from '../../../shared/models/venue-filter.model'

import { VenueFilterComponent } from './venue-filter.component'
import Promise = promise.Promise

describe('VenueFilterComponent', () => {
  let component: VenueFilterComponent
  let fixture: ComponentFixture<VenueFilterComponent>
  let venueService: VenueService
  const cities = ['AMSTERDAM', 'HAARLEM']

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
      declarations: [VenueFilterComponent],
      providers: [
        FormBuilder,
        {
          provide: VenueService,
          useValue: {
            venueFilter: new BehaviorSubject(new VenueFilterModel()),
            getCitiesToDropdown: (searchText: string) => of(cities),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueFilterComponent)
    component = fixture.componentInstance
    venueService = TestBed.inject(VenueService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form change should update filter', (done: DoneFn) => {
    const hostElement = fixture.nativeElement
    const nameInput: HTMLInputElement = hostElement.querySelector('#name')
    const startYearInput: HTMLInputElement = hostElement.querySelector('#startYear')
    const zipInput: HTMLInputElement = hostElement.querySelector('#zip')
    const ngSelectCities: DebugElement = fixture.debugElement.query(By.css('ng-select'))

    const nameTestValue = 'Papeneiland'
    const startYearTestValue = 2018
    const zipTestValue = '1015 DV'
    const selectedCities = cities

    // set name
    nameInput.value = nameTestValue
    nameInput.dispatchEvent(new Event('input'))

    // set start year
    startYearInput.value = startYearTestValue.toString()
    startYearInput.dispatchEvent(new Event('input'))

    // set zip
    zipInput.value = zipTestValue
    zipInput.dispatchEvent(new Event('input'))

    // set cities
    ngSelectCities.triggerEventHandler('keydown', { which: 32, key: '', preventDefault: () => {} }) // open ng-select
    ngSelectCities.triggerEventHandler('focus', {}) // focus to trigger autocomplete
    fixture.detectChanges()

    const selectOptions: HTMLElement[] = hostElement.querySelectorAll('.ng-option') // select option
    selectOptions[0].click()
    selectOptions[1].click()
    fixture.detectChanges()

    fixture.whenStable().then(() => {
      expect(venueService.venueFilter.value).toEqual(
        new VenueFilterModel({
          name: nameTestValue,
          cities: selectedCities,
          startYear: startYearTestValue,
          zip: zipTestValue,
        })
      )
      done();
    })
  })
})
