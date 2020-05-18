import { HttpErrorResponse } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { VenueFilterModel } from '../../shared/models/venue-filter.model'
import { VenueModel } from '../../shared/models/venue.model'

import { ALL_CITIES } from '../mocks/cities'
import { FILTERED_VENUES } from '../mocks/filtered-venues'
import { VENUE_DETAIL } from '../mocks/venue-detail'
import { VENUES_DATA } from '../mocks/venues'
import { VenueService } from './venue.service'

describe('VenueService', () => {
  let service: VenueService
  const allCities = ALL_CITIES
  const allVenues = JSON.parse(VENUES_DATA).map((x) => new VenueModel(x))
  const filteredVenues = JSON.parse(FILTERED_VENUES).map((x) => new VenueModel(x))
  const venueDetail = new VenueModel(JSON.parse(VENUE_DETAIL))

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(VenueService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('getCitiesToDropdown() with no filter should return all cities', () => {
    const cityFilter = null
    service.getCitiesToDropdown(cityFilter).subscribe((res) => {
      expect(res).toEqual(allCities)
    })
  })

  it('getCitiesToDropdown() should return filtered cities', () => {
    const cityFilter = 'te'
    const filteredCities = ['AMSTERDAM', 'BROEK IN WATERLAND']
    service.getCitiesToDropdown(cityFilter).subscribe((res) => {
      expect(res).toEqual(filteredCities)
    })
  })

  it('getVenues() with no filter should return all venues', () => {
    service.getVenues().subscribe((res) => {
      expect(res).toEqual(allVenues)
    })
  })

  it('getVenues() should return filtered venues', () => {
    const venueFilter = new VenueFilterModel({
      name: 'land',
      cities: ['AMSTERDAM', 'SCHIPHOL'],
      startYear: 2012,
      zip: '1',
    })
    service.venueFilter.next(venueFilter)

    service.getVenues().subscribe((res) => {
      expect(res).toEqual(filteredVenues)
    })
  })

  it('getVenue() should return venue detail', () => {
    const venueDetailId = '10977bdb-b449-4eee-9213-d1e1c3689485'

    service.getVenue(venueDetailId).subscribe((res) => {
      expect(res).toEqual(venueDetail)
    })
  })

  it('getVenue() should throw error if not found', () => {
    const venueDetailId = ''
    const errorResponse = new HttpErrorResponse({
      status: 404,
      error: 'not found',
    })

    service.getVenue(venueDetailId).subscribe(
      () => {},
      (err) => expect(err).toEqual(errorResponse)
    )
  })
})
