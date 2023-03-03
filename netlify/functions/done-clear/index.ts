import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { updateById } from '../../../src/database/done'
// eslint-disable-next-line n/no-missing-import
import { ThingsOrder } from '../../../src/enums/things_order'
// eslint-disable-next-line n/no-missing-import
import { allowOptions, headers } from '../../../src/utils/headers'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const result = allowOptions(event)
    if (result) return result

    const data = JSON.parse(event.body)

    await updateById(data.identifier, (item) => {
      switch (data.order) {
        case ThingsOrder.first:
          // eslint-disable-next-line no-param-reassign
          item.doneFirst = null
          break
        case ThingsOrder.second:
          // eslint-disable-next-line no-param-reassign
          item.doneSecond = null
          break
        case ThingsOrder.third:
          // eslint-disable-next-line no-param-reassign
          item.doneThird = null
          break
        default:
          break
      }
      return item
    })

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
