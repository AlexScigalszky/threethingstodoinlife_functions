import { Handler } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { headers } from '../../../src/utils/headers'

const handler: Handler = async () => {
  try {
    await Promise.resolve(2)
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({ message: `Obsolete` }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
