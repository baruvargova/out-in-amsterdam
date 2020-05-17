import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NearbyEventsResolver } from '../../core/resolvers/nearby-events.resolver'
import { VenueDetailResolver } from '../../core/resolvers/venue-detail.resolver'

import { VenueDetailComponent } from './venue-detail/venue-detail.component'
import { VenuesComponent } from './venues/venues.component'

const routes: Routes = [
  {
    path: '',
    component: VenuesComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/detail',
    component: VenueDetailComponent,
    resolve: {
      venue: VenueDetailResolver,
      nearbyEvents: NearbyEventsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenuesRoutingModule {}
