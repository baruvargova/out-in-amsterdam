import { createDate } from '../helpers/date.helper'
import {
  EventVenueDetailsModel,
  EventVenueLocationModel,
  EventVenueMediaModel,
} from './event-venue-shared.models'

export class EventModel {
  public trcid: string
  public title: string
  public details: EventVenueDetailsModel
  public location: EventVenueLocationModel
  public urls: string[]
  public media: EventVenueMediaModel[]
  public dates: EventDateModel
  public venueDistance: number

  constructor(data: any) {
    this.trcid = data.trcid
    this.title = data.title
    this.details = data.details ? new EventVenueDetailsModel(data.details) : null
    this.location = data.location ? new EventVenueLocationModel(data.location) : null
    this.urls = data.urls || []
    this.media = data.media ? data.media.map((x) => new EventVenueMediaModel(x)) : []
    this.dates = data.dates ? new EventDateModel(data.dates) : null
  }

  public get mainMedia(): EventVenueMediaModel {
    return this.media.find((x) => x.main)
  }

  public setVenueDistance(distance: number): void {
    this.venueDistance = distance
  }
}

export class EventDateModel {
  public startdate: Date
  public enddate: Date

  constructor(data: any) {
    this.startdate = createDate(data.startdate)
    this.enddate = createDate(data.enddate)
  }

  get startMonth(): number {
    return this.startdate ? this.startdate.getMonth() : null
  }

  get startYear(): number {
    return this.startdate ? this.startdate.getFullYear() : null
  }

  get endMonth(): number {
    return this.enddate ? this.enddate.getMonth() : null
  }

  get endYear(): number {
    return this.enddate ? this.enddate.getFullYear() : null
  }

  get eventDuration(): EventMonthYear[] {
    const monthsOfDuration = []
    if (this.startdate && this.enddate) {
      for (
        let m = this.startMonth, eventMonth = { month: null, year: null };
        !(eventMonth.month === this.endMonth && eventMonth.year === this.endYear);
        m++
      ) {
        const month = m % 12
        const year = this.startYear + Math.floor(m / 12)
        eventMonth = { month, year }
        monthsOfDuration.push(eventMonth)
      }
    }
    return monthsOfDuration
  }
}

export class EventMonthYear {
  public month: number
  public year: number
}
