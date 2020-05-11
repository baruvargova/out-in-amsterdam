import LatLng = google.maps.LatLng;
import MarkerOptions = google.maps.MarkerOptions;
import { EventVenueLocationModel } from './event-venue-shared.models';

export class EventVenueMarker {
  isVenue: boolean
  trcid: string
  title: string
  location: EventVenueLocationModel
  urls: string[]
  position: LatLng
  options: MarkerOptions
  
  constructor(isVenue: boolean, trcid: string, title: string, location: EventVenueLocationModel, urls: string[], options: MarkerOptions) {
    this.isVenue = isVenue
    this.trcid = trcid
    this.title = title
    this.location = location
    this.urls = urls
    this.position = new LatLng({lat: location.latitude, lng: location.longitude})
    this.options = options
  }
}
