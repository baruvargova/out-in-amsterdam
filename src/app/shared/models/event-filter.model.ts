export class EventFilterModel {
  name: string
  year: number
  month: number
  
  constructor(data?: any) {
    if (data) {
      this.name = data.name
      this.year = data.year
      this.month = data.month
    }
  }
}
