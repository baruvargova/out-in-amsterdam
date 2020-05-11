import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  take,
  takeUntil
} from 'rxjs/operators';
import { NearbyEventsService } from '../../../core/services/nearby-events.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { BaseViewEnum } from '../../../shared/enums/base-view.enum';
import { EventModel } from '../../../shared/models/event.model';

@Component({
  selector: 'app-nearby-events',
  templateUrl: './nearby-events.component.html',
  styleUrls: ['./nearby-events.component.scss']
})
export class NearbyEventsComponent extends BaseComponent implements OnInit {
  @Input()nearbyEvents: EventModel[]
  
  public selectedView: BaseViewEnum
  public BaseViewEnum = BaseViewEnum
  
  public filteredEvents: EventModel[]
  
  
  constructor(private eventService: NearbyEventsService) {
    super()
  }

  ngOnInit(): void {
    this.selectedView = BaseViewEnum.Table
    this.initVenues()
  }
  
  private initVenues(): void {
    this.eventService.eventFilter.pipe(takeUntil(this.alive$)).subscribe(filter => {
      this.resetList()
      this.updateList()
    })
  }
  
  private resetList(): void {
    this.filteredEvents = []
  }
  
  private updateList(): void {
    this.eventService.getFilteredEvents(this.nearbyEvents)
    .pipe(
      takeUntil(this.alive$),
      take(1)
    )
    .subscribe(events => {
      this.filteredEvents = events
    })
  }
  
  public switchViewTo(view: BaseViewEnum): void {
    this.selectedView = view
  }

}
