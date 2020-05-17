export class EventFilterModel {
  public name: string
  public year: number
  public month: number

  constructor(data?: any) {
    if (data) {
      this.name = data.name
      this.year = data.year
      this.month = data.month
    }
  }
}
