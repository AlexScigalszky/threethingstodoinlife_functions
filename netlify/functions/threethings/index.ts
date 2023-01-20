import { Handler } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { getRows } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async () => {
  try {
    const list = await getRows()

    return {
      statusCode: 200,
      body: list,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
