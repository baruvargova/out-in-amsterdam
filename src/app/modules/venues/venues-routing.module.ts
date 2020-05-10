import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenuesComponent } from './venues/venues.component';


const routes: Routes = [
  {
    path: '',
    component: VenuesComponent,
    pathMatch: 'full'
  },
  {
    path: ':id/detail',
    component: VenueDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenuesRoutingModule { }
