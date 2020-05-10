import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { EventVenueModel } from '../../../shared/models/event-venue.model';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  @Input()venues: EventVenueModel[]

  constructor() { }

  ngOnInit(): void {
  }

}
