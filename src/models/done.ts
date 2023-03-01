// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from './google_spreadsheet_value'

export interface Done extends GoogleSpreadsheetValue {
  identifier: string
  userIdentifier: string
  tttIdentifier: string
  doneFirst: boolean | ''
  doneSecond: boolean | ''
  doneThird: boolean | ''
}
