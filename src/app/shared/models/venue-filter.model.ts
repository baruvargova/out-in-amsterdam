export class VenueFilterModel {
  public name: string
  public cities: string[]
  public startYear: number
  public zip: string

  constructor(data?: any) {
    if (data) {
      this.name = data.name
      this.cities = data.cities
      this.startYear = data.startYear
      this.zip = data.zip
    }
  }
}
