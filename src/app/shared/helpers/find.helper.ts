import { EventVenueLocationModel } from '../models/event-venue-shared.models';
import {
  EventDateModel,
  EventModel
} from '../models/event.model';

export function searchBySubstring(text: string, searchText: string): boolean {
  if (searchText) {
    return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  }
  return true;
}

export function findInArray(text: string, filterArray: string[]): boolean {
  if (filterArray && filterArray.length) {
    return filterArray.includes(text);
  }
  
  return true;
}

export function matchYear(year: number, yearToCompare: number): boolean {
  if (yearToCompare) {
    return year === yearToCompare;
  }
  return true;
}

export function matchEventDate(date: EventDateModel, month: number, year: number): boolean {
  if (month || year) {
    if (date.startdate && date.enddate) { // event with duration
      if (month && year) {
        return date.eventDuration.some(x => x.month === month && x.year === year);
      }
      if (month) {
        return date.eventDuration.some(x => x.month === month);
      }
      if (year) {
        return date.eventDuration.some(x => x.year === year);
        
      }
    }
    if (date.startdate) { // one day event
      if (month && year) {
        return month === date.startMonth && year === date.startYear;
      }
      if (month) {
        return month === date.startMonth;
      }
      if (year) {
        return year === date.startYear;
      }
    }
    
    return false;
  }
  return true;
}

export function isNearby(eventDistanceInKm: number, maxDistanceInKm: number = 1): boolean {
  return eventDistanceInKm <= maxDistanceInKm;
}
