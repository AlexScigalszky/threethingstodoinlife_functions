import { Handler } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { getDb } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async () => {
  try {
    const list = await getDb()

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
