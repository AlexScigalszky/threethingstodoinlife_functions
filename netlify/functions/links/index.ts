import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

const links = {
  hello: 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/hello',
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) =>
  await Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(links),
  })

export { handler }
