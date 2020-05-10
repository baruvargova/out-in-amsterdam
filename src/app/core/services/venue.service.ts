import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import {
  findInArray,
  matchYear,
  searchBySubstring
} from '../../shared/helpers/find.helper';
import { EventVenueModel } from '../../shared/models/event-venue.model';
import { VenueFilterModel } from '../../shared/models/venue-filter.model';
import { VENUES_DATA } from '../mock-data/venues';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  
  public venueFilter = new BehaviorSubject<VenueFilterModel>(new VenueFilterModel());
  
  private venues: EventVenueModel[];
  private cities: string[];
  
  constructor() {
    this.initDataSet();
  }
  
  private initDataSet(): void {
    this.venues = [];
    this.cities = [];
    
    // fill venues and cities
    JSON.parse(VENUES_DATA).forEach(x => {
      let venue = new EventVenueModel(x);
      this.venues.push(venue);
      this.cities.push(venue.location.city);
    });
    
    // make cities unique and sorted
    this.cities = this.cities
    .filter((x, index, self) => self.indexOf(x) === index)
    .sort((a, b) => a.localeCompare(b));
  }
  
  public getCitiesToDropdown(searchText: string): Observable<string[]> {
    return of(this.cities.filter((x) => searchBySubstring(x, searchText)));
  }
  
  public getVenues(): Observable<EventVenueModel[]> {
    let filter = this.venueFilter.value;
    
    return of(this.venues
    .filter(x => searchBySubstring(x.title, filter.name))
    .filter(x => findInArray(x.location.city, filter.cities))
    .filter(x => matchYear(x.dates.startYear, filter.startYear))
    .filter(x => searchBySubstring(x.location.zipcode, filter.zip)));
  }
  
  public getVenue(trcid: string): Observable<EventVenueModel> {
    let venue = this.venues.find((x) => x.trcid === trcid);
    
    if (venue) {
      return of();
    }
    
    return throwError(new HttpErrorResponse({
      status: 404,
      error: 'not found'
    }));
  }
}
