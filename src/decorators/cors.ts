import { Handler, HandlerEvent } from '@netlify/functions'


// eslint-disable-next-line @typescript-eslint/ban-types, unicorn/consistent-function-scoping
const Cors = () => (_target: Object, _key: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
    descriptor.value = (...args: unknown[]) => {
      // eslint-disable-next-line no-invalid-this
      const result = original.apply(this);
      return result;
    }
  };

// 
// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': '*',
//     'Access-Control-Allow-Methods': '*',
// }
// if (event.httpMethod === 'OPTIONS') {
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({ message: 'Successful preflight call.' }),
//     }
// }
// 

// type HandleLogicFn = () => Handler

// const handler: Handler = async (event: HandlerEvent) => {
//   try {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: `favorite added` }),
//     }
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: error.toString(),
//     }
//   }
// }

// const AddCors: (handlerlogic: Handler) => Handler = (handlerlogic: Handler) => handlerlogic;

// export { AddCors }
// ame, target)

export { Cors }
