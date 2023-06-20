import { Handler, schedule } from '@netlify/functions'

// eslint-disable-next-line n/no-missing-import
import { setZeroVotes, updateById } from '../../../src/database/ttt'
// eslint-disable-next-line n/no-missing-import
import { getRows as getVoteRows } from '../../../src/database/vote'

const myHandler: Handler = async () => {
  const now = new Date()
  console.log(`${now} - begin`)

  console.log(`${now} - start reset votes`)
  await setZeroVotes()
  console.log(`${now} - end reset votes`)

  console.log(`${now} - start get votes rows`)
  const votes = await getVoteRows()
  console.log(`${now} - end get votes rows`)
  for (const vote of votes) {
    console.log(`${now} - start using vote:${vote.identifier}`)
    await updateById(vote.tttIdentifier, (item) => {
      // eslint-disable-next-line no-param-reassign
      item.votes = Number(vote.value) + Number(item.votes)
      return item
    })
    console.log(`${now} - end using vote:${vote.identifier}`)
  }
  console.log(`${now} - end`)
  return {
    statusCode: 200,
  }
}

const handler = myHandler; //schedule('@daily', myHandler)

//export { handler }
