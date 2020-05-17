import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { MapInfoWindow, MapMarker } from '@angular/google-maps'

import { AMSTERDAM_LAT, AMSTERDAM_LON } from '../../helpers/constants'
import { EventVenueMarker } from '../../models/event-venue-marker'
import { EventModel } from '../../models/event.model'
import { VenueModel } from '../../models/venue.model'
import MarkerOptions = google.maps.MarkerOptions
import LatLng = google.maps.LatLng
import MapOptions = google.maps.MapOptions

@Component({
  selector: 'app-event-venue-map',
  templateUrl: './event-venue-map.component.html',
  styleUrls: ['./event-venue-map.component.scss'],
})
export class EventVenueMapComponent implements OnInit, OnChanges {
  @ViewChild(MapInfoWindow, { static: false }) public infoWindow: MapInfoWindow

  @Input() public events: EventModel[]
  @Input() public venues: VenueModel[]
  @Input() public centerByVenue: boolean

  public eventMarkers: EventVenueMarker[]
  public venueMarkers: EventVenueMarker[]

  public mapOptions: MapOptions
  public center: LatLng
  public zoom: number

  public selectedMarker: EventVenueMarker

  constructor() {}

  public ngOnInit(): void {
    if (this.centerByVenue && this.events && this.events.length) {
      this.mapOptions = {
        center: {
          lat: this.venues[0].location.latitude,
          lng: this.venues[0].location.longitude,
        },
        zoom: 14,
      }
    } else {
      this.mapOptions = {
        center: {
          lat: AMSTERDAM_LAT,
          lng: AMSTERDAM_LON,
        },
        zoom: 10,
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.venues) {
      this.venueMarkers = this.venues.map(
        (venue) =>
          new EventVenueMarker(
            true,
            venue.trcid,
            venue.title,
            venue.location,
            venue.urls,
            this.getVenueMarkerOption(venue)
          )
      )
    }
    if (changes.events) {
      this.eventMarkers = this.events.map(
        (event) =>
          new EventVenueMarker(
            false,
            event.trcid,
            event.title,
            event.location,
            event.urls,
            this.getEventMarkerOption(event)
          )
      )
    }
  }

  private getVenueMarkerOption(venue: VenueModel): MarkerOptions {
    return {
      draggable: false,
      title: venue.title,
      icon: {
        url: 'assets/images/google-map-markers/venue.png',
      },
      zIndex: 2,
    } as MarkerOptions
  }

  private getEventMarkerOption(event: EventModel): MarkerOptions {
    return {
      draggable: false,
      title: event.title,
      icon: {
        url: 'assets/images/google-map-markers/event.png',
      },
    } as MarkerOptions
  }

  private setSelectedMarkerColor(): void {
    const icon = this.selectedMarker.isVenue ? 'venue' : 'event'
    this.selectedMarker.options = {
      ...this.selectedMarker.options,
      icon: { url: `assets/images/google-map-markers/${icon}-selected.png` },
    }
  }

  private resetSelectedMarkerColor(): void {
    const icon = this.selectedMarker.isVenue ? 'venue' : 'event'
    this.selectedMarker.options = {
      ...this.selectedMarker.options,
      icon: { url: `assets/images/google-map-markers/${icon}.png` },
    }
  }

  public closeInfo(): void {
    this.infoWindow.close()
    if (this.selectedMarker) {
      this.resetSelectedMarkerColor()
    }
    this.selectedMarker = null
  }

  public openInfoWindow(marker: MapMarker, eventMarker: EventVenueMarker): void {
    this.selectedMarker = eventMarker
    this.setSelectedMarkerColor()
    this.infoWindow.open(marker)
  }
}
