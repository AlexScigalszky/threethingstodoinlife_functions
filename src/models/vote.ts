// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from './google_spreadsheet_value'

export interface Vote extends GoogleSpreadsheetValue {
  identifier: string
  userIdentifier: string
  tttIdentifier: string
  value: -1 | 1
  date: string
}
