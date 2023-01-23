// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from './google_spreadsheet_value'

export interface ThreeThings extends GoogleSpreadsheetValue {
  identifier: string
  first: string
  second: string
  third: string
  favorites: number
}
