import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators'

import { NearbyEventsService } from '../../../core/services/nearby-events.service'
import { BaseComponent } from '../../../shared/components/base/base.component'
import { DEFAULT_DEBOUNCE, MONTHS } from '../../../shared/helpers/constants'
import { EventFilterModel } from '../../../shared/models/event-filter.model'

@Component({
  selector: 'app-nearby-events-filter',
  templateUrl: './nearby-events-filter.component.html',
  styleUrls: ['./nearby-events-filter.component.scss'],
})
export class NearbyEventsFilterComponent extends BaseComponent implements OnInit {
  public form: FormGroup
  public months: number[]

  constructor(private fb: FormBuilder, private nearbyEventService: NearbyEventsService) {
    super()
  }

  public ngOnInit(): void {
    this.initForm()
    this.initValueChanges()
    this.months = MONTHS
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [''],
      year: [null],
      month: [null],
    })

    this.form.patchValue(this.nearbyEventService.eventFilter.value)
  }

  private initValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.alive$), distinctUntilChanged(), debounceTime(DEFAULT_DEBOUNCE))
      .subscribe((value: EventFilterModel) => {
        this.nearbyEventService.eventFilter.next(new EventFilterModel({ ...this.form.value, name }))
      })

    this.form
      .get('month')
      .valueChanges.pipe(takeUntil(this.alive$), distinctUntilChanged())
      .subscribe((month: string[]) => {
        this.nearbyEventService.eventFilter.next(
          new EventFilterModel({ ...this.form.value, month })
        )
      })

    this.form
      .get('year')
      .valueChanges.pipe(
        takeUntil(this.alive$),
        distinctUntilChanged(),
        debounceTime(DEFAULT_DEBOUNCE)
      )
      .subscribe((year: number) => {
        this.nearbyEventService.eventFilter.next(new EventFilterModel({ ...this.form.value, year }))
      })
  }
}
