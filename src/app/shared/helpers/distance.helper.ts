import { EventVenueLocationModel } from '../models/event-venue-shared.models';
import { deg2rad } from './math.helper';

// distance using Haversine formula
export function getDistance(location1: EventVenueLocationModel, location2: EventVenueLocationModel): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(location1.latitude - location2.latitude);  // deg2rad below
  const dLon = deg2rad(location1.longitude - location2.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(location2.latitude)) * Math.cos(deg2rad(location1.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  
  return d;
}
