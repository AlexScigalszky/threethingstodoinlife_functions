import { GoogleSpreadsheet } from 'google-spreadsheet'

export const getTable = async (index: number) => {
  const spreadSheetId = '1s96VqHGD72FoQlWOYN3ggyL_rMWJ4GYn6cAN-IByXJM'

  const doc = new GoogleSpreadsheet(spreadSheetId)
  await doc.useServiceAccountAuth({
    // eslint-disable-next-line n/prefer-global/process
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // eslint-disable-next-line n/prefer-global/process
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  })
  await doc.loadInfo()

  return doc.sheetsByIndex[index]
}
