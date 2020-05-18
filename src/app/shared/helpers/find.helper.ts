import { EventDateModel } from '../models/event.model'
import { isNullOrUndefined } from './common.helper'

export function searchBySubstring(text: string, searchText: string): boolean {
  if (searchText) {
    return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  }
  return true
}

export function findInArray(text: string, filterArray: string[]): boolean {
  if (filterArray && filterArray.length) {
    return filterArray.includes(text)
  }

  return true
}

export function matchYear(year: number, yearToCompare: number): boolean {
  if (yearToCompare) {
    return year === yearToCompare
  }
  return true
}

export function matchEventDate(date: EventDateModel, month: number, year: number): boolean {
  if (!isNullOrUndefined(month) || !isNullOrUndefined(year)) {
    if (date.startdate && date.enddate) {
      // event with duration
      if (!isNullOrUndefined(month) && !isNullOrUndefined(year)) {
        return date.eventDuration.some((x) => x.month === month && x.year === year)
      }
      if (!isNullOrUndefined(month)) {
        return date.eventDuration.some((x) => x.month === month)
      }
      if (!isNullOrUndefined(year)) {
        return date.eventDuration.some((x) => x.year === year)
      }
    }
    if (date.startdate) {
      // one day event
      if (!isNullOrUndefined(month) && !isNullOrUndefined(year)) {
        return month === date.startMonth && year === date.startYear
      }
      if (!isNullOrUndefined(month)) {
        return month === date.startMonth
      }
      if (!isNullOrUndefined(year)) {
        return year === date.startYear
      }
    }

    return false
  }
  return true
}

export function isNearby(eventDistanceInKm: number, maxDistanceInKm: number = 1): boolean {
  return eventDistanceInKm <= maxDistanceInKm
}
