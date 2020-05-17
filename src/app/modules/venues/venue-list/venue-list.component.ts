import { Component, Input, OnInit } from '@angular/core'

import { VenueModel } from '../../../shared/models/venue.model'

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss'],
})
export class VenueListComponent {
  @Input() public venues: VenueModel[]
}
