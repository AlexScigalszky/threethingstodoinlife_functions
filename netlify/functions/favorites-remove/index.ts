import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { updateById } from '../../../src/database/ttt'
// eslint-disable-next-line n/no-missing-import
import { allowOptions, headers } from '../../../src/utils/headers'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const result = allowOptions(event)
    if (result) return result

    const data = JSON.parse(event.body)
    await updateById(data.identifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.favorites = Number(item.favorites) - 1
      return item
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `favorite removed` }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }