import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { EventVenueModel } from '../../../shared/models/event-venue.model';

@Component({
  selector: 'app-venue-map',
  templateUrl: './venue-map.component.html',
  styleUrls: ['./venue-map.component.scss']
})
export class VenueMapComponent implements OnInit {
  @Input()venues: EventVenueModel[]

  constructor() { }

  ngOnInit(): void {
  }

}
