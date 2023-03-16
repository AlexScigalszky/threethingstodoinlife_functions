import { Handler, schedule } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { getRows as getVoteRows } from '../../../src/database/vote'
// eslint-disable-next-line n/no-missing-import
import { getRows as getTTTRows, updateById } from '../../../src/database/ttt'

const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const ttts = await getTTTRows()
  for (const ttt of ttts) {
    await updateById(ttt.identifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.favorites = Number(0)
      return item
    })
  }

  const votes = await getVoteRows()
  for (const vote of votes) {
    await updateById(vote.identifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.favorites = 1 + Number(item.favorites)
      return item
    })
  }
  return {
    statusCode: 200,
  }
}

const handler = schedule('@hourly', myHandler)

export { handler }
