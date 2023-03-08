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

    let info
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
      await updateByTttIdentifierUserIdentifier(data.identifier, data.userIdentifier, (item, doneItem) => {
        info = doneItem
        switch (data.order) {
          case ThingsOrder.first:
            // eslint-disable-next-line no-param-reassign
            item.doneFirst = doneItem.doneFirst === true ? null : true
            break
          case ThingsOrder.second:
            // eslint-disable-next-line no-param-reassign
            item.doneSecond = doneItem.doneSecond === true ? null : true
            break
          case ThingsOrder.third:
            // eslint-disable-next-line no-param-reassign
            item.doneThird = doneItem.doneThird === true ? null : true
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
      body: JSON.stringify({ message: info }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

export { handler }
