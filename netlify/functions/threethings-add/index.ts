import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { addRow } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const data = JSON.parse(event.body)
    await addRow(data)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `row added` }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
