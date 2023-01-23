import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'

// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from '../models/google_spreadsheet_value'
// eslint-disable-next-line n/no-missing-import
import { ThreeThings } from '../models/three_things'

// eslint-disable-next-line n/no-missing-import
import { generateUniqueId } from './id_generator'

const dbToThreeThings = (item: GoogleSpreadsheetRow): ThreeThings => ({
  identifier: item.identifier,
  first: item.first,
  second: item.second,
  third: item.third,
})

export const getDb = async () => {
  const spreadSheetId = '1s96VqHGD72FoQlWOYN3ggyL_rMWJ4GYn6cAN-IByXJM'

  const doc = new GoogleSpreadsheet(spreadSheetId)
  await doc.useServiceAccountAuth({
    // eslint-disable-next-line n/prefer-global/process
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // eslint-disable-next-line n/prefer-global/process
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  })
  await doc.loadInfo()

  return doc.sheetsByIndex[0]
}

export const getRows = async (): Promise<ThreeThings[]> => {
  const sheet = await getDb()
  const rows = await sheet.getRows()
  return rows.map(dbToThreeThings)
}

export const addRow = async (data: ThreeThings) => {
  const dataWithId = {
    id: generateUniqueId(),
    ...data,
  }
  const sheet = await getDb()
  return await sheet.addRow(dataWithId as GoogleSpreadsheetValue)
}

export const find = async (id: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()
  const row = rows.find((item) => item.id === id)
  return row ? dbToThreeThings(row) : null
}

export const deleteById = async (data: ThreeThings) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()
  const row = rows.find((item) => item.identifier === data.identifier)
  // if (!row) {
  //   return
  // }
  await row.delete()
}
