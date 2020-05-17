import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { merge } from 'rxjs'
import { Observable } from 'rxjs/internal/Observable'
import { Subject } from 'rxjs/internal/Subject'
import { of } from 'rxjs/internal/observable/of'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators'

import { VenueService } from '../../../core/services/venue.service'
import { BaseComponent } from '../../../shared/components/base/base.component'
import { DEFAULT_DEBOUNCE } from '../../../shared/helpers/constants'
import { VenueFilterModel } from '../../../shared/models/venue-filter.model'

@Component({
  selector: 'app-venue-filter',
  templateUrl: './venue-filter.component.html',
  styleUrls: ['./venue-filter.component.scss'],
})
export class VenueFilterComponent extends BaseComponent implements OnInit {
  public form: FormGroup

  public cities$: Observable<string[]>
  public citiesInput$ = new Subject<string>()
  public citiesFocus$ = new Subject<string>()

  constructor(private fb: FormBuilder, private venueService: VenueService) {
    super()
  }

  public ngOnInit(): void {
    this.initForm()
    this.initValueChanges()
    this.initCities()
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [''],
      cities: [[]],
      startYear: [null],
      zip: [''],
    })

    this.form.patchValue(this.venueService.venueFilter.value)
  }

  private initValueChanges(): void {
    this.form
      .get('name')
      .valueChanges.pipe(
        takeUntil(this.alive$),
        distinctUntilChanged(),
        debounceTime(DEFAULT_DEBOUNCE)
      )
      .subscribe((name: string) => {
        this.venueService.venueFilter.next(new VenueFilterModel({ ...this.form.value, name }))
      })

    this.form
      .get('cities')
      .valueChanges.pipe(takeUntil(this.alive$), distinctUntilChanged())
      .subscribe((cities: string[]) => {
        this.venueService.venueFilter.next(new VenueFilterModel({ ...this.form.value, cities }))
      })

    this.form
      .get('startYear')
      .valueChanges.pipe(
        takeUntil(this.alive$),
        distinctUntilChanged(),
        debounceTime(DEFAULT_DEBOUNCE)
      )
      .subscribe((startYear: number) => {
        this.venueService.venueFilter.next(new VenueFilterModel({ ...this.form.value, startYear }))
      })

    this.form
      .get('zip')
      .valueChanges.pipe(
        takeUntil(this.alive$),
        distinctUntilChanged(),
        debounceTime(DEFAULT_DEBOUNCE)
      )
      .subscribe((zip: string) => {
        this.venueService.venueFilter.next(new VenueFilterModel({ ...this.form.value, zip }))
      })
  }

  private initCities(): void {
    this.cities$ = merge(
      this.citiesFocus$,
      this.citiesInput$.pipe(debounceTime(DEFAULT_DEBOUNCE), distinctUntilChanged())
    ).pipe(
      switchMap((searchText: string) =>
        this.venueService.getCitiesToDropdown(searchText).pipe(catchError(() => of([])))
      )
    )
  }
}
