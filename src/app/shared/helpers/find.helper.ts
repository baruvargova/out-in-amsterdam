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

export function matchYear(year: number, yearToCompare: number) {
  if (yearToCompare) {
    return year === yearToCompare
  }
  return true
}
