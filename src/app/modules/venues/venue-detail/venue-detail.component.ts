import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { distinctUntilChanged, takeUntil } from 'rxjs/operators'

import { TranslateService } from '@ngx-translate/core'
import { LangChangeEvent } from '@ngx-translate/core/lib/translate.service'
import { BaseComponent } from '../../../shared/components/base/base.component'
import { EventVenueDetailModel } from '../../../shared/models/event-venue-shared.models'
import { EventModel } from '../../../shared/models/event.model'
import { VenueModel } from '../../../shared/models/venue.model'

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss'],
})
export class VenueDetailComponent extends BaseComponent implements OnInit {
  public venue: VenueModel
  public nearbyEvents: EventModel
  public venueDetail: EventVenueDetailModel

  constructor(private route: ActivatedRoute, private translate: TranslateService) {
    super()
  }

  public ngOnInit(): void {
    this.venue = this.route.snapshot.data.venue
    this.nearbyEvents = this.route.snapshot.data.nearbyEvents
    this.initVenueDetail()
  }

  private initVenueDetail(): void {
    this.venueDetail = this.venue.details.detailByLang(this.translate.currentLang)
    this.translate.onLangChange
      .pipe(distinctUntilChanged(), takeUntil(this.alive$))
      .subscribe((langChange: LangChangeEvent) => {
        this.venueDetail = this.venue.details.detailByLang(langChange.lang)
      })
  }
}
