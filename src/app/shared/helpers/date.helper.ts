export function createDate(dateString: string): Date {
  if (dateString) {
    const year = +dateString.substr(6)
    const month = +dateString.substr(3, 2) - 1
    const day = +dateString.substr(0, 2)
    return new Date(year, month, day)
  }
  return null
}
