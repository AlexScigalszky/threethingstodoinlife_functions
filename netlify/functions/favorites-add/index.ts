import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { updateById } from '../../../src/utils/spreadsheet_db'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const data = JSON.parse(event.body)
    await updateById(data.identifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.favorites = 1 + item.favorites
      return item
    })

    return {
      statusCode: 200,
      body: `favorite added`,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
