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
        doneFirst: data.order === ThingsOrder.first ? true : null,
        doneSecond: data.order === ThingsOrder.second ? true : null,
        doneThird: data.order === ThingsOrder.third ? true : null,
        date: data.date,
      })
    } else {
      await updateByTttIdentifierUserIdentifier(data.identifier, data.userIdentifier, (item) => {
        switch (data.order) {
          case ThingsOrder.first:
            // eslint-disable-next-line no-param-reassign
            item.doneFirst = item.doneFirst === 'FALSE' ? true : null
            break
          case ThingsOrder.second:
            // eslint-disable-next-line no-param-reassign
            item.doneSecond = item.doneSecond === 'TRUE' ? null : true
            break
          case ThingsOrder.third:
            // eslint-disable-next-line no-param-reassign
            item.doneThird = item.doneThird === 'TRUE' ? null : true
            break
          default:
            break
        }
        return item
      })
    }

    const exists2 = await getRowsByUserAndTttIdentifier(data.userIdentifier, data.identifier)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: exists2 }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
