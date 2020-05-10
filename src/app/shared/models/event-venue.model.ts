import { createDate } from '../helpers/date.helper';

export class EventVenueModel {
  trcid: string;
  title: string;
  details: EventVenueDetailsModel;
  location: EventVenueLocationModel;
  urls: string[];
  media: EventVenueMediaModel[];
  dates: EventVenueDateModel;
  
  constructor(data: any) {
    this.trcid = data.trcid;
    this.title = data.title;
    this.details = data.details ? new EventVenueDetailsModel(data.details) : null;
    this.location = data.location ? new EventVenueLocationModel(data.location) : null;
    this.urls = data.urls || [];
    this.media = data.media ? data.media.map(x => new EventVenueMediaModel(x)) : [];
    this.dates = data.dates ? new EventVenueDateModel(data.dates) : null;
  }
  
  public detailByLang(lang: string): EventVenueDetailsModel {
    return this.details[lang] || this.details.en;
  }
}

export class EventVenueDetailsModel {
  de: EventVenueDetailModel;
  en: EventVenueDetailModel;
  fr: EventVenueDetailModel;
  nl: EventVenueDetailModel;
  it: EventVenueDetailModel;
  es: EventVenueDetailModel;
  
  constructor(data: any) {
    this.de = data.de ? new EventVenueDetailModel(data.de) : null;
    this.en = data.en ? new EventVenueDetailModel(data.en) : null;
    this.fr = data.fr ? new EventVenueDetailModel(data.fr) : null;
    this.nl = data.nl ? new EventVenueDetailModel(data.nl) : null;
    this.it = data.it ? new EventVenueDetailModel(data.it) : null;
    this.es = data.es ? new EventVenueDetailModel(data.es) : null;
  }
}

export class EventVenueDetailModel {
  language: string;
  title: string;
  calendarsummary: string;
  shortdescription: string;
  longdescription: string;
  
  constructor(data: any) {
    this.language = data.language;
    this.title = data.title;
    this.calendarsummary = data.calendarsummary;
    this.shortdescription = data.shortdescription;
    this.longdescription = data.longdescription;
  }
}

export class EventVenueLocationModel {
  name: string;
  city: string;
  adress: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  
  constructor(data: any) {
    this.name = data.name;
    this.city = data.city;
    this.adress = data.adress;
    this.zipcode = data.zipcode;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }
}

export class EventVenueMediaModel {
  url: string;
  main: boolean;
  
  constructor(data: any) {
    this.url = data.url;
    this.main = data.main;
  }
}

export class EventVenueDateModel {
  startdate: Date;
  enddate: Date;
  
  constructor(data: any) {
    this.startdate = createDate(data.startdate)
    this.enddate = createDate(data.enddate)
  }
  
  get startYear(): number {
    return this.startdate ? this.startdate.getFullYear() : null;
  }
}
