import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { addRow, getRowsByUserAndTttIdentifier, updateByTttIdentifierUserIdentifier } from '../../../src/database/done'
// eslint-disable-next-line n/no-missing-import
import { ThingsOrder } from '../../../src/enums/things_order'
// eslint-disable-next-line n/no-missing-import
import { allowOptions, headers } from '../../../src/utils/headers'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const result = allowOptions(event)
    if (result) return result

    const data = JSON.parse(event.body)

    const exists = await getRowsByUserAndTttIdentifier(data.userIdentifier, data.identifier)
    // eslint-disable-next-line unicorn/prefer-ternary
    if (exists.length === 0) {
      await addRow({
        identifier: null,
        userIdentifier: data.userIdentifier,
        tttIdentifier: data.identifier,
        doneFirst: data.order === ThingsOrder.first ? false : null,
        doneSecond: data.order === ThingsOrder.second ? false : null,
        doneThird: data.order === ThingsOrder.third ? false : null,
      })
    } else {
      await updateByTttIdentifierUserIdentifier(data.identifier, data.userIdentifier, (item) => {
        switch (data.order) {
          case ThingsOrder.first:
            // eslint-disable-next-line no-param-reassign
            item.doneFirst = false
            break
          case ThingsOrder.second:
            // eslint-disable-next-line no-param-reassign
            item.doneSecond = false
            break
          case ThingsOrder.third:
            // eslint-disable-next-line no-param-reassign
            item.doneThird = false
            break
          default:
            break
        }
        return item
      })
    }

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
