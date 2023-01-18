import { Handler } from '@netlify/functions'

const links = {
  hello: 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/hello',
}

const handler: Handler = async () =>
  await Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(links),
  })

export { handler }
