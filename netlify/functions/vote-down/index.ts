import { Handler, HandlerEvent } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { updateById } from '../../../src/database/ttt'
// eslint-disable-next-line n/no-missing-import
import { addRow, getRowsByUserAndTttIdentifier, updateByTttIdentifierUserIdentifier } from '../../../src/database/vote'
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

    const exists = await getRowsByUserAndTttIdentifier(data.userIdentifier, data.identifier)
    // eslint-disable-next-line unicorn/prefer-ternary
    if (exists.length === 0) {
      await addRow({
        identifier: null,
        userIdentifier: data.userIdentifier,
        tttIdentifier: data.identifier,
        value: -1,
        date: null,
      })
    } else {
      await updateByTttIdentifierUserIdentifier(data.identifier, data.userIdentifier, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.value = -1
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
