import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { getRowsByUserIdentifier } from '../../../src/database/done'
// eslint-disable-next-line n/no-missing-import
import { allowOptions, headers } from '../../../src/utils/headers'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const result = allowOptions(event)
    if (result) return result

    const data = JSON.parse(event.body)
    const list = await getRowsByUserIdentifier(data.userIdentifier)

    return {
      statusCode: 200,
      body: JSON.stringify(list),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: error.toString(),
    }
  }
}

export { handler }
