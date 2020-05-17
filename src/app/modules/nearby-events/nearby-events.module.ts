import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared/shared.module'

import { NearbyEventsFilterComponent } from './nearby-events-filter/nearby-events-filter.component'
import { NearbyEventsListComponent } from './nearby-events-list/nearby-events-list.component'
import { NearbyEventsComponent } from './nearby-events/nearby-events.component'

@NgModule({
  declarations: [NearbyEventsComponent, NearbyEventsFilterComponent, NearbyEventsListComponent],
  imports: [CommonModule, SharedModule],
  exports: [NearbyEventsComponent],
})
export class NearbyEventsModule {}
