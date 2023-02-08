import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { headers, allowOptions } from '../../../src/utils/headers'
// eslint-disable-next-line n/no-missing-import
import { updateById } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const result = allowOptions(event)
    if (result) return result

    const data = JSON.parse(event.body)
    await updateById(data.identifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.favorites = 1 + Number(item.favorites)
      return item
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `favorite added` }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
