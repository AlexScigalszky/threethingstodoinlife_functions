import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { deleteById } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const data = JSON.parse(event.body)
    await deleteById(data.identifier)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `row deleted` }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
