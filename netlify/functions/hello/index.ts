import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) =>
  await Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ message: `Hello World${event}${context}` }),
  })

export { handler }
