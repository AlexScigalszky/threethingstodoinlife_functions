import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { allowOptions, headers } from '../../../src/utils/headers'
// eslint-disable-next-line n/no-missing-import
import { addRow } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const result = allowOptions(event)
    if (result) return result

    const data = JSON.parse(event.body)
    await addRow(data)

    return {
      statusCode: 200,
      headers,
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
