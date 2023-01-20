import { Handler } from '@netlify/functions'

const handler: Handler = async () =>
  await Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ message: `Hello World` }),
  })

export { handler }
