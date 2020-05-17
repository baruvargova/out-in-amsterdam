import { TestBed } from '@angular/core/testing'

import { NearbyEventsService } from './nearby-events.service'

describe('NearbyEventsService', () => {
  let service: NearbyEventsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NearbyEventsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
