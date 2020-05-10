import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NearbyEventsModule } from '../nearby-events/nearby-events.module';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueFilterComponent } from './venue-filter/venue-filter.component';
import { VenueMapComponent } from './venue-map/venue-map.component';
import { VenuesRoutingModule } from './venues-routing.module';
import { VenuesComponent } from './venues/venues.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';



@NgModule({
  declarations: [VenueListComponent, VenueFilterComponent, VenueMapComponent, VenuesComponent, VenueDetailComponent],
  imports: [
    CommonModule,
    VenuesRoutingModule,
    SharedModule,
    NearbyEventsModule
  ]
})
export class VenuesModule { }
