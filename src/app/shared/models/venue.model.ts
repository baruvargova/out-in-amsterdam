import { createDate } from '../helpers/date.helper'
import {
  EventVenueDetailsModel,
  EventVenueLocationModel,
  EventVenueMediaModel,
} from './event-venue-shared.models'

export class VenueModel {
  public trcid: string
  public title: string
  public details: EventVenueDetailsModel
  public location: EventVenueLocationModel
  public urls: string[]
  public media: EventVenueMediaModel[]
  public dates: VenueDateModel

  constructor(data: any) {
    this.trcid = data.trcid
    this.title = data.title
    this.details = data.details ? new EventVenueDetailsModel(data.details) : null
    this.location = data.location ? new EventVenueLocationModel(data.location) : null
    this.urls = data.urls || []
    this.media = data.media ? data.media.map((x) => new EventVenueMediaModel(x)) : []
    this.dates = data.dates ? new VenueDateModel(data.dates) : null
  }

  public get mainMedia(): EventVenueMediaModel {
    return this.media.find((x) => x.main)
  }
}

export class VenueDateModel {
  public startdate: Date
  public enddate: Date

  constructor(data: any) {
    this.startdate = createDate(data.startdate)
    this.enddate = createDate(data.enddate)
  }

  get startYear(): number {
    return this.startdate ? this.startdate.getFullYear() : null
  }
}
