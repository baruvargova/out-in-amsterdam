import { Component, OnInit } from '@angular/core';
import {
  take,
  takeUntil
} from 'rxjs/operators';
import { VenueService } from '../../../core/services/venue.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { BaseViewEnum } from '../../../shared/enums/base-view.enum';
import { EventVenueModel } from '../../../shared/models/event-venue.model';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent extends BaseComponent implements OnInit {
  
  public venues: EventVenueModel[]
  public selectedView: BaseViewEnum
  public BaseViewEnum = BaseViewEnum

  constructor(private venueService: VenueService) {
    super()
  }

  ngOnInit(): void {
    this.selectedView = BaseViewEnum.Table
    
    this.initVenues();
    
  }
  
  private initVenues(): void {
    this.venueService.venueFilter.pipe(takeUntil(this.alive$)).subscribe(filter => {
      this.resetList()
      this.updateList()
    })
  }
  
  private resetList(): void {
    this.venues = []
  }
  
  private updateList(): void {
    this.venueService.getVenues()
    .pipe(
      takeUntil(this.alive$),
      take(1)
    )
    .subscribe(venues => {
      this.venues = venues
    })
  }
  
  public switchViewTo(view: BaseViewEnum): void {
    this.selectedView = view
  }

}
