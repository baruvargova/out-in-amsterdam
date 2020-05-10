export class VenueFilterModel {
  name: string
  cities: string[]
  startYear: number
  zip: string
  
  constructor(data?: any) {
    if (data) {
      this.name = data.name
      this.cities = data.cities
      this.startYear = data.startYear
      this.zip = data.zip
    }
  }
}
