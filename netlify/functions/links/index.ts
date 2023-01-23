import { Handler } from '@netlify/functions'

const links = {
  hello: 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/hello',
  // callback: 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/callback',
  threethings: 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/threethings',
  'threethings-add': 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/threethings-add',
  'threethings-delete': 'https://threethingstodoinlife-functions.netlify.app/.netlify/functions/threethings-delete',
}

const handler: Handler = async () =>
  await Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(links),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  })

export { handler }
