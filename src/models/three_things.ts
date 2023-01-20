export interface GoogleSpreadsheetValue {
  /**
   * @description
   * This represents the properties that get loaded using the header row
   */
  [x: string]: string | number | boolean
}

export interface ThreeThings extends GoogleSpreadsheetValue {
  first: string
  second: string
  third: string
}
