import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NearbyEventsComponent } from './nearby-events/nearby-events.component';
import { NearbyEventsFilterComponent } from './nearby-events-filter/nearby-events-filter.component';
import { NearbyEventsListComponent } from './nearby-events-list/nearby-events-list.component';
import { NearbyEventsMapComponent } from './nearby-events-map/nearby-events-map.component';


@NgModule({
  declarations: [NearbyEventsComponent, NearbyEventsFilterComponent, NearbyEventsListComponent, NearbyEventsMapComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NearbyEventsComponent
  ]
})
export class NearbyEventsModule {
}
