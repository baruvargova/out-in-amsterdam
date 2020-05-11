import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { VenueModel } from '../../../shared/models/venue.model';

@Component({
  selector: 'app-venue-map',
  templateUrl: './venue-map.component.html',
  styleUrls: ['./venue-map.component.scss']
})
export class VenueMapComponent implements OnInit {
  @Input()venues: VenueModel[]

  constructor() { }

  ngOnInit(): void {
  }

}
