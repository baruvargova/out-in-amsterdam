import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { EventModel } from '../../../shared/models/event.model';

@Component({
  selector: 'app-nearby-events-list',
  templateUrl: './nearby-events-list.component.html',
  styleUrls: ['./nearby-events-list.component.scss']
})
export class NearbyEventsListComponent implements OnInit {
  @Input()events: EventModel[]

  constructor() { }

  ngOnInit(): void {
  }

}
