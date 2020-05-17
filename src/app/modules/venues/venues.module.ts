import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared/shared.module'

import { NearbyEventsModule } from '../nearby-events/nearby-events.module'
import { VenueDetailComponent } from './venue-detail/venue-detail.component'
import { VenueFilterComponent } from './venue-filter/venue-filter.component'
import { VenueListComponent } from './venue-list/venue-list.component'
import { VenuesRoutingModule } from './venues-routing.module'
import { VenuesComponent } from './venues/venues.component'

@NgModule({
  declarations: [VenueListComponent, VenueFilterComponent, VenuesComponent, VenueDetailComponent],
  imports: [CommonModule, VenuesRoutingModule, SharedModule, NearbyEventsModule],
})
export class VenuesModule {}
