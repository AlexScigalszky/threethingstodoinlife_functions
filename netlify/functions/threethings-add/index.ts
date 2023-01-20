import { Handler, HandlerEvent } from '@netlify/functions'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const handler: Handler = async (event: HandlerEvent) => {
  try {
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
    // eslint-disable-next-line prefer-destructuring
    const sheet = doc.sheetsByIndex[0]

    const data = JSON.parse(event.body)
    const addedRow = await sheet.addRow(data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `row added`,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
