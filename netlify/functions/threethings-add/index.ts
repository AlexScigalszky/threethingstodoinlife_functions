import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { getDb } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const sheet = await getDb()

    const data = JSON.parse(event.body)
    await sheet.addRow(data)

    return {
      statusCode: 200,
      body: `row added`,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
