export class EventVenueDetailsModel {
  public de: EventVenueDetailModel
  public en: EventVenueDetailModel
  public fr: EventVenueDetailModel
  public nl: EventVenueDetailModel
  public it: EventVenueDetailModel
  public es: EventVenueDetailModel

  constructor(data: any) {
    this.de = data.de ? new EventVenueDetailModel(data.de) : null
    this.en = data.en ? new EventVenueDetailModel(data.en) : null
    this.fr = data.fr ? new EventVenueDetailModel(data.fr) : null
    this.nl = data.nl ? new EventVenueDetailModel(data.nl) : null
    this.it = data.it ? new EventVenueDetailModel(data.it) : null
    this.es = data.es ? new EventVenueDetailModel(data.es) : null
  }

  public detailByLang(lang: string): EventVenueDetailModel {
    return this[lang] || this.en
  }
}

export class EventVenueDetailModel {
  public language: string
  public title: string
  public calendarsummary: string
  public shortdescription: string
  public longdescription: string

  constructor(data: any) {
    this.language = data.language
    this.title = data.title
    this.calendarsummary = data.calendarsummary
    this.shortdescription = data.shortdescription
    this.longdescription = data.longdescription
  }
}

export class EventVenueLocationModel {
  public name: string
  public city: string
  public adress: string
  public zipcode: string
  public latitude: number
  public longitude: number

  constructor(data: any) {
    this.name = data.name
    this.city = data.city
    this.adress = data.adress
    this.zipcode = data.zipcode
    this.latitude = +data.latitude.replace(',', '.')
    this.longitude = +data.longitude.replace(',', '.')
  }
}

export class EventVenueMediaModel {
  public url: string
  public main: boolean

  constructor(data: any) {
    this.url = data.url
    this.main = data.main
  }
}
