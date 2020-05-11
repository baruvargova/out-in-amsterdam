import { createDate } from '../helpers/date.helper';
import { deg2rad } from '../helpers/math.helper';
import {
  EventVenueDetailsModel,
  EventVenueLocationModel,
  EventVenueMediaModel
} from './event-venue-shared.models';
import { VenueModel } from './venue.model';

export class EventModel {
  trcid: string;
  title: string;
  details: EventVenueDetailsModel;
  location: EventVenueLocationModel;
  urls: string[];
  media: EventVenueMediaModel[];
  dates: EventDateModel;
  venueDistance: number
  
  constructor(data: any) {
    this.trcid = data.trcid;
    this.title = data.title;
    this.details = data.details ? new EventVenueDetailsModel(data.details) : null;
    this.location = data.location ? new EventVenueLocationModel(data.location) : null;
    this.urls = data.urls || [];
    this.media = data.media ? data.media.map(x => new EventVenueMediaModel(x)) : [];
    this.dates = data.dates ? new EventDateModel(data.dates) : null;
  }
  
  public get mainMedia(): EventVenueMediaModel {
    return this.media.find(x => x.main);
  }

// distance using Haversine formula
  public setVenueDistance(venue: VenueModel): void {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(this.location.latitude - venue.location.latitude);  // deg2rad below
    const dLon = deg2rad(this.location.longitude - venue.location.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(venue.location.latitude)) * Math.cos(deg2rad(this.location.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    
    this.venueDistance = d;
  }
}

export class EventDateModel {
  startdate: Date;
  enddate: Date;
  
  constructor(data: any) {
    this.startdate = createDate(data.startdate);
    this.enddate = createDate(data.enddate);
  }
  
  get startMonth(): number {
    return this.startdate ? this.startdate.getMonth() : null;
  }
  
  get startYear(): number {
    return this.startdate ? this.startdate.getFullYear() : null;
  }
  
  get endMonth(): number {
    return this.enddate ? this.enddate.getMonth() : null;
  }
  
  get endYear(): number {
    return this.enddate ? this.enddate.getFullYear() : null;
  }
  
  get eventDuration(): EventMonthYear[] {
    let monthsOfDuration = [];
    if (this.startdate && this.enddate) {
      for (
        let m = this.startMonth, eventMonth = {month: null, year: null};
        !(eventMonth.month === this.endMonth && eventMonth.year === this.endYear);
        m++
      ) {
        const month =  m % 12;
        const year = this.startYear + Math.floor(m / 12)
        eventMonth = { month, year};
        monthsOfDuration.push(eventMonth);
      }
    }
    return monthsOfDuration;
  }
}

export class EventMonthYear {
  month: number;
  year: number;
}
