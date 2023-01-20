import { GoogleSpreadsheet } from 'google-spreadsheet'

// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue, ThreeThings } from '../models/three_things'

export const getDb = async () => {
  const spreadSheetId = '1s96VqHGD72FoQlWOYN3ggyL_rMWJ4GYn6cAN-IByXJM'

  const doc = new GoogleSpreadsheet(spreadSheetId)
  await doc.useServiceAccountAuth({
    // eslint-disable-next-line n/prefer-global/process
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // eslint-disable-next-line n/prefer-global/process
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  })
  // await doc.useServiceAccountAuth(require('./your-service-account.json'))
  await doc.loadInfo()

  return doc.sheetsByIndex[0]
}

export const addRow = async (data: ThreeThings) => {
  const sheet = await getDb()
  return await sheet.addRow(data as GoogleSpreadsheetValue)
}
