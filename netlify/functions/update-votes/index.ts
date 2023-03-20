import { Handler, schedule } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { setZeroVotes, updateById } from '../../../src/database/ttt'
// eslint-disable-next-line n/no-missing-import
import { getRows as getVoteRows } from '../../../src/database/vote'

const myHandler: Handler = async () => {
  await setZeroVotes()

  const votes = await getVoteRows()
  for (const vote of votes) {
    await updateById(vote.identifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.votes = Number(vote.value) + Number(item.votes)
      return item
    })
  }
  return {
    statusCode: 200,
  }
}

const handler = schedule('@daily', myHandler)

export { handler }
